(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");
  const caption = document.querySelector(".report-caption");

  if (!heading || !meta || !img || !link) return;

  if (parts.length < 4) {
    document.title = "Wildlife Species Trend Chart";
    heading.textContent = "Wildlife Species Trend";
    if (intro) {
      intro.textContent = "This chart shows wildlife sightings trends based on personal field records.";
    }
    meta.textContent = "";
    if (caption) {
      caption.textContent = "Species trend chart generated from personal field records.";
    }
    return;
  }

  const [country, location, category, species] = parts;

  document.title = `${species} Sightings Trend at ${location}, ${country}`;
  heading.textContent = `${species} Sightings Trend`;

  if (intro) {
    intro.textContent =
      `This chart shows recorded sightings trends for ${species} in the ${category} category at ${location}, ${country}, based on personal wildlife field records.`;
  }

  meta.textContent = ``;

  const basePath = `${baseurl}/wildlife/reports/${country}/trend/${location}/${category}`;
  img.src = `${basePath}/${species}.png`;
  img.alt = `Trend chart for ${species} in ${category} at ${location}, ${country}`;

  if (caption) {
    caption.textContent = `Sightings trend for ${species} at ${location}, ${country}.`;
  }

  link.href = `${basePath}/${species}.xlsx`;
  link.setAttribute("download", `${country}-${location}-${species}-trend.xlsx`);
})();