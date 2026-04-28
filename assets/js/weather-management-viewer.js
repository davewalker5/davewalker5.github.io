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
    heading.textContent = "Weather Database Management Report";
    intro.textContent = "No report specified.";
    meta.textContent = "";
    link.style.display = "none";
    note.textContent = "";
    return;
  }

  const base = parts[0];
  const reportName = parts[1];

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const pngSrc = `${baseurl}/weather/reports/management/${base}.png`;
  const xlsxSrc = `${baseurl}/weather/reports/management/${base}.xlsx`;

  const titleCase = (value) =>
    value
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  const reportLabel = reportName ? reportName : titleCase(base);

  document.title = `Weather Database Management Report: ${reportLabel}`;
  heading.textContent = reportLabel;
  intro.textContent = "Weather station database management report.";
  meta.textContent = "Generated from personal weather station records.";

  img.src = pngSrc;
  img.alt = `Weather database management report ${reportLabel}`;

  link.style.display = "none";
  note.textContent = "";

  fetch(xlsxSrc, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        link.href = xlsxSrc;
        link.setAttribute("download", `${base}.xlsx`);
        link.style.display = "inline-block";
        note.textContent = "Downloads the related XLSX data file.";
      }
    })
    .catch(() => {
      // Leave download hidden if the file is absent or the check fails
    });
})();