/** Reconstructs a rooted ultrametric tree with UPGMA. @param {string[]} labels Taxa. @param {number[][]} matrix Symmetric distances. @returns {object} Root cluster. */
export function upgma(labels, matrix) {
  validateMatrix(labels, matrix);
  let clusters = [...labels]
    .sort()
    .map((name) => ({ name, members: [name], height: 0, children: [] }));
  while (clusters.length > 1) {
    const candidates = [];
    for (let i = 0; i < clusters.length; i += 1)
      for (let j = i + 1; j < clusters.length; j += 1)
        candidates.push({
          distance: clusterDistance(clusters[i], clusters[j], labels, matrix),
          key: [clusters[i].name, clusters[j].name].sort().join("|"),
          a: clusters[i],
          b: clusters[j],
        });
    candidates.sort(
      (x, y) => x.distance - y.distance || x.key.localeCompare(y.key),
    );
    const { distance, a, b } = candidates[0],
      [left, right] = [a, b].sort((x, y) => x.name.localeCompare(y.name)),
      height = distance / 2,
      members = [...left.members, ...right.members].sort();
    const merged = {
      name: members.join("+"),
      members,
      height,
      children: [
        { node: left, length: height - left.height },
        { node: right, length: height - right.height },
      ],
    };
    clusters = clusters
      .filter((c) => c !== a && c !== b)
      .concat(merged)
      .sort((x, y) => x.name.localeCompare(y.name));
  }
  return clusters[0];
}

/** Averages every original cross-cluster distance. @param {object} a First cluster. @param {object} b Second cluster. @param {string[]} labels Matrix labels. @param {number[][]} matrix Distances. @returns {number} Mean distance. */
function clusterDistance(a, b, labels, matrix) {
  const indexes = Object.fromEntries(labels.map((x, i) => [x, i]));
  let total = 0,
    count = 0;
  for (const x of a.members)
    for (const y of b.members) {
      total += matrix[indexes[x]][indexes[y]];
      count += 1;
    }
  return total / count;
}

/** Validates reconstruction input. @param {string[]} labels Taxa. @param {number[][]} matrix Distances. @returns {void} Throws on invalid data. */
export function validateMatrix(labels, matrix) {
  if (labels.length < 2 || matrix.length !== labels.length)
    throw new Error("A square matrix with at least two taxa is required");
  for (let i = 0; i < labels.length; i += 1)
    for (let j = 0; j < labels.length; j += 1)
      if (
        !Number.isFinite(matrix[i][j]) ||
        matrix[i][j] < 0 ||
        Math.abs(matrix[i][j] - matrix[j][i]) > 1e-12
      )
        throw new Error(
          "Reconstruction requires finite, non-negative, symmetric distances",
        );
}

/** Serializes any reconstruction cluster to Newick. @param {object} root Root cluster. @returns {string} Semicolon-terminated Newick. */
export function clusterToNewick(root) {
  function render(node) {
    if (!node.children.length) return quote(node.name);
    return `(${node.children.map((child) => `${render(child.node)}:${child.length.toFixed(6)}`).join(",")})`;
  }
  return render(root) + ";";
}
/** Quotes labels containing Newick punctuation. @param {string} label Taxon label. @returns {string} Safe label. */
function quote(label) {
  return /[\s(),:;\[\]']/.test(label)
    ? `'${label.replaceAll("'", "''")}'`
    : label;
}
