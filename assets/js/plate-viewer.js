(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const img = document.getElementById("plate-img");
  const link = document.getElementById("download-link");

  if (!heading || !intro || !meta || !img || !link) return;

  if (parts.length < 1) {
    heading.textContent = "Photomicrograph";
    intro.textContent = "No plate specified.";
    meta.textContent = "";
    return;
  }

  const plate = parts[0];
  const series = parts[1] || "";
  const subject = parts[2] || "";
  const specimen = parts[3] || "";

  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";
  const imgSrc = `${baseurl}/assets/plates/preview/${plate}`;
  const downloadSrc = `${baseurl}/assets/plates/full/${plate}`;

  document.title = `Photomicrograph: ${plate}`;
  heading.textContent = `Photomicrograph: ${plate}`;

  if (subject || specimen || series) {
    const bits = [];
    if (subject) bits.push(subject);
    if (specimen) bits.push(specimen);
    if (series) bits.push(`Series: ${series}`);
    intro.textContent = bits.join(" — ");
  } else {
    intro.textContent = "This page displays a photomicrographic plate from the Field Notes archive.";
  }

  meta.textContent = "";
  img.src = imgSrc;
  img.alt = `Photomicrographic plate ${plate}`;

  link.href = downloadSrc;
  link.setAttribute("download", plate);
})();