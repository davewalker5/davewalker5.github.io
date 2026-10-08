---
layout: default
title: Chromatophore Simulator
description: Explorations of cephalopod-inspired chromatophore behaviour, dynamic skin patterning, and emergent visual displays through computational simulation
breadcrumb: Chromatophore Simulator
permalink: /wildlife/chromatophores/
---

# Chromatophore Simulator

This project explores how large numbers of small, individually controlled pigment organs can combine to produce a changing skin surface.

The work was inspired by cephalopod chromatophores: pigment-containing organs used by animals such as octopuses and cuttlefish to produce rapid changes in colour and pattern.

The central computational idea is deliberately simple:

> Complex and rapidly changing surface patterns can emerge from the coordinated behaviour of many comparatively simple individual elements

The project investigates that idea through a series of graphical simulations. A model skin surface is constructed from thousands of individual chromatophore-like cells, each of which can expand or contract independently while retaining its own position and pigment.

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/changing-mottle.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

By changing the target state of those cells over time, the same underlying population can produce a range of static and dynamic displays, including bands, spots, mottled patterns, travelling waves and expanding pulses.

Two complementary views make it possible to examine the simulation at different scales:

- **Chromatophore View** shows the individual pigment cells and their changing sizes
- **Skin View** blends their contributions into an approximation of the overall surface appearance

The ability to move between these views is an important part of the experiment. One reveals the individual mechanism; the other reveals the larger pattern that emerges from it.

As with the shell morphology work, the emphasis is not on producing a biologically exact reconstruction. The models are intentionally simplified and should be regarded as **cephalopod-inspired computational experiments** rather than simulations of cephalopod physiology.

The aim is instead to explore questions about emergence, coordination and pattern generation:

- How can many simple elements combine into a coherent visual display?
- How much control must be imposed globally?
- What happens when individual cells respond at different speeds or with delays?
- How do static target patterns differ from continually changing displays?
- How does the appearance of the individual components relate to the appearance of the whole surface?

The work sits somewhere between computational natural history, visual simulation and bio-inspired modelling, using code as a tool for investigating how local behaviour can give rise to larger-scale biological form and pattern.

## Interactive Chromatophore Explorer

The chromatophore models described here can also be explored interactively using the Chromatophore Explorer.

Rather than viewing a fixed collection of examples, the explorer allows you to switch between static and dynamic patterns, adjust cell response behaviour and move between the individual chromatophore and blended skin views while the simulation continues to run.

<p class="feature-invite-action">
<a href="/wildlife/chromatophores/explorer/">Launch the Chromatophore Explorer</a>
</p>

## Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.chromatophores.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Acknowledgements

This work was inspired by cephalopod colour change, chromatophore behaviour and the broader questions raised by distributed control and emergent pattern formation in biological systems.

The models, visualisations and implementations presented here were developed specifically for this project.

The simulations are exploratory computational models inspired by cephalopod biology and should not be interpreted as detailed physiological reconstructions.

{% include chromatophore-simulator-invitation.html %}
