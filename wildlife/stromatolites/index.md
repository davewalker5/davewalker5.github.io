---
layout: default
title: Stromatolite Growth Modelling
description: An exploration of how microbial growth, sedimentation and environmental change combine to produce the layered structures of stromatolites through computational modelling.
breadcrumb: Stromatolite Growth Modelling
permalink: /wildlife/stromatolites/
assets: "/images/modelling/stromatolites/"
banner_image:
   name: "2d-surface-snapshots.png"
   alt: "2-D Cross-Sectional Model Surface Snapshots"
   caption: "2-D Cross-Sectional Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Stromatolite Growth Modelling

{% include fullwidth-image.html assets=page.assets img=page.banner_image %}

Welcome to the *Stromatolite Growth Modelling- project.

This project explores how some of Earth’s earliest complex biological structures can be reproduced using relatively simple computational models.

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

The project consists of a common biological framework implemented at multiple spatial scales. The one-dimensional model provides a reference implementation for understanding the governing biology, while the two-dimensional model extends the same equations into a spatially distributed cross-section for investigating stromatolite morphology.

The underlying biological equations describe microbial growth, sediment accumulation, photosynthesis and burial. These equations are first explored using a one-dimensional reference implementation before being extended into a spatially distributed two-dimensional cross-section model.

This separation allows the biological framework to remain unchanged while progressively richer spatial behaviour is investigated.

### Core biological model

The biological processes are described by a set of coupled growth equations representing interactions between:

- Microbial growth
- Photosynthetic activity
- Sediment accumulation
- Burial

These continuous processes are integrated numerically through time using an adaptive ODE solver.

### Layered structure

The current implementation extends the core equations with an event-driven layered model.

As the simulation progresses:

- The uppermost microbial mat grows continuously.
- Sediment is deposited onto the living surface.
- Burial events terminate growth of the active layer.
- A new microbial mat is established on the newly buried surface.
- Older buried layers remain preserved within the developing stromatolite.

This combination of continuous growth and discrete ecological events allows the characteristic laminated structure of stromatolites to emerge naturally from repeated cycles of growth, burial and recolonisation.

### Environmental forcing

Environmental conditions are represented as independent forcing functions that modify the biological growth rates without changing the underlying biological framework.

Current forcing includes:

- Seasonal light variation
- Annual temperature cycles
- Light attenuation through the overlying water column
- Sediment-driven burial events

Each forcing function represents a distinct environmental process and can be enabled, modified or extended independently, allowing increasingly realistic ecological scenarios to be explored while maintaining a transparent and modular model architecture.

## Current Implementations

The project currently contains two complementary implementations of the core biological model.

### One-Dimensional Reference Model

The one-dimensional model represents a single vertical growth column and serves as the reference implementation of the biological equations.

It provides a transparent framework for understanding microbial growth, sediment burial and lamina formation before introducing spatial complexity.

### Two-Dimensional Cross-Section Model

The two-dimensional model extends the same biological framework across a horizontal transect composed of many interacting growth columns.

Each surface location evolves according to the same governing equations while responding to its own local environmental conditions, allowing spatial variability and evolving surface morphology to emerge naturally.

## How to Read these Project Pages

The pages this section of the site fall into three complementary categories:

- Core biological processes describe the governing equations and ecological mechanisms underlying stromatolite growth
- Computational implementations describe how those biological processes are represented within the one-dimensional reference model and the two-dimensional cross-section model
- Model interpretation explains how to read and interpret the diagnostic outputs produced by each implementation.

This organisation reflects the philosophy of the project: the biological model remains constant while progressively richer spatial representations are explored.

## Project Goals

The project aims to:

- Explore the mathematics of stromatolite growth
- Investigate the interaction between biology and environment
- Develop an interpretable computational model
- Generate realistic layered structures through emergent behaviour
- Investigate how spatial structure and stromatolite morphology emerge from the same underlying biological framework
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