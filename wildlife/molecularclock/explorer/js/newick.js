/** Serializes a cluster with calibrated precision. @param {object} root Tree root. @returns {string} Newick document. */
export function calibratedNewick(root) {
  function render(node) {
    if (!node.children.length) return node.name;
    return `(${node.children.map((child) => `${render(child.node)}:${child.length.toPrecision(12).replace(/0+$/, "").replace(/\.$/, "")}`).join(",")})`;
  }
  return render(root) + ";";
}
