/** Calibrates all reconstruction branches from the known age of one MRCA. @param {object} root Reconstruction cluster. @param {string[]} taxa Two or more descendant taxa. @param {number} ageMya Known MRCA age. @returns {object} Calibrated copy and metadata. */
export function calibrateTree(root, taxa, ageMya) {
  // A calibration point needs at least two distinct descendants and a positive age.
  if (new Set(taxa).size < 2 || !Number.isFinite(ageMya) || ageMya <= 0)
    throw new Error("Choose two different taxa and a positive calibration age");
  const mrca = findMrca(root, new Set(taxa)),
    depths = taxa.map((t) => distanceToTaxon(mrca, t));
  if (depths.some((x) => x === null))
    throw new Error("Calibration taxa were not found below a unique MRCA");
  // An ultrametric tree gives identical descendant paths. Their mean is also a
  // transparent approximation for non-ultrametric NJ reconstructions.
  const reconstructedDepth = depths.reduce((a, b) => a + b, 0) / depths.length;
  if (reconstructedDepth <= 0)
    throw new Error("Calibration node depth must be greater than zero");
  const scaleFactor = ageMya / reconstructedDepth,
    // Clone while scaling so the original reconstructed tree remains available
    // for comparison in the preceding workspace.
    tree = scaleTree(root, scaleFactor);
  return {
    tree,
    metadata: {
      calibrationTaxa: [...taxa],
      calibrationAgeMya: ageMya,
      reconstructedDepth,
      scaleFactor,
      units: "million years",
    },
  };
}

/** Finds the smallest subtree containing all selected taxa. @param {object} node Current cluster. @param {Set<string>} taxa Required leaves. @returns {object} MRCA cluster. */
function findMrca(node, taxa) {
  for (const child of node.children) {
    const names = new Set(child.node.members);
    // Descend only while one child still contains every requested taxon. The
    // first node where no child qualifies is their smallest shared subtree.
    if ([...taxa].every((x) => names.has(x))) return findMrca(child.node, taxa);
  }
  return node;
}
/** Measures path length from a cluster to a leaf. @param {object} node Starting cluster. @param {string} taxon Leaf label. @param {number} distance Accumulated length. @returns {number|null} Path length. */
function distanceToTaxon(node, taxon, distance = 0) {
  // Reaching a leaf resolves this search path; a different leaf is a dead end.
  if (!node.children.length) return node.name === taxon ? distance : null;
  for (const child of node.children) {
    // Branch lengths are stored on child wrappers, so add before descending.
    const found = distanceToTaxon(child.node, taxon, distance + child.length);
    if (found !== null) return found;
  }
  return null;
}
/** Deep-copies a tree and scales all child branches. @param {object} node Current cluster. @param {number} factor Scale factor. @returns {object} Calibrated clone. */
function scaleTree(node, factor) {
  // Spread scalar node metadata, copy the members array, and recursively create
  // new edge wrappers so no object in the input tree is mutated.
  return {
    ...node,
    members: [...node.members],
    children: node.children.map((child) => ({
      length: child.length * factor,
      node: scaleTree(child.node, factor),
    })),
  };
}
