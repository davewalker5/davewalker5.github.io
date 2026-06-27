---
layout: default
title: Interpreting the 3-D Circular Masked Model Model Output
breadcrumb: 3D Circular Masked Model Interpretation
description: Interpreting the outputs of the 3-D rcircular masked model of stromatolite growth
series: stromatolites
chapter: 11
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "3d-circular-growth-summary.png"
   alt: "3-D Circular Masked Model Growth Summary"
   caption: "3-D Rectangular  Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
environmental_forcing:
   name: "3d-circular-environmental-forcing.png"
   alt: "3-D Circular Masked Model Environmental Forcing"
   caption: "3-D Circular Masked Model Environmental Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_snapshots:
   name: "3d-circular-surface-snapshots.png"
   alt: "3-D Circular Masked Model Surface Snapshots"
   caption: "3-D Circular Masked Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_maps:
   name: "3d-circular-final-surface-maps.png"
   alt: "3-D Circular Masked Model Final Surface Maps"
   caption: "3-D Circular Masked Model Final Surface Maps"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_render:
   name: "3d-circular-final-surface-render.png"
   alt: "3-D Circular Masked Model Final Surface Render"
   caption: "3-D Circular Masked Model Final Surface Render"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
final_surface_cross_section:
   name: "3d-circular-final-cross-section-slice.png"
   alt: "3-D Circular Masked Model Final Surface Cross-Section Slice"
   caption: "3-D Circular Masked Model Final Surface Cross-Section Slice"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Interpreting the 3-D Circular Masked Model Model Output

The three-dimensional circular masked model extends the biological framework established by the previous simulations into a complete three-dimensional microbial surface whose active growth is confined to a circular domain.

The figures below illustrate how local biological processes combine to produce a growing stromatolite whose morphology emerges naturally from environmental forcing and accumulated growth history.

## Overall Growth Behaviour

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

This figure summarises the principal biological and geometric properties of the simulation.

Mean stromatolite height increases steadily throughout the simulation, while surface roughness and relief evolve in response to local sediment deposition and burial.

Because each surface location maintains its own biological history, environmental disturbances produce temporary increases in roughness before gradual relaxation of the growing surface.

The overall biological behaviour remains consistent with previous implementations, confirming that changing the colony geometry does not alter the governing biological model.

## Environmental Forcing

{% include fullwidth-image.html assets=page.assets img=page.environmental_forcing %}

The environmental forcing remains identical to that used by previous implementations.

Seasonal illumination and temperature influence microbial productivity, while stochastic sediment supply generates local burial events across the growing surface.

As surface relief develops, local water depth and light availability begin to vary slightly across the stromatolite, introducing small but persistent spatial differences in biological growth.

## Evolution of the Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_snapshots %}

These snapshots illustrate the gradual emergence of three-dimensional surface morphology.

Initially the microbial mat is essentially flat.

Over time, independent local burial histories generate small differences in growth rate that accumulate into gentle topographic variation.

Although individual height differences remain small, coherent regions of higher and lower relief gradually emerge across the stromatolite surface.

## Final Surface Diagnostics

{% include fullwidth-image.html assets=page.assets img=page.surface_maps %}

These maps summarise the biological and environmental state of every surface location at the end of the simulation.

Surface elevation, biomass, EPS, active sediment and light availability may be compared directly across the entire microbial mat.

Many of these variables show closely related spatial patterns.

Regions that have experienced favourable growth conditions remain slightly elevated, receive marginally greater illumination through reduced water depth and consequently maintain subtle differences in biological activity.

Outside the active colony, no biological quantities are defined, allowing the circular footprint to remain clearly distinguished from the surrounding computational grid.

These relationships emerge naturally from the interaction of the existing biological model with the evolving surface geometry.

## Final Three-Dimensional Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

The final surface reconstruction provides the clearest illustration of the principal advance represented by this implementation.

Although the biological model is identical to that used by the rectangular simulation, the circular growth domain produces a morphology immediately recognisable as a discrete stromatolite colony rather than an idealised computational surface.

The resulting form emerges entirely from the interaction of the existing biological processes with the circular spatial geometry.

## Internal Cross-Section

{% include fullwidth-image.html assets=page.assets img=page.final_surface_cross_section %}

A vertical slice through the completed structure reveals its internal laminated architecture.

The coloured laminae record successive episodes of biological growth and sediment accumulation.

Local variations in layer thickness reflect the differing environmental histories experienced by neighbouring regions of the stromatolite.

Because the model represents a complete three-dimensional volume, similar sections may be extracted at any position within the structure.

The internal lamination extends naturally to the colony margin, demonstrating that restricting the active growth domain alters the external morphology without affecting the underlying depositional processes.

## What the Circular Model Demonstrates

The circular masked model demonstrates that a substantial increase in morphological realism can be achieved without introducing additional biological complexity.

By changing only the spatial domain over which the existing biological model operates, the simulation produces a recognisable stromatolite colony whose external form emerges naturally from the same ecological processes established in earlier implementations.

The model therefore reinforces one of the central themes of this project: increasingly realistic morphology need not require increasingly complicated biology.

## Looking Ahead

The circular masked implementation represents the first model in the project to reproduce the characteristic overall geometry of a natural stromatolite while preserving the same underlying biological framework.

With a realistic three-dimensional colony geometry now established, future developments can focus on investigating how large-scale stromatolite morphology emerges through the interaction of biology, environment and surface geometry.

Potential directions include expanding colony margins, domed growth forms, spatially varying environmental conditions and more realistic sediment transport, while continuing to preserve the modular biological model established throughout the earlier stages of the project.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
