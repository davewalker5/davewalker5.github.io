// Expects hash: #/Country
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#comp-table tbody");

  if (!heading || !meta || !tbody) return;

  if (parts.length < 1) {
    document.title = "Wildlife Category Composition by Country";
    heading.textContent = "Wildlife Category Composition";
    if (intro) {
      intro.textContent =
        "This page lists wildlife category composition reports by country, based on personal field records.";
    }
    meta.textContent = ``;
    return;
  }

  const [country] = parts;

  document.title = `Wildlife Category Composition in ${country}`;
  heading.textContent = `Wildlife Category Composition in ${country}`;

  if (intro) {
    intro.textContent =
      `This page lists wildlife category composition reports for locations in ${country}, based on personal field records. Select a category to view the chart and download the associated data.`;
  }

  meta.textContent = ``;

  // Parse dataset
  const dataTag = document.getElementById("comp-data");
  let all = [];
  try {
    all = JSON.parse(dataTag.textContent || "[]");
  } catch (e) {}

  const rows = all
    .map(s => {
      const [c, l, k] = s.split("|");
      return { country: c, location: l, category: k };
    })
    .filter(x => x.country === country)
    .sort((a, b) => (a.location + "|" + a.category).localeCompare(b.location + "|" + b.category));

  tbody.innerHTML = "";

  rows.forEach(x => {
    const tr = document.createElement("tr");

    const tdCountry = document.createElement("td");
    tdCountry.textContent = x.country;

    const tdLocation = document.createElement("td");
    tdLocation.textContent = x.location;

    const tdCategory = document.createElement("td");
    const a = document.createElement("a");
    a.textContent = x.category;
    a.href = `${baseurl}/wildlife/composition/view.html#/${encodeURIComponent(x.country)}/${encodeURIComponent(x.location)}/${encodeURIComponent(x.category)}`;
    tdCategory.appendChild(a);

    tr.appendChild(tdCountry);
    tr.appendChild(tdLocation);
    tr.appendChild(tdCategory);
    tbody.appendChild(tr);
  });

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = `No category composition reports found for ${country}.`;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();