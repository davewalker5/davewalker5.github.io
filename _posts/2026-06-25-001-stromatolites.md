---
layout: post
title: "From Notebook Sketch to Computational Model: Exploring Stromatolite Growth"
date: 2026-06-25 00:00:01
categories: [field-notes]
tags: [stromatolites, early-life, palaeontology, modelling, computational-natural-history, microbial-mats, ecology, mathematics, simulation, natural-history]
excerpt: "A breakfast spent sketching stromatolite formation on a Kindle Scribe became an unexpected exploration of how microbial growth, sedimentation and environmental change can be modelled computationally."
assets: "/images/"
notebook:
   name: "blog/stromatolite-notes.png"
   alt: "Notes on Stromatolite Growth"
   caption: "Notes on Stromatolite Growth"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
growth_summary:
   name: "modelling/stromatolites/1d-growth-summary.png"
   alt: "1-D Model Growth Summary"
   caption: "1-D Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
column_development:
   name: "modelling/stromatolites/1d-column-snapshots.png"
   alt: "1-D Model Column Development"
   caption: "1-D Model Column Development"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

Sometimes a new project begins with months of planning. Sometimes it begins with a single question.

This one started over breakfast.

I had recently bought a Kindle Scribe, partly because I wanted to move beyond highlighting passages in books and towards something more reflective: reading, sketching and summarising ideas in my own words. To put it through its paces, I began re-reading the section on stromatolites in _The History of Life in 25 Fossils_.

Rather than simply making notes, I tried to capture the formation of a stromatolite as a sequence of sketches.

{% include fullwidth-image.html assets=page.assets img=page.notebook %}

The process itself proved remarkably straightforward.

Microbial mats grow towards the light. Sediment settles on the sticky surface. The microbes then grow upwards through the newly deposited sediment towards the sunlight once again. Repeating this simple cycle over long periods gradually builds the characteristic laminated structures preserved in the fossil record.

As I finished the sketch, a thought occurred almost immediately.

> Could I model this?

That single question became the starting point for a new Field Notes Journal project.

## Thinking Through Drawing

One of the things I’ve found most rewarding about using the Kindle Scribe is that writing and drawing are not simply methods of recording information—they’re ways of understanding it.

Reducing several pages of text to a handful of diagrams forces the underlying processes to become clearer. Relationships that are easy to overlook while reading suddenly become obvious once they’re sketched out.

In this case, the sequence of microbial growth, sediment deposition and renewed growth began to look less like a description and more like a system: one whose behaviour might be explored mathematically.

The Scribe had done exactly what I had hoped it would do. It hadn’t simply stored notes; it had helped generate a new question.

## From Biological Process to Mathematical Model

Rather than attempting to reproduce every microscopic detail of a living microbial mat, the project concentrates on the principal ecological interactions believed to drive stromatolite development.

The current model represents:

- Microbial growth driven by photosynthesis
- Seasonal variation in light and temperature
- Attenuation of light through the overlying water column
- Sediment deposition and burial
- Recolonisation following burial

Each of these processes is represented by relatively simple mathematical relationships, solved numerically through time using a system of coupled ordinary differential equations.

An important design decision has been to keep the biological model separate from the environmental processes. Rather than embedding seasonality or sedimentation directly within the equations, these influences act as independent forcing functions. This keeps the biological framework relatively simple while allowing increasingly realistic environments to be explored as the project develops.

## Beginning in One Dimension

The first version of the model is intentionally one-dimensional.

Instead of attempting to reproduce the familiar domed forms of mature stromatolites, it concentrates on understanding the processes responsible for vertical growth and lamination.

This provides a useful environment for testing biological assumptions, refining the model and investigating the influence of individual environmental processes before introducing the additional complexity of higher-dimensional growth.

One of the most satisfying aspects of the work has been seeing layered structure emerge naturally from the interaction of these processes.

The model is not instructed to produce a new lamina after a fixed interval. Instead, sediment deposition periodically buries the active microbial surface, after which growth resumes on the newly deposited sediment. The layering therefore arises as an emergent consequence of ecological interaction rather than an explicitly programmed pattern.

{% include fullwidth-image.html assets=page.assets img=page.column_development %}

## Looking Inside the Model

Alongside the simulated stromatolite itself, the project generates a range of diagnostic plots showing microbial growth, sediment accumulation, seasonal forcing and burial events throughout the simulation.

These visualisations are useful not simply because they demonstrate that the model runs successfully, but because they help explain why particular patterns emerge.

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

Understanding the behaviour of the model is just as important as producing visually convincing results.

## Looking Ahead

The current implementation should be viewed as a foundation rather than a finished model.

Future work will explore richer environmental forcing, more realistic sediment dynamics and, ultimately, two- and three-dimensional simulations capable of reproducing not only laminated growth but the characteristic morphology of stromatolites themselves.

Like the Computational Shell Morphology project before it, this investigation forms part of a broader interest in computational natural history: using mathematics, simulation and visualisation as tools for exploring the processes that shape the natural world.

## A Very Field Notes Beginning

Reflecting on the project afterwards, what strikes me most is not the mathematics, but how naturally it emerged from the Field Notes process itself.

- A museum visit prompted further reading
- Reading became note-taking
- Note-taking became sketching
- Sketching clarified the biology
- Understanding prompted a question
- The question became a computational model

That progression—from observation to understanding, and from understanding to investigation—is exactly what I hope Field Notes Journal encourages.

Sometimes the most interesting discoveries are not found in the field.

Sometimes they begin with a notebook, a sketch, and a simple question asked over breakfast.

{% include stromatolite-modelling-invitation.html %}
