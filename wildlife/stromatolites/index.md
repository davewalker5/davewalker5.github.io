---
layout: default
title: Stromatolite Growth Modelling
description: An exploration of how microbial growth, sedimentation and environmental change combine to produce the layered structures of stromatolites through computational modelling.
breadcrumb: Stromatolite Growth Modelling
permalink: /wildlife/stromatolites/
assets: "/images/modelling/stromatolites/"
column_development:
   name: "1d-column-snapshots.png"
   alt: "1-D Model Column Development"
   caption: "1-D Model Column Development"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Stromatolite Growth Modelling

{% include fullwidth-image.html assets=page.assets img=page.column_development %}

Rather than attempting to simulate every microscopic process occurring within a microbial mat, the project focuses on the larger ecological interactions that govern stromatolite development: microbial growth, sediment deposition, burial, photosynthesis and changing environmental conditions.

The aim is to investigate how these interacting processes can give rise to the layered structures preserved in the fossil record.

## Why Stromatolites?

Stromatolites are among the oldest large-scale biological structures on Earth, with a fossil record extending back more than three billion years.

They provide an extraordinary record of the interaction between life and environment during the early history of our planet.

Although their internal structure can appear remarkably complex, many of the processes responsible for their formation are conceptually simple. This makes stromatolites an ideal subject for computational exploration.

The question underlying this project is straightforward:

Can realistic stromatolite growth emerge from a relatively small set of biologically meaningful mathematical rules?

## Project Philosophy

This project is intended as an exploration rather than a definitive scientific model.

Where possible, the implementation favours:

- Biologically interpretable equations
- Modular environmental processes
- Transparent mathematical assumptions
- Computational simplicity
- Incremental model development

Many visible features are deliberately allowed to emerge from the interaction of simple ecological processes rather than being explicitly programmed.

As the project evolves, new mechanisms are added only where they improve the biological realism or explanatory power of the model.

## Current Model

The current implementation combines continuous biological growth with discrete ecological events to simulate the development of a layered stromatolite through time.

Rather than representing the stromatolite as a single continuously growing surface, the model treats the actively growing microbial mat as the uppermost living layer. As growth proceeds, sediment deposition and burial create new laminae while older layers become biologically inactive but remain part of the accumulating structure.

### Core biological model

The biological processes are described by a set of coupled growth equations representing interactions between:

* Microbial growth
* Photosynthetic activity
* Sediment accumulation
* Burial

These continuous processes are integrated numerically through time using an adaptive ODE solver.

### Layered structure

The current implementation extends the core equations with an event-driven layered model.

As the simulation progresses:

* The uppermost microbial mat grows continuously.
* Sediment is deposited onto the living surface.
* Burial events terminate growth of the active layer.
* A new microbial mat is established on the newly buried surface.
* Older buried layers remain preserved within the developing stromatolite.

This combination of continuous growth and discrete ecological events allows the characteristic laminated structure of stromatolites to emerge naturally from repeated cycles of growth, burial and recolonisation.

### ## Environmental forcing

Environmental conditions are represented as independent forcing functions that modify the biological growth rates without changing the underlying biological framework.

Current forcing includes:

* Seasonal light variation
* Annual temperature cycles
* Light attenuation through the overlying water column
* Sediment-driven burial events

Each forcing function represents a distinct environmental process and can be enabled, modified or extended independently, allowing increasingly realistic ecological scenarios to be explored while maintaining a transparent and modular model architecture.

## How to Read this Booklet

The pages in this booklet describe both the conceptual mathematical framework and its current computational implementation.

The Core Growth Model introduces the underlying biological equations that motivate the simulation. Subsequent pages describe how these equations are realised within the current layered implementation through numerical integration, environmental forcing and discrete ecological events such as burial and recolonisation.

The implementation therefore represents an evolving computational realisation of the core biological model rather than a direct one-to-one transcription of the introductory equations.

## Project Goals

The project aims to:

- Explore the mathematics of stromatolite growth
- Investigate the interaction between biology and environment
- Develop an interpretable computational model
- Generate realistic layered structures through emergent behaviour
- Provide an accessible explanation of the underlying mathematics

Equally importantly, the project serves as a computational natural history exercise, demonstrating how relatively simple mathematical models can illuminate biological processes operating over geological timescales.

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
        {% for chapter in site.data.stromatolites.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Acknowledgements

This project is inspired by studies of stromatolites, microbial mats and early life on Earth, together with the broader traditions of computational modelling and theoretical morphology.

All code and implementations used in this project are original.

{% include stromatolite-growth-invitation.html %}