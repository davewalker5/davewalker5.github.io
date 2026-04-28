(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const img = document.getElementById("report-img");
  const link = document.getElementById("download-link");
  const note = document.getElementById("download-note");

  if (!heading || !intro || !meta || !img || !link || !note) return;

  if (parts.length < 2) {
    heading.textContent = "Aircraft Manufacturer Report";
    intro.textContent = "No report specified.";
    meta.textContent = "";
    link.style.display = "none";
    note.textContent = "";
    return;
  }

  const manufacturer = parts[0];
  const base = parts[1];
  const reportTitle = parts[2] || base.replace(/[-_]+/g, " ");

  const prettyManufacturer = manufacturer
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const pngSrc = `${baseurl}/aircraft/reports/manufacturer/${manufacturer}/${base}.png`;
  const xlsxSrc = `${baseurl}/aircraft/reports/manufacturer/${manufacturer}/${base}.xlsx`;

  document.title = `Aircraft Manufacturer Report: ${prettyManufacturer} — ${reportTitle}`;
  heading.textContent = `Aircraft Manufacturer Report: ${prettyManufacturer}`;
  intro.textContent = reportTitle;
  meta.textContent = "";

  img.src = pngSrc;
  img.alt = `Aircraft manufacturer report ${prettyManufacturer} ${reportTitle}`;

  link.href = xlsxSrc;
  link.setAttribute("download", `${base}.xlsx`);
  note.textContent = "Downloads the related XLSX data file where available.";
})();