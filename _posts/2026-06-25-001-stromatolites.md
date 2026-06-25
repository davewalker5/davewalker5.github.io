---
layout: post
title: "From Museum Visit to Mathematical Model: Exploring Stromatolite Growth"
date: 2026-06-25 00:00:01
categories: [field-notes]
tags: []
excerpt: 
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "1d-growth-summary.png"
   alt: "1-D Model Growth Summary"
   caption: "1-D Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
column_development:
   name: "1d-column-snapshots.png"
   alt: "1-D Model Column Development"
   caption: "1-D Model Column Development"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

One of the pleasures of returning to places you’ve visited before is discovering that your interests have quietly shifted.

During a recent visit to the Oxford University Museum of Natural History, I found myself spending less time looking at the spectacular skeletons and more time studying something far older and, in many ways, even more remarkable: stromatolites.

For over three billion years, these layered structures have recorded the interaction between microbial life and its environment. Long before animals, forests or flowering plants appeared, communities of microscopic organisms were trapping sediment, growing towards the light, and slowly constructing structures that would become some of the oldest biological fossils preserved on Earth.

As I read more about how stromatolites are thought to form, I began wondering whether the underlying process could be explored computationally.

Not by reproducing every microscopic detail, but by asking a much simpler question:

> How little mathematics is needed before recognisable stromatolite behaviour begins to emerge?

That question became the starting point for a new Field Notes Journal project.

## A Model Built from Processes

Rather than attempting a complete biological simulation, the current model concentrates on the principal ecological interactions involved in stromatolite development.

Microbial communities grow through photosynthesis. Sediment is deposited by the surrounding environment. Burial interrupts biological growth before new microbial mats recolonise the newly exposed surface. Seasonal changes in light and temperature alter growth rates, while the overlying water column controls how much light reaches the actively growing surface.

Each of these processes is represented by a relatively simple mathematical model. Together they are solved numerically through time, allowing their interaction to determine how the stromatolite develops.

An important design decision was to keep the biological model separate from the environmental processes. Seasonality, sediment deposition and light attenuation act as modular forcing functions rather than being embedded directly within the core equations. This makes the behaviour easier to interpret while allowing increasingly realistic environments to be explored in future versions.

## Watching Structure Emerge

The current implementation is deliberately one-dimensional.

Although it cannot yet reproduce the domed forms associated with many stromatolites, it provides an ideal environment for investigating the biological and environmental processes that generate layered growth.

One of the most satisfying aspects of the project has been watching those layers emerge naturally.

Rather than instructing the model to create a new lamina after a fixed interval, layering develops because environmental sediment periodically buries the active microbial surface. Biological growth resumes on the newly deposited sediment, gradually constructing the laminated column seen in the simulation.

{% include fullwidth-image.html assets=page.assets img=page.column_development %}

The model also produces a range of diagnostic outputs showing microbial growth, sediment deposition, seasonal forcing and burial events throughout the simulation.

These visualisations are valuable not simply because they show the model working, but because they make it possible to understand why particular structures develop.

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

## Looking Ahead

This first version is intended as a proof of concept rather than a finished model.

Future work will explore richer environmental forcing, more realistic sediment dynamics and, ultimately, higher-dimensional models capable of reproducing the characteristic forms of stromatolites as well as their internal layered structure.

Like the Computational Shell Morphology project, this investigation forms part of a broader interest in computational natural history: using mathematics and simulation as tools for exploring the processes that shape the natural world.

Sometimes a museum visit ends with a few photographs or notes.

Occasionally it becomes the beginning of an entirely new line of investigation.

For me, this project has proved to be one of those occasions.

{% include stromatolite-modelling-invitation.html %}
