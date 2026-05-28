---
layout: default
title: Spectral Noise Reduction
description: Reducing steady broadband noise through spectral subtraction while preserving pulse structure and timing
series: batcalls
chapter: 3
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Bat Call Analysis
    url: /wildlife/batcalls/index.html
  - name: Spectral Noise Reduction
    url: /wildlife/batcalls/noisereduction.html
---

# Spectral Noise Reduction

Once noise-only regions have been identified, they can be used to reduce steady background noise within the recording.

The reduction method used here is a simple form of spectral subtraction. Rather than attempting to “clean” the recording aggressively, the aim is to suppress persistent broadband noise while preserving the underlying structure of the bat calls.

This approach works particularly well for steady hiss and low-level environmental noise.

## Frequency-Domain Representation

The waveform is first transformed into the frequency domain using a Short-Time Fourier Transform (STFT).

Rather than treating the recording as a single continuous waveform, the STFT divides it into many short, overlapping slices in time. Each slice is then represented in terms of its frequency content.

This produces a time-frequency representation — effectively the same information used to generate a spectrogram.

For each slice, the recording can now be thought of as:

- A set of frequency magnitudes
- A corresponding phase component used to reconstruct the waveform later

## Estimating the Noise Profile

The regions identified during the noise detection stage are combined into a single “noise-only” sample.

An STFT is then applied to this sample, producing an estimate of the background noise spectrum.

For each frequency bin, the average magnitude across the noise sample is calculated, producing a characteristic noise profile for the recording.

This profile represents the frequencies that are persistently present even when no bat calls are occurring.

## Spectral Subtraction

The estimated noise profile is then subtracted from every time slice in the recording.

Conceptually:

- Frequencies matching the persistent noise profile are reduced
- Frequencies stronger than the background profile are retained
- Structured signals, such as bat calls, remain comparatively prominent

An adjustable reduction strength controls how strongly the noise profile is removed.

## Preventing Artefacts

Simple subtraction can create unnatural gaps or “holes” in the spectrum, particularly in quieter parts of the recording.

To avoid this, the pipeline applies a small spectral floor.

Rather than allowing magnitudes to fall all the way to zero, a minimum fraction of the original signal is retained in each frequency bin. This helps preserve continuity in the recording and reduces the risk of introducing artificial distortion or musical “warbling” artefacts.

The aim is not complete silence between calls, but a gentler suppression of persistent background noise.

## Reconstruction

Once the adjusted magnitudes have been calculated, they are recombined with the original phase information.

The recording is then transformed back into the time domain using the inverse STFT, producing a noise-reduced waveform.

The reduction process is deliberately conservative. The intention is not to remove all background sound, but to improve the visibility and analysability of pulse structure while preserving the overall character of the original recording.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include spectrogram-viewer-invitation.html %}
