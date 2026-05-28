---
layout: default
title: Bat Behavioural Phase Analysis
description: Portable analysis of bat echolocation behaviour through pulse timing and behavioural phase inference
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Pocket Ecology
    url: /wildlife/pocket/index.html
  - name: Bat Call Timing Analysis
    url: /wildlife/pocket/winter.html
---

# Bat Behavioural Phase Analysis

The Bat Behavioural Phase Analysis tools are compact handheld utilities designed to infer broad echolocation behavioural states from pulse timing structure alone.

The system forms part of the wider Bat Call Analysis work developed for Field Notes Journal, but has also been adapted for constrained handheld systems including the TI-84 Plus CE-T Python calculator as part of the Pocket Ecology project.

Unlike the desktop spectrogram environment, the handheld implementation focuses on simplified behavioural interpretation derived entirely from timing measurements.

The analysis pipeline begins with the desktop Spectrogram Viewer software, which performs:

- Spectrogram analysis
- Pulse detection
- Acoustic measurement
- JSON export.

The exported pulse data is then processed by the TI-84 Bat Pulse Timing Analysis tools to generate:

- Pulse widths
- PRI (Pulse Repetition Interval)
- IPI (Inter-Pulse Interval)
- DPRI (change in PRI)

The resulting timing metrics are then passed into the behavioural phase-analysis system running directly on the calculator.

## Concept

Bat echolocation behaviour produces recognisable timing signatures.

As bats move through different behavioural states, pulse timing changes systematically:

- Search behaviour tends to produce slower, more stable intervals
- Approach behaviour produces accelerating pulse compression
- Feeding buzzes generate extremely dense pulse timing
- Exit phases relax back toward wider spacing

The handheld phase-analysis tools explore whether these behavioural structures can be recovered using lightweight numerical heuristics running on highly constrained portable hardware.

The resulting system attempts to assign broad behavioural labels across a pulse sequence using timing information alone.

## Behavioural Phases

The handheld implementation assigns pulses into several broad behavioural categories.

### SEARCH

Represents relatively stable navigation or exploratory flight behaviour.

This phase is typically associated with:

- Wider pulse spacing
- Slower repetition rates
- Relatively stable timing structure

### APPROACH

Represents increasing target focus and active pursuit behaviour.

This phase is characterised by:

- Progressive PRI compression
- Accelerating pulse timing
- Increasing sequence density

### BUZZ

Represents the dense terminal pulse burst associated with prey interception attempts.

Buzz regions are characterised by:

- Extremely compressed intervals
- Rapid repetition rates
- Highly concentrated pulse structure

### EXIT

Represents relaxation following the feeding buzz.

Where present within the analysed sequence, this phase typically shows:

- Interval widening
- Reduced pulse density
- Gradual return toward broader navigation timing

Not all sequences contain all phases. Some recordings may include only search behaviour, while others may begin mid-approach or terminate during the buzz itself.

## Timing-Based Behavioural Inference

One of the more interesting aspects of the project is that substantial behavioural structure often remains visible even after reducing the original recording to compact numerical timing measurements.

The handheld implementation therefore operates primarily on:

- PRI structure
- Interval compression
- Timing acceleration
- Pulse-density dynamics

Rather than reconstructing full acoustic behaviour, the system instead attempts to infer broad behavioural organisation from temporal structure alone.

This proved particularly useful because:

- Heterodyne recordings preserve timing structure well
- Timing metrics are computationally lightweight
- Behavioural transitions often remain visible even when spectral detail is limited

## Sequence Classification

In addition to assigning pulse-level behavioural labels, the handheld system also performs simplified sequence-level classification.

Using the detected timing structure, the tools attempt to identify whether a sequence contains:

- Stable search behaviour
- AFeeding buzz activity
- Multi-phase behavioural transitions

The resulting classifications are intentionally heuristic and exploratory rather than definitive species-identification systems.

## Example : Pipistrelle Heterodyne Sequence

The example below shows the behavioural phase-analysis system operating on a heterodyne recording of a pipistrelle sequence containing a feeding buzz.

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="{{ site.assets_url }}/images/batcalls/ti84-pulse-phase.png" alt="Pipistrelle Heterodyne Sequence Phase Analysis">
    <figcaption>Pipistrelle Heterodyne Sequence Phase Analysis</figcaption>
  </figure>
</div>

For this sequence, the calculator identifies several broad behavioural regions:

- An initial SEARCH phase
- Transition into APPROACH behaviour
- A concentrated BUZZ region
- A subsequent EXIT phase

The detected feeding buzz corresponds to a dense interval-compression structure visible within the timing metrics, where pulse repetition accelerates rapidly during prey-interception behaviour.

## Pocket Ecology

The handheld phase-analysis tools are intended as companions to the desktop Spectrogram Viewer environment rather than replacements for it.

The desktop system performs:

- Spectrogram rendering
- Pulse extraction
- Acoustic measurement
- JSON generation

The Pocket Ecology tools instead represent an experiment in portable ecological computation:

> How much behavioural interpretation can survive once the extracted timing structure is transferred onto extremely small portable hardware

{% include ti84-python-invitation.html %}
