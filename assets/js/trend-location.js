// Expects hash: #/Country/Location
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#category-table tbody");

  if (parts.length < 2) {
    heading.textContent = "Sightings Trend — Categories";
    meta.textContent = "No location specified.";
    return;
  }

  const [country, location] = parts;
  heading.textContent = `Sightings Trend — ${location}`;
  meta.textContent = `${country}`;

  // Parse embedded JSON dataset (array of "c|l|k|s")
  const dataTag = document.getElementById("trend-data");
  let all = [];
  try { all = JSON.parse(dataTag.textContent || "[]"); } catch (e) {}

  // Unique categories for this country+location
  const set = new Set();
  all.forEach(str => {
    const [c, l, k] = str.split("|");
    if (c === country && l === location) set.add(k);
  });
  const cats = Array.from(set).sort();

  tbody.innerHTML = "";
  cats.forEach(k => {
    const tr = document.createElement("tr");

    const tdC = document.createElement("td");
    tdC.textContent = country;

    const tdL = document.createElement("td");
    tdL.textContent = location;

    const tdK = document.createElement("td");
    const a = document.createElement("a");
    a.textContent = k;
    a.href = `${baseurl}/wildlife/trend/species-list.html#/${encodeURIComponent(country)}/${encodeURIComponent(location)}/${encodeURIComponent(k)}`;
    tdK.appendChild(a);

    tr.appendChild(tdC);
    tr.appendChild(tdL);
    tr.appendChild(tdK);
    tbody.appendChild(tr);
  });

  if (cats.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = "No categories found for this location.";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();
