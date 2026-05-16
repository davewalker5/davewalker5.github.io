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
  const audioStatus = document.getElementById("audio-status");

  const link = document.getElementById("download-link");

  if (!heading || !intro || !meta || !link) return;

  function setAudioStatus(message, show = true) {
    if (!audioStatus) return;
    audioStatus.textContent = message;
    audioStatus.style.display = show ? "block" : "none";
  }

  function clearAudioEventHandlers() {
    if (!audio) return;
    audio.onloadstart = null;
    audio.onloadedmetadata = null;
    audio.oncanplay = null;
    audio.oncanplaythrough = null;
    audio.onwaiting = null;
    audio.onplaying = null;
    audio.onerror = null;
  }

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
  const ext = (media.split(".").pop() || "").toLowerCase();
  const baseurl = (typeof window.SITE_BASEURL === "string") ? window.SITE_BASEURL : "";

  let mediaSrc = "";
  let downloadLabel = "⬇ Download recording";

  document.title = `Recording: ${displayName}`;
  heading.textContent = `Recording: ${displayName}`;

  if (subject || clip || series) {
    const bits = [];
    if (subject) bits.push(subject);
    if (clip) bits.push(clip);
    if (series) bits.push(`Series: ${series}`);
    intro.textContent = bits.join(" — ");
  } else {
    intro.textContent = "This page displays a wildlife recording from the Field Notes Journal archive.";
  }

  meta.textContent = "";

  if (mediaType === "audio") {
    mediaSrc = `${baseurl}/assets/recordings/audio/${media}`;

    if (video) {
      video.pause();
      video.style.display = "none";
    }

    if (audio && audioSource) {
      clearAudioEventHandlers();

      audio.pause();
      audio.removeAttribute("src");
      audioSource.src = mediaSrc;

      switch (ext) {
        case "wav":
          audioSource.type = "audio/wav";
          break;
        case "ogg":
          audioSource.type = "audio/ogg";
          break;
        case "mp3":
        default:
          audioSource.type = "audio/mpeg";
          break;
      }

      audio.style.display = "block";
      audio.preload = "auto";
      audio.controls = false;
      setAudioStatus("Preparing audio…");

      audio.onloadstart = function () {
        setAudioStatus("Loading audio…");
      };

      audio.onloadedmetadata = function () {
        setAudioStatus("Audio loaded. Buffering for playback…");
      };

      audio.oncanplay = function () {
        audio.controls = true;
        setAudioStatus("Ready to play.");
      };

      audio.oncanplaythrough = function () {
        audio.controls = true;
        setAudioStatus("Ready to play.");
      };

      audio.onwaiting = function () {
        setAudioStatus("Buffering…");
      };

      audio.onplaying = function () {
        setAudioStatus("");
        if (audioStatus) audioStatus.style.display = "none";
      };

      audio.onerror = function () {
        audio.controls = false;
        setAudioStatus("This audio file could not be loaded.");
      };

      audio.load();
    }

    downloadLabel = "⬇ Download audio file";
  } else {
    mediaSrc = `${baseurl}/assets/recordings/movies/${media}`;

    if (audio) {
      clearAudioEventHandlers();
      audio.pause();
      audio.style.display = "none";
      audio.controls = true;
      setAudioStatus("", false);
    }

    if (video && videoSource) {
      videoSource.src = mediaSrc;

      switch (ext) {
        case "webm":
          videoSource.type = "video/webm";
          break;
        case "ogg":
        case "ogv":
          videoSource.type = "video/ogg";
          break;
        case "mp4":
        default:
          videoSource.type = "video/mp4";
          break;
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