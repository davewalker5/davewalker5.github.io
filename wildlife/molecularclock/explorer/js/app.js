import { state, invalidateAfter } from "./state.js";
import { runSimulation } from "./simulation.js";
import {
  calculateDistanceMatrix,
  pairwiseSummary,
  MODEL_LABELS,
  MODEL_EXPLANATIONS,
} from "./distance_matrix.js";
import { upgma, clusterToNewick } from "./upgma.js";
import { neighbourJoining } from "./neighbour_joining.js";
import { calibrateTree } from "./calibration.js";
import { calibratedNewick } from "./newick.js";
import { renderTree } from "./tree_renderer.js";
import { renderRateChart, renderMatrix } from "./charts.js";
import { escapeHtml, formatNumber } from "./utilities.js";
const workspace = document.querySelector("#workspace"),
  sidebar = document.querySelector("#sidebar-controls");
/** Start the explorer and attach tab navigation. @returns {void} A default seeded run makes the workflow immediately usable. */
function initialise() {
  // One delegated listener handles all tab buttons and keeps the active styling
  // in sync with the workspace selected in shared state.
  document.querySelector(".tabs").onclick = (e) => {
    const b = e.target.closest("[data-tab]");
    if (!b) return;
    state.activeTab = b.dataset.tab;
    document
      .querySelectorAll(".tabs button")
      .forEach((x) => x.classList.toggle("active", x === b));
    render();
  };
  controls();
  // Seeded defaults provide useful content on first open without requiring a click.
  simulate();
}

/** Render sidebar controls and bind them to shared settings. @returns {void} Numeric and boolean values retain their semantic types. */
function controls() {
  // Field metadata keeps labels, bounds, and state keys together so the sidebar
  // remains easy to compare with the simulator configuration.
  const fields = [
    ["Sequence length", "sequenceLength", 100, 5000, 100],
    ["Tree depth", "maxDepth", 1, 5, 1],
    ["Random seed", "seed", 0, 4294967295, 1],
    ["Branch duration", "branchDuration", 0.1, 10, 0.1],
    ["Duration jitter", "durationJitter", 0, 9, 0.1],
    ["Root rate", "rootRate", 0.0001, 0.2, 0.001],
    ["Rate sigma", "rateSigma", 0, 2, 0.05],
    ["Minimum rate", "minimumRate", 0.0001, 0.2, 0.001],
    ["Maximum rate", "maximumRate", 0.0001, 0.5, 0.001],
  ];
  sidebar.innerHTML = `<div class="control-section"><h3>Simulation & relaxed clock</h3>${fields.map(([l, k, n, x, s]) => `<label class="field"><span>${l}</span><input type="number" data-setting="${k}" min="${n}" max="${x}" step="${s}" value="${state.settings[k]}"></label>`).join("")}</div><div class="control-section"><h3>Output</h3><label class="field"><span>Branch lengths</span><select data-setting="branchLengths"><option value="genetic_change">Genetic change</option><option value="time">Time</option><option value="rate">Rate</option></select></label><label class="field check"><input type="checkbox" data-setting="allowBackMutation">Allow back mutation</label><button id="simulate" class="primary">Run simulation</button><div id="side-error" class="info error" hidden></div></div>`;
  sidebar.querySelectorAll("[data-setting]").forEach((i) => {
    i.value = state.settings[i.dataset.setting];
    if (i.type === "checkbox") i.checked = state.settings[i.dataset.setting];
    i.oninput = () =>
      (state.settings[i.dataset.setting] =
        i.type === "checkbox"
          ? i.checked
          : i.tagName === "SELECT"
            ? i.value
            : Number(i.value));
  });
  sidebar.querySelector("#simulate").onclick = simulate;
}

/** Run simulation and invalidate dependent stages. @returns {void} Validation errors stay beside the controls. */
function simulate() {
  const box = sidebar.querySelector("#side-error");
  try {
    // A successful upstream run makes every cached downstream result obsolete.
    state.simulation = runSimulation(state.settings);
    invalidateAfter("simulation");
    box.hidden = true;
    render();
  } catch (e) {
    // Keep parameter errors beside the inputs instead of interrupting with an alert.
    box.textContent = e.message;
    box.hidden = false;
  }
}

