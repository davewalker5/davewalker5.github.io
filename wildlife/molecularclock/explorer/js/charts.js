import { escapeHtml, formatNumber, walkTree } from "./utilities.js";

/** Render lineage rates as horizontal bars. @param {object} root Simulated root. @returns {string} HTML chart. Each bar is normalised to the largest observed rate. */
export function renderRateChart(root) {
  // The root has no incoming branch, so omit it from the lineage-rate chart.
  const branches = walkTree(root).filter((node) => node.parentId),
    maximum = Math.max(...branches.map((node) => node.rate), 1e-12);
  // Width communicates relative rate while the adjacent number preserves the
  // exact value needed for comparison and accessibility.
  return `<div class="rate-list">${branches.map((node) => `<div class="rate-row"><span>${escapeHtml(node.name || node.id)}</span><span class="rate-bar"><i style="width:${(100 * node.rate) / maximum}%"></i></span><strong>${formatNumber(node.rate, 5)}</strong></div>`).join("")}</div>`;
}
/** Render a numeric matrix with value-dependent shading. @param {string[]} labels Labels. @param {number[][]} matrix Values. @returns {string} Accessible table. Finite cells are normalised by the largest value and saturated cells are marked. */
export function renderMatrix(labels, matrix) {
  // Infinite saturated distances cannot define the colour scale, so calculate
  // its maximum from finite cells only and style saturation separately.
  const maximum = Math.max(...matrix.flat().filter(Number.isFinite), 1e-12);
  // Both row and column headers are retained to make symmetry visually explicit.
  return `<div class="table-scroll"><table><thead><tr><th>Taxon</th>${labels.map((x) => `<th>${escapeHtml(x)}</th>`).join("")}</tr></thead><tbody>${matrix.map((row, i) => `<tr><td>${escapeHtml(labels[i])}</td>${row.map((value) => `<td class="heat ${Number.isFinite(value) ? "" : "saturated"}" style="background:rgba(37,99,235,${Number.isFinite(value) ? 0.08 + (0.42 * value) / maximum : 0.55})">${formatNumber(value, 5)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
