// Expects hash: #/Country/Year/Location/Category
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");

  if (parts.length < 4) {
    heading.textContent = "Heatmap";
    meta.textContent = "No report specified.";
    return;
  }

  const [country, year, location, category] = parts;

  document.title = `Heatmap: ${category} @ ${location}, ${country} (${year})`;
  heading.textContent = `Heatmap: ${category}`;
  meta.textContent = `${location}, ${country} — ${year}`;

  const basePath = `${baseurl}/wildlife/reports/${country}/heatmap/${year}/${location}/${category}`;
  img.src = `${basePath}/heatmap.png`;
  img.alt = `Annual category heatmap for ${category} at ${location}, ${country} in ${year}`;

  link.href = `${basePath}/heatmap.xlsx`;
  link.setAttribute("download", `${category}-${location}-${country}-${year}-heatmap.xlsx`);
})();
