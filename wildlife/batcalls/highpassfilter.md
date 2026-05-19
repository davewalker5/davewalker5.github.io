---
layout: default
title: High-Pass Filtering
description: Suppressing low-frequency rumble and handling noise to emphasise the frequency range occupied by bat calls
series: batcalls
chapter: 4
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Bat Call Analysis
    url: /wildlife/batcalls/index.html
  - name: High-Pass Filtering
    url: /wildlife/batcalls/highpassfilter.html
---

# High-Pass Filtering

Before pulse analysis is performed, the recording passes through a high-pass filter.

The purpose of this stage is to suppress low-frequency noise that is unlikely to contain bat calls, allowing the higher-frequency echolocation structure to stand out more clearly. Its role is not to isolate bat calls completely, but to reduce low-frequency clutter before the later analysis stages.

Typical sources of low-frequency noise include:

- Handling noise from the detector or recorder  
- Wind rumble  
- Distant traffic or environmental vibration  
- General low-frequency background energy  

After time expansion, bat calls usually occupy a much higher frequency range than these sources, making high-pass filtering an effective first step.

## Butterworth Filtering

The pipeline uses a Butterworth high-pass filter.

Butterworth filters are designed to produce a smooth frequency response without strong ripples or abrupt resonances. This makes them well suited to exploratory signal analysis, where preserving the overall shape of the waveform is more important than aggressive filtering.

Frequencies below the cutoff are progressively attenuated, while frequencies above the cutoff are retained.

The steepness of this transition is controlled by the filter order.

## Zero-Phase Filtering

To avoid shifting or distorting pulse timing, the filter is applied using a zero-phase forward-and-reverse pass.

This works by filtering the recording twice:

1. Once forwards through the waveform  
2. Once backwards through the waveform  

The second pass cancels the phase shifts introduced by the first.

This is important because much of the later analysis depends on accurate pulse timing and spacing. Introducing timing offsets at this stage could alter PRI measurements and behavioural structure.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include spectrogram-viewer-invitation.html %}
