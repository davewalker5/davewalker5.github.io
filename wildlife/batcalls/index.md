---
layout: default
title: Bat Call Analysis
description: Explorations of bat echolocation recordings through spectrogram analysis, pulse timing, and behavioural structure
breadcrumb: Bat Call Analysis
---

# Bat Call Analysis

The process presented in this section explores the structure of bat echolocation recordings through spectrogram inspection and pulse-level measurement.

Recordings are collected using handheld bat detectors in a range of local environments, including gardens, water margins, woodland edges, and open spaces. Both time-expansion and heterodyne recordings are included.

Rather than attempting automatic species identification alone, the work focuses on the internal structure of calls and passes — the timing, spacing, and organisation of pulses, and the behavioural patterns these may reveal.

A bat pass is not simply a sequence of sounds. Within a recording, pulses accelerate and decelerate, feeding buzzes emerge, and distinct phases of behaviour appear. Search, approach, buzz, and exit phases can often be recognised from timing structure alone.

The Spectrogram Viewer and analysis tools developed for this work provide a way of examining these recordings in detail.


Recordings are processed through the audio processing and analysis pipeline, producing structured outputs including pulse measurements, behavioural segmentation, plots, and exported JSON data suitable for further analysis in notebooks and downstream workflows.

The workflow is illustrated below:

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/batcalls/call-analysis-workflow.png" alt="Bat Call Analysis Workflow">
    <figcaption>Bat Call Analysis Workflow</figcaption>
  </figure>
</div>

The pipeline produces pulse-level measurements describing features that allow recordings to be examined not only as audio, but as structured behavioural traces.

Particular attention is given to temporal organisation within recordings. An important theme emerging from the work is that pulse timing distributions themselves contain ecological and behavioural structure, even in recordings where frequency information is limited.

# Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.batcalls.chapters %}
            <tr>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

{% include spectrogram-viewer-invitation.html %}
