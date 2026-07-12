import {
  calculateDistance,
  frequencies,
  substitutionCounts,
  hamming,
  proportional,
} from "./substitution_models.js";

/** Calculates a symmetric pairwise evolutionary distance matrix. @param {Object<string,string>} sequences Labelled alignment. @param {string} model Distance model key. @returns {object} Matrix payload. */
export function calculateDistanceMatrix(sequences, model) {
  const labels = Object.keys(sequences),
    matrix = labels.map((a) =>
      labels.map((b) => calculateDistance(sequences[a], sequences[b], model)),
    );
  return { labels, matrix, distanceMetric: model };
}

/** Builds diagnostic values for one taxon pair. @param {Object<string,string>} sequences Sequence mapping. @param {string} a First taxon. @param {string} b Second taxon. @param {string} model Model key. @returns {object} Observed and corrected values. */
export function pairwiseSummary(sequences, a, b, model) {
  const first = sequences[a],
    second = sequences[b],
    counts = substitutionCounts(first, second);
  return {
    a,
    b,
    hamming: hamming(first, second),
    proportional: proportional(first, second),
    corrected: calculateDistance(first, second, model),
    ...counts,
    frequencies: frequencies(first, second),
  };
}

export const MODEL_LABELS = {
  hamming: "Hamming Distance",
  proportional: "Proportional Distance (p-distance)",
  jc69: "JC69",
  k80: "K80",
  f81: "F81",
  hky85: "HKY85",
};
export const MODEL_EXPLANATIONS = {
  hamming:
    "Counts differing aligned sites without correcting for sequence length or hidden substitutions.",
  proportional:
    "Divides observed differences by alignment length, but does not correct repeated mutation.",
  jc69: "Assumes equal base frequencies and substitution rates, correcting for hidden repeated changes.",
  k80: "Corrects transitions and transversions separately.",
  f81: "Allows unequal empirical nucleotide frequencies while correcting repeated changes.",
  hky85:
    "Combines transition/transversion separation with unequal base frequencies.",
};
