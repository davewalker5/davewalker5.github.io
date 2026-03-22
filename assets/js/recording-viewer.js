(function () {
  const raw = window.location.hash || "";
  const hash = decodeURIComponent(raw);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  const heading = document.getElementById("heading");
  const intro = document.getElementById("intro");
  const meta = document.getElementById("meta");

  const video = document.getElementById("recording-video");
  const videoSource = document.getElementById("recording-source");

  const audio = document.getElementById("recording-audio");
  const audioSource = document.getElementById("audio-source");

  const link = document.getElementById("download-link");

  if (!heading || !intro || !meta || !link) return;

  if (parts.length < 1) {
    heading.textContent = "Recording";
    intro.textContent = "No recording specified.";
    meta.textContent = "";
    return;
  }

  const media = parts[0];
  const mediaType = (parts[1] || "video").toLowerCase();
  const series = parts[2] || "";
  const subject = parts[3] || "";
  const clip = parts[4] || "";

  const displayName = media.replace(/\.[^.]+$/, "");
  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";

  let mediaSrc = "";
  let downloadLabel = "⬇ Download video";

  document.title = `Recording: ${displayName}`;
  heading.textContent = `Recording: ${displayName}`;

  if (subject || clip || series) {
    const bits = [];
    if (subject) bits.push(subject);
    if (clip) bits.push(clip);
    if (series) bits.push(`Series: ${series}`);
    intro.textContent = bits.join(" — ");
  } else {
    intro.textContent = "This page displays a wildlife recording from the Field Notes archive.";
  }

  meta.textContent = "";

  if (mediaType === "audio") {
    mediaSrc = `${baseurl}/assets/recordings/audio/${media}`;

    if (video) {
      video.pause();
      video.style.display = "none";
    }

    if (audio && audioSource) {
      audioSource.src = mediaSrc;

      const ext = media.split(".").pop().toLowerCase();
      if (ext === "wav") {
        audioSource.type = "audio/wav";
      } else if (ext === "ogg") {
        audioSource.type = "audio/ogg";
      } else {
        audioSource.type = "audio/mpeg";
      }

      audio.style.display = "block";
      audio.load();
    }

    downloadLabel = "⬇ Download audio file";
  } else {
    mediaSrc = `${baseurl}/assets/recordings/movies/${media}`;

    if (audio) {
      audio.pause();
      audio.style.display = "none";
    }

    if (video && videoSource) {
      videoSource.src = mediaSrc;

      const ext = media.split(".").pop().toLowerCase();
      if (ext === "webm") {
        videoSource.type = "video/webm";
      } else if (ext === "ogg" || ext === "ogv") {
        videoSource.type = "video/ogg";
      } else {
        videoSource.type = "video/mp4";
      }

      video.style.display = "block";
      video.load();
    }

    downloadLabel = "⬇ Download movie file";
  }

  link.href = mediaSrc;
  link.setAttribute("download", media);
  link.textContent = downloadLabel;
})();