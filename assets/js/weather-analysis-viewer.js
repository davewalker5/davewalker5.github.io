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
    heading.textContent = "Weather Analysis Report";
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
  const pngSrc = `${baseurl}/weather/reports/analysis/${base}.png`;
  const xlsxSrc = `${baseurl}/weather/reports/analysis/${base}.xlsx`;

  const titleCase = (value) =>
    value
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  const sensorLabel = sensor.toUpperCase();
  const measurementLabel = titleCase(measurement);
  const metricLabel = titleCase(metric);

  document.title = `Weather Analysis: ${sensorLabel} — ${measurementLabel} — ${metricLabel}`;
  heading.textContent = `${sensorLabel} — ${measurementLabel}`;
  intro.textContent = metricLabel;
  meta.textContent = "Weather analysis report generated from personal weather station records.";

  img.src = pngSrc;
  img.alt = `Weather analysis report ${sensorLabel} ${measurementLabel} ${metricLabel}`;

  link.href = xlsxSrc;
  link.setAttribute("download", `${base}.xlsx`);
  note.textContent = "Downloads the related XLSX data file where available.";
})();