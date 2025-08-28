(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");

  if (parts.length < 3) {
    heading.textContent = "Composition";
    meta.textContent = "No report specified.";
    return;
  }

  const [country, location, category] = parts;
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const basePath = `${baseurl}/wildlife/reports/${country}/composition/${location}/${category}`;
  const png = `${basePath}/composition.png`;
  const xlsx = `${basePath}/composition.xlsx`;

  document.title = `Composition: ${category} @ ${location}, ${country}`;
  heading.textContent = `Composition: ${category}`;
  meta.textContent = `${location}, ${country}`;

  img.src = png;
  img.alt = `Composition chart for ${category} at ${location}, ${country}`;
  link.href = xlsx;
  link.setAttribute("download", `${category}-${location}-${country}-composition.xlsx`);
})();
