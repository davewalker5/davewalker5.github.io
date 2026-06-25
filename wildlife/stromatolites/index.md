---
layout: default
title: Stromatolite Growth Modelling
description: n exploration of how microbial growth, sedimentation and environmental change combine to produce the layered structures of stromatolites through computational modelling.
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

This project explores how some of Earth’s earliest complex biological structures can be reproduced using relatively simple computational models, beginning with a one-dimensional model allows the underlying ecological mechanisms to be understood before extending the framework to more realistic two- and three-dimensional growth.

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

The current implementation combines several interacting components.

### Core biological model

The underlying mathematical model describes the interaction between:

- Microbial growth
- Sediment accumulation
- Burial
- Photosynthetic activity

These processes are represented as coupled ordinary differential equations (ODEs), solved numerically through time.

### Environmental forcing

Environmental conditions are represented as independent forcing functions that influence the biological rates without changing the underlying equations.

Current forcing includes:

- Seasonal light variation
- Annual temperature cycles
- Light attenuation through the overlying water column
- Sediment-driven burial events

This modular design makes it straightforward to introduce additional environmental influences as the project develops.

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