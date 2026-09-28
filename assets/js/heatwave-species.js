---
---

(function () {
  const baseurl = '{{ site.assets_url }}'
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
    document.title = "Wildlife Species Heatwave Comparison Chart";
    heading.textContent = "Wildlife Species Heatwave Comparison";
    if (intro) {
      intro.textContent = "This chart shows wildlife sightings heatwave comparisons based on personal field records.";
    }
    meta.textContent = "";
    if (caption) {
      caption.textContent = "Species heatwave comparison chart generated from personal field records.";
    }
    return;
  }

  const [country, location, category, species] = parts;

  document.title = `${species} Sightings Heatwave Comparison at ${location}, ${country}`;
  heading.textContent = `${species} Sightings Heatwave Comparison`;

  if (intro) {
    intro.textContent =
      `This chart shows recorded sightings heatwave comparisons for ${species} in the ${category} category at ${location}, ${country}, based on personal wildlife field records.`;
  }

  meta.textContent = ``;

  const dataTag = document.getElementById("heatwave-data");
  let reports = [];
  try { reports = JSON.parse(dataTag.textContent || "[]"); } catch (e) {}
  const report = reports.find(x =>
    x.country === country && x.location === location &&
    x.category === category && x.species === species
  );

  if (!report) {
    meta.textContent = `No heatwave comparison report found for ${species} at ${location}, ${country}.`;
    img.hidden = true;
    link.hidden = true;
    if (caption) caption.textContent = "";
    return;
  }

  img.src = `${baseurl}${report.png_path}`;
  img.alt = `Heatwave Comparison chart for ${species} in ${category} at ${location}, ${country}`;

  if (caption) {
    caption.textContent = `Sightings heatwave comparison for ${species} at ${location}, ${country}.`;
  }

  link.href = `${baseurl}${report.xlsx_path}`;
  link.setAttribute("download", `${country}-${location}-${species}-heatwave.xlsx`);
})();
