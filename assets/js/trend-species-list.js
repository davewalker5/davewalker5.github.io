// Expects hash: #/Country/Location/Category
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#species-table tbody");

  if (parts.length < 3) {
    heading.textContent = "Species Trend";
    meta.textContent = "No category specified.";
    return;
  }

  const [country, location, category] = parts;
  heading.textContent = `Species Trend — ${location}`;
  meta.textContent = `${country} — ${category}`;

  // Parse dataset
  const dataTag = document.getElementById("trend-data");
  let all = [];
  try { all = JSON.parse(dataTag.textContent || "[]"); } catch (e) {}

  const rows = all
    .map(str => {
      const [c,l,k,s] = str.split("|");
      return { country: c, location: l, category: k, species: s };
    })
    .filter(x => x.country === country && x.location === location && x.category === category)
    .sort((a,b) => a.species.localeCompare(b.species));

  tbody.innerHTML = "";
  rows.forEach(x => {
    const tr = document.createElement("tr");

    const tdSpecies = document.createElement("td");
    tdSpecies.textContent = x.species;

    const tdCategory = document.createElement("td");
    tdCategory.textContent = x.category;

    const tdLink = document.createElement("td");
    const a = document.createElement("a");
    a.textContent = "Show chart";
    a.href = `${baseurl}/wildlife/trend/species.html#/${encodeURIComponent(x.country)}/${encodeURIComponent(x.location)}/${encodeURIComponent(x.category)}/${encodeURIComponent(x.species)}`;

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
    td.textContent = "No species found for this category at this location.";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();
