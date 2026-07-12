/** Deterministic small pseudo-random generator suitable for repeatable teaching runs. */
export class SeededRandom {
  constructor(seed) {
    // Coerce the user seed into the unsigned 32-bit state expected by Mulberry32.
    this.value = (Number(seed) || 0) >>> 0;
    this.spare = null;
  }

  random() {
    // Mulberry32 combines shifts and integer multiplication into a compact,
    // deterministic generator suitable for simulation demonstrations.
    this.value = (this.value + 0x6d2b79f5) >>> 0;
    let t = this.value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  uniform(a, b) {
    // Affine scaling maps the generator's [0, 1) output onto [a, b).
    return a + (b - a) * this.random();
  }

  choice(items) {
    // Every array slot receives an equal-width interval of random values.
    return items[Math.floor(this.random() * items.length)];
  }

  normal() {
    if (this.spare !== null) {
      // Box-Muller produces two independent normal values; cache one to avoid
      // repeating its logarithm and trigonometric work on the next request.
      const value = this.spare;
      this.spare = null;
      return value;
    }
    let u = 0,
      v = 0;
    while (u === 0) u = this.random();
    while (v === 0) v = this.random();
    // Zero is rejected because log(0) is undefined in the Box-Muller transform.
    const mag = Math.sqrt(-2 * Math.log(u));
    this.spare = mag * Math.sin(2 * Math.PI * v);
    return mag * Math.cos(2 * Math.PI * v);
  }

  lognormal(mu, sigma) {
    // Exponentiating a normal variate produces a positive lognormal multiplier.
    return Math.exp(mu + sigma * this.normal());
  }
}

/** Escapes user-visible values before inserting them into HTML.
 * @param {unknown} value Value to escape.
 * @returns {string} HTML-safe text.
 */
export function escapeHtml(value) {
  // Replace the five characters that can alter HTML text or attribute syntax.
  return String(value).replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
}

/** Formats finite distances consistently and labels saturation.
 * @param {number} value Numeric result.
 * @param {number} digits Significant decimal places.
 * @returns {string} Compact display value.
 */
export function formatNumber(value, digits = 5) {
  // Corrected distances may saturate mathematically; show infinity explicitly
  // instead of leaking JavaScript's string representation into the interface.
  return Number.isFinite(value)
    ? Number(value).toFixed(digits).replace(/0+$/, "").replace(/\.$/, "")
    : "∞";
}

/** Returns all nodes in parent-before-child order.
 * @param {object} root Tree root.
 * @returns {object[]} Flattened nodes.
 */
export function walkTree(root) {
  const nodes = [root];
  // Pre-order recursion preserves the simulator's deterministic left-to-right order.
  for (const child of root.children || []) nodes.push(...walkTree(child));
  return nodes;
}
