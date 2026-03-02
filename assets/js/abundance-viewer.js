// assets/js/abundance-viewer.js
(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");

  // Works with either <img id="report-img"> or legacy <img id="abundance-img">
  const img = document.getElementById("report-img") || document.getElementById("abundance-img");
  const link = document.getElementById("xlsx-link");
  if (!img || !link) return;

  if (parts.length < 3) {
    heading.textContent = "Abundance";
    meta.textContent = "No report specified.";
    return;
  }

  const [country, location, category] = parts;
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const basePath = `${baseurl}/wildlife/reports/${country}/abundance/${location}/${category}`;
  const png = `${basePath}/abundance.png`;
  const xlsx = `${basePath}/abundance.xlsx`;

  document.title = `Abundance: ${category} @ ${location}, ${country}`;
  heading.textContent = `Abundance: ${category}`;
  meta.textContent = `${location}, ${country}`;
  img.src = png;
  img.alt = `Abundance chart for ${category} at ${location}, ${country}`;
  link.href = xlsx;
  link.setAttribute("download", `${category}-${location}-${country}-abundance.xlsx`);
})();