/** Render the active cached workflow stage. @returns {void} */
function render() {
  // Workspace renderers read shared state and do not recompute upstream stages.
  ({
    simulation: simulationView,
    distance: distanceView,
    reconstruction: reconstructionView,
    calibration: calibrationView,
  })[state.activeTab]();
}

/** Render simulation summary, tree, rates, sequences, and Newick. @returns {void} */
function simulationView() {
  // All values below come from the cached result of the last explicit simulation.
  const r = state.simulation,
    s = r.summary;
  workspace.innerHTML = `<h2 class="section-title">Simulation</h2><p class="section-lead">A full binary history with autocorrelated lognormal lineage rates.</p><div class="grid metrics">${metric("Terminal taxa", s.terminalTaxa)}${metric("Sequence length", s.sequenceLength)}${metric("Mean rate", formatNumber(s.meanRate, 5))}${metric("Observed mutations", s.observed)}</div><div class="grid two-col"><article class="card"><h3>Simulated phylogeny <span class="pill">${state.settings.branchLengths.replace("_", " ")}</span></h3><div class="tree-wrap">${renderTree(r.root, { metric: state.settings.branchLengths })}</div></article><article class="card"><h3>Branch rates</h3>${renderRateChart(r.root)}</article></div><article class="card"><h3>Terminal sequences</h3><div class="sequence-list">${Object.entries(
    r.sequences,
  )
    .map(
      ([n, s]) =>
        `<details><summary>${n}</summary><pre class="sequence">${s}</pre></details>`,
    )
    .join(
      "",
    )}</div></article><article class="card"><h3>True tree (Newick)</h3><pre>${escapeHtml(r.newick)}</pre></article>`;
}

/** Render distance model controls and cached matrix. @returns {void} Changing correction invalidates downstream trees. */
function distanceView() {
  // Terminal label order is shared by selectors, matrix rows, and reconstruction.
  const labels = Object.keys(state.simulation.sequences);
  workspace.innerHTML = `<h2 class="section-title">Distance Matrix</h2><p class="section-lead">Compare aligned sequences and correct for hidden substitutions.</p><article class="card"><div class="inline-fields"><label class="field"><span>Correction model</span><select id="model">${Object.entries(
    MODEL_LABELS,
  )
    .map(
      ([k, v]) =>
        `<option value="${k}" ${k === state.settings.distanceModel ? "selected" : ""}>${v}</option>`,
    )
    .join(
      "",
    )}</select></label><label class="field"><span>First taxon</span><select id="a">${options(labels, labels[0])}</select></label><label class="field"><span>Second taxon</span><select id="b">${options(labels, labels[1])}</select></label></div><button id="calculate" class="primary action">Calculate distance matrix</button><div class="info">${MODEL_EXPLANATIONS[state.settings.distanceModel]}</div></article><div id="results">${distanceResults(labels)}</div>`;
  workspace.querySelector("#model").onchange = (e) => {
    // A model change invalidates the matrix and anything inferred from that matrix.
    state.settings.distanceModel = e.target.value;
    state.distance = null;
    invalidateAfter("distance");
    distanceView();
  };
  workspace.querySelector("#calculate").onclick = () =>
    attempt(() => {
      // Matrix calculation is explicit so users can adjust controls before committing.
      state.distance = calculateDistanceMatrix(
        state.simulation.sequences,
        state.settings.distanceModel,
      );
      invalidateAfter("distance");
      distanceView();
    });
  for (const id of ["a", "b"])
    workspace.querySelector(`#${id}`).onchange = () => {
      if (state.distance)
        workspace.querySelector("#results").innerHTML = distanceResults(labels);
    };
}

