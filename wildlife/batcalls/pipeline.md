---
layout: default
title: Audio Processing Pipeline
description: Overview of the processing stages used to prepare bat recordings for spectrogram inspection and pulse-level analysis
series: batcalls
chapter: 1
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Bat Call Analysis
    url: /wildlife/batcalls/index.html
  - name: Audio Processing Pipeline
    url: /wildlife/batcalls/pipeline.html
---

# Audio Processing Pipeline Overview

The Spectrogram Viewer implements a repeatable audio-processing pipeline designed to make recordings clearer and easier to interpret.

It follows the same general approach as a manual workflow in tools like Audacity, but applies it consistently and automatically.

Each input recording is processed in the following stages:

| #   | Summary                             | Description                                                                                                                                                                                                |
| --- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Detect noise regions                | The recording is scanned to find short sections that are likely to contain background noise only (quiet and low in signal-band energy) - the noise detection algorithm is documented in more detail, below |
| 2   | Build a noise profile               | These regions are combined into a single sample, representing the background noise in the recording                                                                                                        |
| 3   | Reduce noise (spectral subtraction) | The recording is transformed into the frequency domain, and the estimated noise profile is subtracted from each time slice. A small floor is retained to avoid introducing artefacts                       |
| 4   | High-pass filter                    | Low-frequency rumble and handling noise are removed, focusing the signal on the frequency range where bat calls occur (after time expansion)                                                               |
| 5   | Normalise                           | The result is scaled to a consistent peak level, making quiet recordings easier to inspect and listen to                                                                                                   |
| 6   | Output                              | The processed audio is written to disk for further inspection or visualisation                                                                                                                             |

The pipeline is intentionally simple and transparent:

- Repeatable — removes the need for manual selection of noise regions
- Interpretable — each step is easy to understand and adjust
- Non-destructive in spirit — preserves timing and structure of the original signal
- Practical — tuned for real-world field recordings rather than ideal conditions

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include spectrogram-viewer-invitation.html %}
