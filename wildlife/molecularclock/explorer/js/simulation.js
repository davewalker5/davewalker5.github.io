import { SeededRandom, walkTree } from "./utilities.js";

/** Runs the complete browser-side relaxed-clock simulation.
 * @param {object} settings Validated explorer controls.
 * @returns {object} Tree, terminal sequences, Newick and summary.
 */
export function runSimulation(settings) {
  validateSettings(settings);
  const rng = new SeededRandom(settings.seed),
    counter = { node: 0, leaf: 0, taxon: 0 };
  const root = buildTree(settings.maxDepth, counter);
  root.sequence = randomSequence(settings.sequenceLength, rng);
  root.rate = settings.rootRate;
  assignBranches(root, settings, rng);
  evolve(root, root.sequence, settings, rng);
  const nodes = walkTree(root),
    branches = nodes.filter((n) => n.parentId),
    rates = branches.map((n) => n.rate),
    sequences = Object.fromEntries(
      nodes
        .filter((n) => !n.children.length)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((n) => [n.name, n.sequence]),
    );
  return {
    root,
    sequences,
    newick: toNewick(root, settings.branchLengths) + ";",
    summary: {
      terminalTaxa: Object.keys(sequences).length,
      sequenceLength: settings.sequenceLength,
      minRate: Math.min(...rates),
      maxRate: Math.max(...rates),
      meanRate: rates.reduce((a, b) => a + b, 0) / rates.length,
      expected: branches.reduce((a, n) => a + n.expected, 0),
      observed: branches.reduce((a, n) => a + n.mutations.length, 0),
    },
  };
}

/** Builds a full binary topology with stable educational labels. @param {number} maxDepth Branching depth. @param {object} counter Mutable identifiers. @param {number} depth Current recursion depth. @returns {object} Subtree root. */
function buildTree(maxDepth, counter, depth = 0) {
  if (depth === maxDepth)
    return {
      id: `leaf_${++counter.leaf}`,
      name: `taxon_${++counter.taxon}`,
      depth,
      children: [],
      mutations: [],
    };
  const node = {
    id: `node_${++counter.node}`,
    name: null,
    depth,
    children: [],
    mutations: [],
  };
  node.children = [
    buildTree(maxDepth, counter, depth + 1),
    buildTree(maxDepth, counter, depth + 1),
  ];
  return node;
}

/** Assigns duration, autocorrelated rate and genetic length to every branch. @param {object} node Parent node. @param {object} settings Clock settings. @param {SeededRandom} rng Random source. @returns {void} Mutates child annotations. */
function assignBranches(node, settings, rng) {
  for (const child of node.children) {
    const duration =
      settings.durationJitter === 0
        ? settings.branchDuration
        : rng.uniform(
            settings.branchDuration - settings.durationJitter,
            settings.branchDuration + settings.durationJitter,
          );
    const modifier = rng.lognormal(
      -0.5 * settings.rateSigma ** 2,
      settings.rateSigma,
    );
    child.parentId = node.id;
    child.duration = duration;
    child.rate = Math.min(
      settings.maximumRate,
      Math.max(settings.minimumRate, node.rate * modifier),
    );
    child.geneticChange = duration * child.rate;
    child.expected = settings.sequenceLength * child.geneticChange;
    assignBranches(child, settings, rng);
  }
}

/** Evolves each daughter sequence using branch substitution probabilities. @param {object} node Parent node. @param {string} rootSequence Root sequence for reversion filtering. @param {object} settings Mutation settings. @param {SeededRandom} rng Random source. @returns {void} Adds sequences and mutation events. */
function evolve(node, rootSequence, settings, rng) {
  for (const child of node.children) {
    const bases = [...node.sequence],
      events = [],
      probability = 1 - Math.exp(-child.rate * child.duration);
    for (let i = 0; i < bases.length; i += 1) {
      if (rng.random() >= probability) continue;
      const candidates = ["A", "C", "G", "T"].filter(
        (base) =>
          base !== bases[i] &&
          (settings.allowBackMutation || base !== rootSequence[i]),
      );
      if (!candidates.length) continue;
      const derived = rng.choice(candidates);
      events.push({
        position: i,
        ancestralBase: bases[i],
        derivedBase: derived,
      });
      bases[i] = derived;
    }
    child.sequence = bases.join("");
    child.mutations = events;
    evolve(child, rootSequence, settings, rng);
  }
}

/** Creates a random root DNA sequence. @param {number} length Site count. @param {SeededRandom} rng Random source. @returns {string} Root DNA. */
function randomSequence(length, rng) {
  let result = "";
  for (let i = 0; i < length; i += 1)
    result += rng.choice(["A", "C", "G", "T"]);
  return result;
}

/** Serializes the simulated tree using the selected branch quantity. @param {object} node Current node. @param {string} branchType time, rate or genetic_change. @returns {string} Newick subtree. */
export function toNewick(node, branchType) {
  const label = node.children.length ? `internal_${node.id}` : node.name;
  const value =
    branchType === "time"
      ? node.duration
      : branchType === "rate"
        ? node.rate
        : node.geneticChange;
  const branch = node.parentId
    ? `:${Number(value).toPrecision(10).replace(/0+$/, "").replace(/\.$/, "")}`
    : "";
  return node.children.length
    ? `(${node.children.map((child) => toNewick(child, branchType)).join(",")})${label}${branch}`
    : `${label}${branch}`;
}

/** Rejects impossible parameter combinations before computation. @param {object} s Settings. @returns {void} Throws a readable error. */
function validateSettings(s) {
  if (s.sequenceLength < 1 || s.maxDepth < 1)
    throw new Error("Sequence length and tree depth must be positive");
  if (
    s.branchDuration <= 0 ||
    s.durationJitter < 0 ||
    s.durationJitter >= s.branchDuration
  )
    throw new Error(
      "Duration jitter must be non-negative and below branch duration",
    );
  if (
    s.rootRate <= 0 ||
    s.minimumRate <= 0 ||
    s.maximumRate < s.minimumRate ||
    s.rootRate < s.minimumRate ||
    s.rootRate > s.maximumRate
  )
    throw new Error("Root rate must fall within valid positive rate bounds");
}
