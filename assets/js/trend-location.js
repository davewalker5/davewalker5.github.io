(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#species-table tbody");

  if (parts.length < 2) {
    heading.textContent = "Sightings Trend";
    meta.textContent = "No location specified.";
    return;
  }

  const [country, location] = parts;
  heading.textContent = `Sightings Trend — ${location}`;
  meta.textContent = `${country}`;

  // Parse embedded JSON dataset (array of strings or objects)
  const dataTag = document.getElementById("trend-data");
  let all = [];
  try {
    all = JSON.parse(dataTag.textContent || "[]");
  } catch (e) {
    console.error("Failed to parse trend data JSON", e);
  }

  // Normalize to objects
  const norm = all.map(item => {
    if (typeof item === "string") {
      const [c, l, k, s] = item.split("|");
      return { country: c, location: l, category: k, species: s };
    }
    return item;
  });

  const rows = norm.filter(x => x.country === country && x.location === location);

  // Build table rows: Species | Category | Show chart
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
    td.textContent = "No species found for this location.";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();
