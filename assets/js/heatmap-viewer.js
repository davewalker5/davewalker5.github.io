// Expects hash: #/Country/Year/Location/Category
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
    document.title = "Annual Wildlife Heatmap Chart";
    heading.textContent = "Annual Wildlife Heatmap";
    if (intro) {
      intro.textContent = "This chart shows an annual wildlife heatmap based on personal field records.";
    }
    meta.textContent = "";
    if (caption) {
      caption.textContent = "Annual heatmap generated from personal field records.";
    }
    return;
  }

  const [country, year, location, category] = parts;

  document.title = `${category} Heatmap at ${location}, ${country} (${year})`;
  heading.textContent = `${category} Heatmap`;

  if (intro) {
    intro.textContent =
      `This chart shows the annual distribution of recorded ${category} observations at ${location}, ${country}, for ${year}, based on personal wildlife field records.`;
  }

  meta.textContent = ``;

  const basePath = `${baseurl}/wildlife/reports/${country}/heatmap/${year}/${location}/${category}`;
  img.src = `${basePath}/heatmap.png`;
  img.alt = `Annual heatmap for ${category} at ${location}, ${country} in ${year}`;

  if (caption) {
    caption.textContent = `Annual heatmap for ${category} at ${location}, ${country}, ${year}.`;
  }

  link.href = `${basePath}/heatmap.xlsx`;
  link.setAttribute("download", `${country}-${year}-${location}-${category}-heatmap.xlsx`);
})();