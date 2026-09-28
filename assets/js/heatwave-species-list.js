// Optional category filter: #/Country/Location/Category; otherwise show all reports.
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#species-table tbody");

  if (!tbody) return;

  const filtered = parts.length >= 3;
  const [country, location, category] = parts;

  // Article pages can embed the table without the standalone page heading.
  if (heading) {
    if (!filtered) {
      document.title = "Wildlife Sightings Heatwave Comparisons by Species";
      heading.textContent = "Wildlife Sightings Heatwave Comparisons by Species";
      if (intro) {
        intro.textContent =
          "This page lists species heatwave comparison reports by location and category, based on personal field records.";
      }
    } else {
      document.title = `${category} Species Heatwave Comparisons at ${location}, ${country}`;
      heading.textContent = `${category} Species Heatwave Comparisons`;
      if (intro) {
        intro.textContent =
          `This page lists species heatwave comparison reports for ${category} at ${location}, ${country}, based on personal field records. Select a species to view the chart and download the associated data.`;
      }
    }
  }
  if (meta) meta.textContent = "";

  const dataTag = document.getElementById("heatwave-data");
  let all = [];
  try { all = JSON.parse(dataTag.textContent || "[]"); } catch (e) {}

  const rows = all
    .map(str => {
      const [c, l, k, s] = str.split("|");
      return { country: c, location: l, category: k, species: s };
    })
    .filter(x => !filtered || (x.country === country && x.location === location && x.category === category))
    .sort((a, b) => a.species.localeCompare(b.species));

  tbody.innerHTML = "";

  rows.forEach(x => {
    const tr = document.createElement("tr");

    const tdSpecies = document.createElement("td");
    tdSpecies.textContent = x.species;

    const tdCategory = document.createElement("td");
    tdCategory.textContent = x.category;

    const tdLink = document.createElement("td");
    const a = document.createElement("a");
    a.textContent = "View chart";
    a.href = `${baseurl}/wildlife/heatwaves/species.html#/${encodeURIComponent(x.country)}/${encodeURIComponent(x.location)}/${encodeURIComponent(x.category)}/${encodeURIComponent(x.species)}`;

    tdLink.appendChild(a);
    tr.appendChild(tdSpecies);
    tr.appendChild(tdCategory);
    tr.appendChild(tdLink);
    tbody.appendChild(tr);
  });

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = filtered
      ? `No species heatwave comparison reports found for ${category} at ${location}, ${country}.`
      : "No species heatwave comparison reports found.";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();
