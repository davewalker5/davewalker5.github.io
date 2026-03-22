// assets/js/abundance-viewer.js
(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const intro = document.getElementById("intro");

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

  document.title = `Abundance chart for ${category} at ${location}, ${country}`;
  heading.textContent = `Abundance chart for ${category} at ${location}, ${country}`;
  intro.textContent = `This chart shows recorded abundance of ${category} at ${location}, ${country}, based on personal wildlife field records.`;
  meta.textContent = '';
  img.src = png;
  img.alt = `Abundance chart for ${category} at ${location}, ${country}`;
  link.href = xlsx;
  link.setAttribute("download", `${category}-${location}-${country}-abundance.xlsx`);
})();