/** Build matrix and selected-pair diagnostics. @param {string[]} labels Taxa. @returns {string} Results markup. */
function distanceResults(labels) {
  if (!state.distance)
    return empty(
      "Matrix not calculated",
      "Select a model and calculate all pairwise distances.",
    );
  const a = workspace.querySelector("#a")?.value || labels[0],
    b = workspace.querySelector("#b")?.value || labels[1],
    s = pairwiseSummary(
      state.simulation.sequences,
      a,
      b,
      state.settings.distanceModel,
    ),
    sat = state.distance.matrix.flat().some((x) => !Number.isFinite(x));
  return `<article class="card"><h3>Evolutionary distances</h3>${renderMatrix(labels, state.distance.matrix)}</article><div class="grid metrics">${metric("Hamming differences", s.hamming)}${metric("Observed p-distance", formatNumber(s.proportional))}${metric("Transitions", s.transitions)}${metric("Transversions", s.transversions)}${metric("Corrected distance", formatNumber(s.corrected))}</div>${sat ? '<div class="info warning">A corrected distance is saturated (∞); use a simpler model or lower-rate simulation before reconstruction.</div>' : ""}`;
}

/** Render UPGMA and Neighbor Joining reconstruction. @returns {void} */
function reconstructionView() {
  // Reconstruction depends on finite distances, so an absent matrix is a hard
  // workflow boundary rather than something this view calculates implicitly.
  if (!state.distance) {
    workspace.innerHTML = empty(
      "Distance matrix required",
      "Calculate a distance matrix first.",
    );
    return;
  }
  const up = state.settings.reconstructionMethod === "upgma";
  workspace.innerHTML = `<h2 class="section-title">Reconstruction</h2><p class="section-lead">Infer a phylogeny from evolutionary distances.</p><article class="card"><label class="field"><span>Algorithm</span><select id="method"><option value="upgma" ${up ? "selected" : ""}>UPGMA</option><option value="nj" ${up ? "" : "selected"}>Neighbour Joining</option></select></label><button id="reconstruct" class="primary action">Reconstruct tree</button><div class="info">${up ? "UPGMA returns a rooted ultrametric tree." : "Neighbour Joining returns an unrooted tree; the displayed centre is a drawing convention."}</div></article><div id="results">${treeResults()}</div>`;
  workspace.querySelector("#method").onchange = (e) => {
    // Switching algorithms preserves the distance matrix but clears later stages.
    state.settings.reconstructionMethod = e.target.value;
    state.reconstruction = null;
    invalidateAfter("reconstruction");
    reconstructionView();
  };
  workspace.querySelector("#reconstruct").onclick = () =>
    attempt(() => {
      // Both algorithms return the same cluster shape, allowing shared rendering,
      // Newick serialization, and calibration code.
      const d = state.distance;
      state.reconstruction =
        state.settings.reconstructionMethod === "upgma"
          ? upgma(d.labels, d.matrix)
          : neighbourJoining(d.labels, d.matrix);
      invalidateAfter("reconstruction");
      reconstructionView();
    });
}

/** Build reconstructed tree and Newick output. @returns {string} Results markup. */
function treeResults() {
  // Rooted/unrooted is an interpretation of the algorithm; the common renderer
  // uses the central NJ node only as a practical drawing origin.
  if (!state.reconstruction)
    return empty(
      "Tree not reconstructed",
      "Choose an algorithm and reconstruct the tree.",
    );
  return `<article class="card"><h3>Reconstructed tree <span class="pill">${state.settings.reconstructionMethod === "upgma" ? "rooted" : "unrooted"}</span></h3><div class="tree-wrap">${renderTree(state.reconstruction)}</div></article><article class="card"><h3>Newick representation</h3><pre>${escapeHtml(clusterToNewick(state.reconstruction))}</pre></article>`;
}

