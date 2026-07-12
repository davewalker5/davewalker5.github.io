/** Serializes a cluster with calibrated precision. @param {object} root Tree root. @returns {string} Newick document. */
export function calibratedNewick(root) {
  function render(node) {
    // Leaves contribute labels; internal nodes recursively enclose their children.
    if (!node.children.length) return node.name;
    // Twelve significant digits match the Python calibration serializer closely
    // while trimming insignificant trailing zeroes for readable output.
    return `(${node.children.map((child) => `${render(child.node)}:${child.length.toPrecision(12).replace(/0+$/, "").replace(/\.$/, "")}`).join(",")})`;
  }
  // A semicolon terminates a complete Newick document.
  return render(root) + ";";
}
