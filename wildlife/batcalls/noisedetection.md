---
layout: default
title: Noise Detection
description: Identifying likely background-noise regions automatically using amplitude and spectral-energy characteristics
series: batcalls
chapter: 2
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Bat Call Analysis
    url: /wildlife/batcalls/index.html
  - name: Noise Detection
    url: /wildlife/batcalls/noisedetection.html
---

# Noise Detection

To reduce background noise automatically, the pipeline includes a simple noise-region detection step. This replaces the manual process of selecting a “quiet” section of audio (as you might do in Audacity).

## Region Detection

The recording is divided into short, overlapping windows (typically 50 ms). For each window, two measurements are taken:

- Loudness (RMS amplitude) &rarr; Quieter windows are more likely to contain background noise only.
- Band energy ratio &rarr; The fraction of spectral energy within the expected signal band (for bat recordings, typically ~3.5–6.5 kHz after time expansion).

The band energy ratio is then used to identify the type of signal in the window:

- Low ratio &rarr; broadband noise / hiss
- High ratio &rarr; structured signal (e.g. bat calls)

A window is considered likely noise if it is both:

- Relatively quiet compared to the rest of the recording, and
- Relatively low in energy within the target band

Thresholds are determined using percentiles, so the detection adapts to each recording rather than relying on fixed values.

### From Windows to Regions

Neighbouring “noise” windows are merged into longer regions, and only regions above a minimum duration are kept. These regions are then used as the noise profile for subsequent noise reduction. An example waveform, with noise regions highlighted, is shown below:

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="{{ site.assets_url }}/images/batcalls/BD-A-99-001-Noise-Detection.png" alt="Noise Region Detection">
    <figcaption>Noise Region Detection</figcaption>
  </figure>
</div>

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include spectrogram-viewer-invitation.html %}
