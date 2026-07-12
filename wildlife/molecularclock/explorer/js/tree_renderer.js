import { escapeHtml, formatNumber } from "./utilities.js";

/** Render a responsive rectangular phylogram. @param {object} root Tree root. @param {object} options Metric and description. @returns {string} Accessible SVG. The algorithm places leaves in rows, centres parents, and scales x by cumulative branch length. */
export function renderTree(root, options = {}) {
  // A fixed viewBox keeps geometry predictable while CSS scales the SVG to its card.
  const width = 1200,
    leaves = leafNodes(root),
    height = Math.max(220, 70 + (leaves.length - 1) * 58),
    positions = new Map(),
    distances = new Map([[root, 0]]);
  // Horizontal position represents accumulated evolutionary distance rather
  // than topology alone, producing a true rectangular phylogram.
  assignDistances(root, distances, options);
  const maximum = Math.max(...distances.values(), 1e-12),
    drawable = 984;
  // Leaves receive evenly spaced rows. Internal y positions cannot be computed
  // until these terminal anchors exist.
  leaves.forEach((leaf, index) =>
    positions.set(leaf, {
      x: 36 + (distances.get(leaf) / maximum) * drawable,
      y: 35 + index * 58,
    }),
  );
  assignParents(root, positions, distances, maximum, drawable);
  const branches = [];
  // Draw each edge as a vertical connector followed by a horizontal branch;
  // labels sit halfway along the horizontal, length-bearing portion.
  for (const parent of nodes(root))
    for (const edge of edges(parent, options)) {
      const a = positions.get(parent),
        b = positions.get(edge.node);
      branches.push(
        `<path class="tree-line" d="M ${a.x} ${a.y} V ${b.y} H ${b.x}"/><text class="branch-label" x="${a.x + (b.x - a.x) / 2}" y="${b.y - 7}">${formatNumber(edge.length, 4)}</text>`,
      );
    }
  const points = nodes(root).map((node) => {
    const p = positions.get(node),
      leaf = !edges(node).length;
    return `<circle class="tree-node ${leaf ? "tree-leaf" : ""}" cx="${p.x}" cy="${p.y}" r="${leaf ? 5 : 4}"/>${leaf ? `<text class="tree-label" x="${p.x + 11}" y="${p.y + 4}">${escapeHtml(node.name || node.id)}</text>` : ""}`;
  });
  const description =
    options.description || `Tree scaled by ${options.units || "branch length"}`;
  // All labels are escaped because SVG text is parsed as markup like ordinary HTML.
  return `<svg class="tree-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(description)}"><title>${escapeHtml(description)}</title>${branches.join("")}${points.join("")}</svg>`;
}

/** Normalise child representations. @param {object} node Parent. @param {object} options Metric choice. @returns {object[]} Child edges. Reconstruction stores wrappers; simulation stores annotations on nodes. */
function edges(node, options = {}) {
  // Reconstruction algorithms use {node, length} edge wrappers, whereas the
  // simulator stores incoming branch annotations directly on child nodes.
  return (node.children || []).map((child) =>
    child.node
      ? child
      : { node: child, length: simulatedLength(child, options.metric) },
  );
}

/** Select a simulated branch quantity. @param {object} node Child node. @param {string} metric Quantity name. @returns {number} Drawing length. */
function simulatedLength(node, metric = "genetic_change") {
  // Clamp only missing or negative display quantities; valid simulation branch
  // values are non-negative and reconstruction edges bypass this helper.
  return Math.max(
    0,
    Number(
      metric === "time"
        ? node.duration
        : metric === "rate"
          ? node.rate
          : node.geneticChange,
    ) || 0,
  );
}

/** Traverse nodes parent first. @param {object} root Root. @returns {object[]} Flattened tree. */
function nodes(root) {
  // Pre-order traversal is sufficient because rendering uses stored coordinates.
  return [root, ...edges(root).flatMap((edge) => nodes(edge.node))];
}

/** Collect leaves in deterministic child order. @param {object} root Root. @returns {object[]} Leaves. */
function leafNodes(root) {
  const children = edges(root);
  // Preserving child order keeps taxon rows stable across redraws.
  return children.length
    ? children.flatMap((edge) => leafNodes(edge.node))
    : [root];
}

/** Accumulate root-to-node distances. @param {object} node Parent. @param {Map} distances Output. @param {object} options Metric choice. @returns {void} */
function assignDistances(node, distances, options) {
  for (const edge of edges(node, options)) {
    // A child's root distance equals its parent's distance plus its incoming edge.
    distances.set(edge.node, distances.get(node) + edge.length);
    assignDistances(edge.node, distances, options);
  }
}

/** Centre internal nodes after leaf layout. @param {object} node Node. @param {Map} positions Output. @param {Map} distances Cumulative distances. @param {number} maximum Scale. @param {number} drawable Width. @returns {number} Vertical position. */
function assignParents(node, positions, distances, maximum, drawable) {
  const children = edges(node);
  if (!children.length) return positions.get(node).y;
  const ys = children.map((edge) =>
      assignParents(edge.node, positions, distances, maximum, drawable),
    ),
    y = ys.reduce((a, b) => a + b, 0) / ys.length;
  positions.set(node, {
    // Internal x follows the same cumulative-distance scale used for leaves.
    x: 36 + (distances.get(node) / maximum) * drawable,
    y,
  });
  return y;
}
// Post-order recursion ensures every child y-coordinate exists before its parent.
