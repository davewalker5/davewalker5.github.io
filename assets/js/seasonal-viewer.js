// assets/js/seasonal-viewer.js
(function () {
  function makeSafeSlug(value) {
    if (!value) return "";

    return value
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/['’]/g, "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")   // remove combining marks
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function toDisplayText(value) {
    if (!value) return "";
    return value.replace(/_/g, " ");
  }

  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const intro = document.getElementById("intro");
  const caption = document.getElementById("caption");
  const img = document.getElementById("report-img") || document.getElementById("abundance-img");
  const link = document.getElementById("xlsx-link");

  if (!img || !link) return;

  if (parts.length < 4) {
    heading.textContent = "Wildlife Seasonal Chart";
    meta.textContent = "No report specified.";
    return;
  }

  const [chartType, rawSpecies, rawLocation, rawTableType] = parts;
  const validTypes = ["presence", "totals"];

  if (!validTypes.includes(chartType)) {
    heading.textContent = "Wildlife Seasonal Chart";
    meta.textContent = "Unknown chart type.";
    return;
  }

  var suffix = "";
  var prettyPrefix = "";
  switch (rawTableType) {
    case "breeding":
      suffix = "_breeding";
      prettyPrefix = "Observed Breeding ";
      break;
    default:
      break;
  }

  const safeSpecies = makeSafeSlug(rawSpecies);
  const safeLocation = makeSafeSlug(rawLocation);
  const filestem = `year_in_the_life_${safeSpecies}_${safeLocation}${suffix}`;

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const reportBase = `${baseurl}/wildlife/reports/Year-In-The-Life`;

  const png = `${reportBase}/${filestem}_${chartType}.png`;
  const xlsx = `${reportBase}/${filestem}.xlsx`;

  const prettyType = chartType === "presence" ? "Presence" : "Seasonal Totals";

  document.title = `${prettyPrefix}${prettyType} Chart for ${rawSpecies} at ${rawLocation}`;
  heading.textContent = `${prettyPrefix}${prettyType} Chart for ${rawSpecies} at ${rawLocation}`;
  intro.textContent = `This chart shows the ${chartType} pattern for ${rawSpecies} at ${rawLocation}, based on personal wildlife field records.`;
  meta.textContent = "";
  if (caption) {
    caption.textContent = `${prettyType} view generated from personal field records.`;
  }

  img.src = png;
  img.alt = `${prettyType} chart for ${rawSpecies} at ${rawLocation}`;

  link.href = xlsx;
  link.setAttribute("download", `${filestem}.xlsx`);
})();