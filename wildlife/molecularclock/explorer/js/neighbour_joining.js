import { validateMatrix } from "./upgma.js";

/** Reconstructs a distance tree with Neighbor Joining. @param {string[]} labels Taxa. @param {number[][]} matrix Symmetric distances. @returns {object} Unrooted central cluster representation. */
export function neighbourJoining(labels, matrix) {
  validateMatrix(labels, matrix);
  // Store only one value per unordered cluster pair. Stable cluster names make
  // the map compact and deterministic throughout repeated joins.
  let clusters = [...labels]
      .sort()
      .map((name) => ({ name, members: [name], height: 0, children: [] })),
    distances = new Map();
  const index = Object.fromEntries(labels.map((x, i) => [x, i]));
  // Seed the active distance map from the user-visible input matrix.
  for (let i = 0; i < clusters.length; i += 1)
    for (let j = i + 1; j < clusters.length; j += 1)
      setDistance(
        distances,
        clusters[i],
        clusters[j],
        matrix[index[clusters[i].name]][index[clusters[j].name]],
      );
  while (clusters.length > 3) {
    // Each row total measures how far a cluster lies from all other active
    // clusters and is used to remove this global divergence from pair choice.
    const totals = Object.fromEntries(
      clusters.map((a) => [
        a.name,
        clusters
          .filter((b) => b !== a)
          .reduce((sum, b) => sum + getDistance(distances, a, b), 0),
      ]),
    );
    const pairs = [];
    // The Q criterion favours pairs that are close to each other relative to
    // their total distances from the rest of the tree.
    for (let i = 0; i < clusters.length; i += 1)
      for (let j = i + 1; j < clusters.length; j += 1)
        pairs.push({
          a: clusters[i],
          b: clusters[j],
          q:
            (clusters.length - 2) *
              getDistance(distances, clusters[i], clusters[j]) -
            totals[clusters[i].name] -
            totals[clusters[j].name],
          key: key(clusters[i], clusters[j]),
        });
    pairs.sort((x, y) => x.q - y.q || x.key.localeCompare(y.key));
    let { a, b } = pairs[0];
    [a, b] = [a, b].sort((x, y) => x.name.localeCompare(y.name));
    const d = getDistance(distances, a, b),
      // NJ permits unequal child branches; the row-total difference allocates
      // the observed pair distance between the two children.
      left =
        0.5 * d +
        (totals[a.name] - totals[b.name]) / (2 * (clusters.length - 2)),
      members = [...a.members, ...b.members].sort(),
      merged = {
        name: members.join("+"),
        members,
        height: 0,
        children: [
          { node: a, length: left },
          { node: b, length: d - left },
        ],
      },
      remaining = clusters.filter((c) => c !== a && c !== b),
      next = new Map();
    // Distances among unaffected clusters carry forward unchanged.
    for (let i = 0; i < remaining.length; i += 1)
      for (let j = i + 1; j < remaining.length; j += 1)
        setDistance(
          next,
          remaining[i],
          remaining[j],
          getDistance(distances, remaining[i], remaining[j]),
        );
    // The NJ reduction formula gives each remaining cluster's distance to the
    // newly created internal node without cluster-size weighting.
    for (const c of remaining)
      setDistance(
        next,
        merged,
        c,
        (getDistance(distances, a, c) + getDistance(distances, b, c) - d) / 2,
      );
    clusters = remaining
      .concat(merged)
      .sort((x, y) => x.name.localeCompare(y.name));
    distances = next;
  }
  if (clusters.length === 2) {
    // Two-taxon input has no Q-matrix iteration, so connect both at the midpoint.
    const [a, b] = clusters,
      d = getDistance(distances, a, b);
    return {
      name: [...a.members, ...b.members].sort().join("+"),
      members: [...a.members, ...b.members].sort(),
      height: 0,
      children: [
        { node: a, length: d / 2 },
        { node: b, length: d / 2 },
      ],
    };
  }
  const [a, b, c] = clusters,
    dab = getDistance(distances, a, b),
    dac = getDistance(distances, a, c),
    dbc = getDistance(distances, b, c);
  // With three clusters remaining, the three pairwise equations uniquely
  // determine their branches to one unrooted central node.
  return {
    name: labels.slice().sort().join("+"),
    members: labels.slice().sort(),
    height: 0,
    children: [
      { node: a, length: (dab + dac - dbc) / 2 },
      { node: b, length: (dab + dbc - dac) / 2 },
      { node: c, length: (dac + dbc - dab) / 2 },
    ],
  };
}

/** Creates a stable unordered cluster key. @param {object} a First cluster. @param {object} b Second cluster. @returns {string} Map key. */
function key(a, b) {
  // Sorting makes lookup independent of caller order; the NUL separator cannot
  // be confused with a taxon name produced by this explorer.
  return [a.name, b.name].sort().join("\u0000");
}
/** Stores a current cluster distance. @param {Map} map Distance map. @param {object} a First cluster. @param {object} b Second cluster. @param {number} value Distance. @returns {void} */
function setDistance(map, a, b, value) {
  // Centralising map access prevents inconsistent key construction.
  map.set(key(a, b), value);
}
/** Reads a current cluster distance. @param {Map} map Distance map. @param {object} a First cluster. @param {object} b Second cluster. @returns {number} Stored distance. */
function getDistance(map, a, b) {
  // A missing value indicates an internal algorithm error and naturally
  // propagates into validation rather than being silently treated as zero.
  return map.get(key(a, b));
}
