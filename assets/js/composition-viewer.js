// Expects hash: #/Country/Location/Category
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("xlsx-link");
  const crumbCountry = document.getElementById("crumb-country");
  const caption = document.querySelector(".report-caption");

  if (!heading || !meta || !img || !link) return;

  if (parts.length < 3) {
    document.title = "Wildlife Category Composition Chart";
    heading.textContent = "Wildlife Category Composition";
    if (intro) {
      intro.textContent = "This chart shows wildlife category composition based on personal field records.";
    }
    meta.textContent = "No report specified.";
    if (crumbCountry) crumbCountry.style.display = "none";
    if (caption) {
      caption.textContent = "Category composition chart generated from personal field records.";
    }
    return;
  }

  const [country, location, category] = parts;

  document.title = `${category} Composition at ${location}, ${country}`;
  heading.textContent = `${category} Composition at ${location}, ${country}`;
  intro.textContent = `This chart shows recorded composition of ${category} at ${location}, ${country}, based on personal wildlife field records.`;
  meta.textContent = ``;

  if (crumbCountry) {
    crumbCountry.style.display = "";
    crumbCountry.textContent = country;
    crumbCountry.href = `${baseurl}/wildlife/composition/country.html#/${encodeURIComponent(country)}`;
  }

  const basePath = `${baseurl}/wildlife/reports/${country}/composition/${location}/${category}`;
  img.src = `${basePath}/composition.png`;
  img.alt = `Composition chart for ${category} at ${location}, ${country}`;

  if (caption) {
    caption.textContent = `Composition chart for ${category} at ${location}, ${country}.`;
  }

  link.href = `${basePath}/composition.xlsx`;
  link.setAttribute("download", `${country}-${location}-${category}-composition.xlsx`);
})();