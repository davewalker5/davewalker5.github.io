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

  if (parts.length < 1) {
    heading.textContent = "Aircraft Report";
    intro.textContent = "No report specified.";
    meta.textContent = "";
    link.style.display = "none";
    note.textContent = "";
    return;
  }

  const base = parts[0];
  const reportTitle = parts[1] || base.replace(/[-_]+/g, " ");

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const pngSrc = `${baseurl}/aircraft/reports/${base}.png`;
  const xlsxSrc = `${baseurl}/aircraft/reports/${base}.xlsx`;

  document.title = `Aircraft Report: ${reportTitle}`;
  heading.textContent = `Aircraft Report: ${reportTitle}`;
  intro.textContent = "This page displays an aircraft sightings report from the Field Notes Journal archive.";
  meta.textContent = "";

  img.src = pngSrc;
  img.alt = `Aircraft report ${reportTitle}`;

  link.href = xlsxSrc;
  link.setAttribute("download", `${base}.xlsx`);
  note.textContent = "Downloads the related XLSX data file where available.";
})();