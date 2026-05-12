(function () {
  function show(el, displayType = "block") {
    if (!el) return;
    el.hidden = false;
    el.style.display = displayType;
  }

  function hide(el) {
    if (!el) return;
    el.hidden = true;
    el.style.display = "none";
  }

  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");
  const img = document.getElementById("plate-img");
  const video = document.getElementById("plate-video");
  const link = document.getElementById("download-link");
  const downloadNote = document.getElementById("download-note");

  if (!heading || !intro || !meta || !img || !video || !link) {
    return;
  }

  if (parts.length < 1) {
    document.title = "Photomicrograph";
    heading.textContent = "Photomicrograph";
    intro.textContent = "No plate specified.";
    meta.textContent = "";
    hide(img);
    hide(video);
    link.style.display = "none";
    if (downloadNote) {
      downloadNote.style.display = "none";
    }
    return;
  }

  const plate = parts[0];
  const series = parts[1] || "";
  const subject = parts[2] || "";
  const specimen = parts[3] || "";

  const baseurl =
    typeof window.SITE_BASEURL === "string" ? window.SITE_BASEURL : "";

  const lowerPlate = plate.toLowerCase();
  const isVideo = lowerPlate.endsWith(".mp4");

  const stem = plate.replace(/\.[^.]+$/, "");

  const previewSrc = isVideo
    ? `${baseurl}/assets/plates/lightbox/${stem}.png`
    : `${baseurl}/assets/plates/preview/${plate}`;

  const fullSrc = `${baseurl}/assets/plates/full/${plate}`;

  document.title = `Photomicrograph: ${plate}`;
  heading.textContent = `Photomicrograph: ${plate}`;

  if (subject || specimen || series) {
    const bits = [];
    if (subject) bits.push(subject);
    if (specimen) bits.push(specimen);
    if (series) bits.push(`Series: ${series}`);
    intro.textContent = bits.join(" — ");
  } else {
    intro.textContent =
      "This page displays a photomicrographic plate from the Field Notes Journal archive.";
  }

  meta.textContent = "";

  if (isVideo) {
    hide(img);
    img.removeAttribute("src");
    img.alt = "";

    show(video, "block");
    video.src = fullSrc;
    video.setAttribute("poster", previewSrc);
    video.setAttribute("aria-label", `Photomicrographic movie ${plate}`);

    link.href = fullSrc;
    link.setAttribute("download", plate);
    link.textContent = "⬇ Download movie";
    link.style.display = "";

    if (downloadNote) {
      downloadNote.textContent =
        "Downloads the original MP4 file where the browser allows it.";
      downloadNote.style.display = "";
    }
  } else {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    hide(video);

    show(img, "block");
    img.src = previewSrc;
    img.alt = `Photomicrographic plate ${plate}`;

    link.href = fullSrc;
    link.setAttribute("download", plate);
    link.textContent = "⬇ Download plate image";
    link.style.display = "";

    if (downloadNote) {
      downloadNote.textContent =
        "Downloads the original image file where the browser allows it.";
      downloadNote.style.display = "";
    }
  }
})();