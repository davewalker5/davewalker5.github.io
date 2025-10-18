// Expects hash: #/Country/Location/Category
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");
  const crumbCountry = document.getElementById("crumb-country");

  if (parts.length < 3) {
    heading.textContent = "Composition";
    meta.textContent = "No report specified.";
    if (crumbCountry) crumbCountry.style.display = "none";
    return;
  }

  const [country, location, category] = parts;

  document.title = `Composition: ${category} @ ${location}, ${country}`;
  heading.textContent = `Composition: ${category}`;
  meta.textContent = `${location}, ${country}`;

  // Breadcrumb back to the country table
  if (crumbCountry) {
    crumbCountry.textContent = country;
    crumbCountry.href = `${baseurl}/wildlife/composition/country.html#/${encodeURIComponent(country)}`;
  }

  const basePath = `${baseurl}/wildlife/reports/${country}/composition/${location}/${category}`;
  img.src = `${basePath}/composition.png`;
  img.alt = `Composition chart for ${category} at ${location}, ${country}`;

  link.href = `${basePath}/composition.xlsx`;
  link.setAttribute("download", `${category}-${location}-${country}-composition.xlsx`);
})();
