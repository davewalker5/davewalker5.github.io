(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");
  const crumbLoc = document.getElementById("crumb-location");

  if (parts.length < 4) {
    heading.textContent = "Species Trend";
    meta.textContent = "No species specified.";
    return;
  }

  const [country, location, category, species] = parts;

  document.title = `Trend: ${species} (${category}) @ ${location}, ${country}`;
  heading.textContent = species;
  meta.textContent = `${category} — ${location}, ${country}`;

  // Breadcrumb back to location page
  // crumbLoc.textContent = `${location}, ${country}`;
  // crumbLoc.href = `${baseurl}/wildlife/trend/location.html#/${encodeURIComponent(country)}/${encodeURIComponent(location)}`;

  const basePath = `${baseurl}/wildlife/reports/${country}/trend/${location}/${category}`;
  img.src = `${basePath}/${species}.png`;
  img.alt = `Trend chart for ${species} (${category}) at ${location}, ${country}`;

  link.href = `${basePath}/${species}.xlsx`;
  link.setAttribute("download", `${species}-${location}-${country}-trend.xlsx`);
})();
