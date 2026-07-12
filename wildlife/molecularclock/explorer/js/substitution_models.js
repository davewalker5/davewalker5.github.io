const DNA = new Set(["A", "C", "G", "T"]);
const TRANSITIONS = new Set(["AG", "GA", "CT", "TC"]);

/** Counts differing aligned sites. @param {string} a First sequence. @param {string} b Second sequence. @returns {number} Difference count. */
export function hamming(a, b) {
  validatePair(a, b, false);
  let n = 0;
  // Hamming distance is a raw count, so every unequal aligned site contributes one.
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) n += 1;
  return n;
}

/** Calculates observed differences per site. @param {string} a First sequence. @param {string} b Second sequence. @returns {number} Proportional distance. */
export function proportional(a, b) {
  validatePair(a, b, false);
  if (!a.length) throw new Error("Sequences must not be empty");
  // Dividing by alignment length makes results comparable across datasets.
  return hamming(a, b) / a.length;
}

/** Applies the JC69 repeated-substitution correction. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {number} Substitutions per site or infinity. */
export function jc69(a, b) {
  validatePair(a, b, true);
  const p = proportional(a, b);
  return p === 0 ? 0 : p >= 0.75 ? Infinity : -0.75 * Math.log(1 - (4 * p) / 3);
}

/** Counts transition and transversion differences. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {{transitions:number,transversions:number}} Substitution counts. */
export function substitutionCounts(a, b) {
  validatePair(a, b, true);
  let transitions = 0,
    transversions = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === b[i]) continue;
    if (TRANSITIONS.has(a[i] + b[i])) transitions += 1;
    else transversions += 1;
  }
  return { transitions, transversions };
}

/** Applies the Kimura two-parameter correction. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {number} Corrected distance or infinity. */
export function k80(a, b) {
  const { transitions, transversions } = substitutionCounts(a, b);
  if (!transitions && !transversions) return 0;
  const p = transitions / a.length,
    q = transversions / a.length,
    x = 1 - 2 * p - q,
    y = 1 - 2 * q;
  // Non-positive logarithm arguments indicate substitution saturation.
  return x <= 0 || y <= 0 ? Infinity : -0.5 * Math.log(x) - 0.25 * Math.log(y);
}

/** Estimates pooled nucleotide frequencies. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {Object<string,number>} A/C/G/T frequencies. */
export function frequencies(a, b) {
  validatePair(a, b, true);
  const result = { A: 0, C: 0, G: 0, T: 0 };
  for (const base of a + b) result[base] += 1;
  for (const base of Object.keys(result)) result[base] /= a.length + b.length;
  return result;
}

/** Applies F81 with empirical base composition. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {number} Corrected distance or infinity. */
export function f81(a, b) {
  const p = proportional(a, b);
  if (p === 0) return 0;
  const f = frequencies(a, b),
    factor = 1 - Object.values(f).reduce((sum, x) => sum + x * x, 0);
  return factor <= 0 || p >= factor
    ? Infinity
    : -factor * Math.log(1 - p / factor);
}

/** Applies the project's HKY85 approximation. @param {string} a First DNA sequence. @param {string} b Second DNA sequence. @returns {number} Corrected distance or infinity. */
export function hky85(a, b) {
  const { transitions, transversions } = substitutionCounts(a, b);
  if (!transitions && !transversions) return 0;
  const f = frequencies(a, b),
    factor = 2 * (f.A + f.G) * (f.C + f.T),
    p = transitions / a.length,
    q = transversions / a.length,
    x = 1 - p / factor - q,
    y = 1 - 2 * q;
  return factor <= 0 || x <= 0 || y <= 0
    ? Infinity
    : -factor * Math.log(x) - 0.5 * (1 - factor) * Math.log(y);
}

/** Dispatches a named distance model. @param {string} a First sequence. @param {string} b Second sequence. @param {string} model Model key. @returns {number} Pairwise distance. */
export function calculateDistance(a, b, model) {
  // Keeping dispatch in one table makes the matrix algorithm model-agnostic.
  const models = { hamming, proportional, jc69, k80, f81, hky85 };
  if (!models[model]) throw new Error(`Unknown distance model: ${model}`);
  return models[model](a, b);
}

/** Validates aligned sequences and optional DNA alphabet. @param {string} a First sequence. @param {string} b Second sequence. @param {boolean} dna Require DNA. @returns {void} Throws for invalid input. */
function validatePair(a, b, dna) {
  // All models require an alignment; corrected DNA models additionally require
  // a non-empty canonical nucleotide alphabet.
  if (a.length !== b.length)
    throw new Error("Sequences must have the same length");
  if (dna && (!a.length || [...(a + b)].some((x) => !DNA.has(x))))
    throw new Error("Corrected models require non-empty A/C/G/T sequences");
}
// JC69 cannot distinguish finite distances once 75% of sites differ; the
// logarithm reaches its boundary there, so report saturation explicitly.
// Purine↔purine and pyrimidine↔pyrimidine changes are transitions;
// every other unequal DNA pair is a transversion.
// K80 estimates the two observed proportions separately because transitions
// and transversions commonly occur at different rates.
// Pool both taxa so their pairwise correction uses one shared composition.
// 1 - sum(pi²) is the expected mismatch ceiling under the observed base mix.
// The composition factor separates purine and pyrimidine mass while p and q
// retain the observed transition/transversion distinction.