/** Render single-point calibration controls and assumptions. @returns {void} */
function calibrationView() {
  // Default to the first two stable taxon labels, then preserve the user's last
  // successful selection on subsequent renders.
  if (!state.reconstruction) {
    workspace.innerHTML = empty(
      "Reconstructed tree required",
      "Reconstruct a tree before calibration.",
    );
    return;
  }
  const taxa = state.reconstruction.members,
    chosen = state.settings.calibrationTaxa.length
      ? state.settings.calibrationTaxa
      : taxa.slice(0, 2);
  workspace.innerHTML = `<h2 class="section-title">Calibration</h2><p class="section-lead">Scale every branch from the known age of one MRCA.</p><article class="card"><div class="inline-fields"><label class="field"><span>First taxon</span><select id="ca">${options(taxa, chosen[0])}</select></label><label class="field"><span>Second taxon</span><select id="cb">${options(taxa, chosen[1])}</select></label><label class="field"><span>Known MRCA age (Mya)</span><input id="age" type="number" min=".001" step=".1" value="${state.settings.calibrationAge}"></label></div><button id="calibrate" class="primary action">Calibrate tree</button></article><div id="results">${calibrationResults()}</div><article class="card"><h3>Assumptions</h3><ul class="assumptions"><li>The taxa identify one MRCA.</li><li>Mean descendant path represents reconstructed depth.</li><li>One scale factor preserves topology and relative branches.</li><li>A single calibration does not model uncertainty.</li></ul></article>`;
  workspace.querySelector("#calibrate").onclick = () =>
    attempt(() => {
      // Persist validated control values alongside the result so re-rendering
      // does not reset the selected calibration point.
      const t = [
          workspace.querySelector("#ca").value,
          workspace.querySelector("#cb").value,
        ],
        age = Number(workspace.querySelector("#age").value);
      state.settings.calibrationTaxa = t;
      state.settings.calibrationAge = age;
      state.calibration = calibrateTree(state.reconstruction, t, age);
      calibrationView();
    });
}

/** Build calibrated metrics, tree and Newick. @returns {string} Results markup. */
function calibrationResults() {
  // Metadata deliberately exposes the intermediate depth and factor, making the
  // simple scaling calculation auditable rather than presenting only a final tree.
  if (!state.calibration)
    return empty("Tree not calibrated", "Choose two taxa and a known age.");
  const { tree, metadata: m } = state.calibration;
  return `<div class="grid metrics">${metric("Known age", `${formatNumber(m.calibrationAgeMya, 3)} Mya`)}${metric("Reconstructed depth", formatNumber(m.reconstructedDepth, 6))}${metric("Scale factor", formatNumber(m.scaleFactor, 6))}</div><article class="card"><h3>Calibrated tree</h3><div class="tree-wrap">${renderTree(tree, { units: "million years" })}</div></article><article class="card"><h3>Calibrated Newick</h3><pre>${escapeHtml(calibratedNewick(tree))}</pre></article>`;
}

/** Run a UI action and show its error locally. @param {Function} action Action. @returns {void} */
function attempt(action) {
  try {
    // Workspace actions share one error boundary and render failures in context.
    action();
  } catch (e) {
    workspace.querySelector("#results").innerHTML =
      `<div class="info error">${escapeHtml(e.message)}</div>`;
  }
}

/** Render select options. @param {string[]} values Values. @param {string} selected Selected value. @returns {string} Markup. */
function options(values, selected) {
  // Labels originate from generated taxa but are escaped to keep this helper safe
  // if future versions accept uploaded or user-named sequences.
  return values
    .map(
      (v) =>
        `<option ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`,
    )
    .join("");
}

/** Render a metric. @param {string} label Label. @param {unknown} value Value. @returns {string} Markup. */
function metric(label, value) {
  // Escape computed values before interpolation into reusable summary cards.
  return `<div class="metric"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`;
}

/** Render prerequisite guidance. @param {string} title Heading. @param {string} message Guidance. @returns {string} Markup. */
function empty(title, message) {
  // Empty states explain the upstream action needed to unlock a workflow stage.
  return `<div class="card empty"><div class="icon">◌</div><h2>${title}</h2><p>${message}</p></div>`;
}
initialise();
// Convert DOM strings at the boundary; algorithms should receive numbers
// and booleans rather than knowing anything about form controls.
// Read the current pair selectors only for the diagnostic cards; the full
// matrix remains cached and is unaffected by which pair is inspected.
