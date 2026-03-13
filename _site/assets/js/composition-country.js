// Expects hash: #/Country
(function () {
  const baseurl = (typeof window.SITE_BASEURL === 'string') ? window.SITE_BASEURL : '';
  const raw = window.location.hash || "";
  const parts = decodeURIComponent(raw.replace(/^#\/?/, "")).split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const meta = document.getElementById("meta");
  const tbody = document.querySelector("#comp-table tbody");

  if (parts.length < 1) {
    heading.textContent = "Category Composition";
    meta.textContent = "No country specified.";
    return;
  }

  const [country] = parts;
  heading.textContent = `Category Composition — ${country}`;
  meta.textContent = "Choose a location and category.";

  // Parse dataset
  const dataTag = document.getElementById("comp-data");
  let all = [];
  try { all = JSON.parse(dataTag.textContent || "[]"); } catch (e) {}

  const rows = all
    .map(s => {
      const [c,l,k] = s.split("|");
      return { country: c, location: l, category: k };
    })
    .filter(x => x.country === country)
    .sort((a,b) => (a.location + "|" + a.category).localeCompare(b.location + "|" + b.category));

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
    td.textContent = "No composition reports found for this country.";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
})();
