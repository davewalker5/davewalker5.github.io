/** Central application state and dependency invalidation for the explorer. */
export const state = {
  activeTab: "simulation",
  settings: {
    sequenceLength: 500,
    maxDepth: 3,
    seed: 42,
    branchDuration: 1,
    durationJitter: 0,
    rootRate: 0.01,
    rateSigma: 0.25,
    minimumRate: 0.001,
    maximumRate: 0.05,
    branchLengths: "genetic_change",
    allowBackMutation: true,
    distanceModel: "hky85",
    reconstructionMethod: "upgma",
    calibrationAge: 10,
    calibrationTaxa: [],
  },
  simulation: null,
  distance: null,
  reconstruction: null,
  calibration: null,
};

/** Invalidates results below a changed workflow stage.
 * @param {'simulation'|'distance'|'reconstruction'} stage Earliest changed stage.
 * @returns {void} The shared state is modified in place.
 */
export function invalidateAfter(stage) {
  // Results form a dependency chain, so only stages to the right of the
  // changed stage are stale. The result at `stage` has just been replaced.
  const order = ["simulation", "distance", "reconstruction", "calibration"];
  const start = order.indexOf(stage) + 1;
  for (let i = start; i < order.length; i += 1) state[order[i]] = null;
}
