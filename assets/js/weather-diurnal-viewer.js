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

  if (parts.length < 4) {
    heading.textContent = "Diurnal Pattern Report";
    intro.textContent = "No report specified.";
    meta.textContent = "";
    link.style.display = "none";
    note.textContent = "";
    return;
  }

  const base = parts[0];
  const sensor = parts[1];
  const measurement = parts[2];
  const metric = parts[3];

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const pngSrc = `${baseurl}/weather/reports/diurnal/${base}.png`;
  const xlsxSrc = `${baseurl}/weather/reports/diurnal/${base}.xlsx`;

  const titleCase = (value) =>
    value
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  const sensorLabel = sensor.toUpperCase();
  const measurementLabel = titleCase(measurement);
  const metricLabel = titleCase(metric);

  document.title = `Diurnal Pattern Report: ${sensorLabel} — ${measurementLabel} — ${metricLabel}`;
  heading.textContent = `${sensorLabel} — ${measurementLabel}`;
  intro.textContent = metricLabel;
  meta.textContent = "Diurnal weather pattern report generated from personal weather station records.";

  img.src = pngSrc;
  img.alt = `Diurnal pattern report ${sensorLabel} ${measurementLabel} ${metricLabel}`;

  // Default: hide download
  link.style.display = "none";
  note.textContent = "No downloadable dataset is provided for this report.";

  // Check whether XLSX exists
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
      // silently ignore if fetch fails
    });
})();