---
layout: default
title: Interpreting the 3-D Rectangular Model Output
breadcrumb: 3D Model Interpretation
description: Interpreting the outputs of the 3-D rectangular model of stromatolite growth
series: stromatolites
chapter: 9
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "3d-growth-summary.png"
   alt: "3-D Rectangular Model Growth Summary"
   caption: "3-D Rectangular  Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
environmental_forcing:
   name: "3d-environmental-forcing.png"
   alt: "3-D Rectangular Model Environmental Forcing"
   caption: "3-D Rectangular Model Environmental Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_snapshots:
   name: "3d-surface-snapshots.png"
   alt: "3-D Rectangular Model Surface Snapshots"
   caption: "3-D Rectangular Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_maps:
   name: "3d-final-surface-maps.png"
   alt: "3-D Rectangular Model Final Surface Maps"
   caption: "3-D Rectangular Model Final Surface Maps"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_render:
   name: "3d-final-surface-render.png"
   alt: "3-D Rectangular Model Final Surface Render"
   caption: "3-D Rectangular Model Final Surface Render"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
final_surface_cross_section:
   name: "3d-final-cross-section-slice.png"
   alt: "3-D Rectangular Model Final Surface Cross-Section Slice"
   caption: "3-D Rectangular Model Final Surface Cross-Section Slice"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Interpreting the 3-D Rectangular Model Output

The three-dimensional rectangular model extends the biological framework established by the previous simulations into a complete three-dimensional microbial surface.

The figures below illustrate how local biological processes combine to produce a growing stromatolite whose morphology emerges naturally from environmental forcing and accumulated growth history.

## Overall Growth Behaviour

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

This figure summarises the principal biological and geometric properties of the simulation.

Mean stromatolite height increases steadily throughout the simulation, while surface roughness and relief evolve in response to local sediment deposition and burial.

Because each surface location maintains its own biological history, environmental disturbances produce temporary increases in roughness before gradual relaxation of the growing surface.

The overall behaviour closely mirrors that observed in the earlier one- and two-dimensional models, demonstrating that extending the model into three dimensions does not alter the underlying biology.

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

These relationships emerge naturally from the interaction of the existing biological model with the evolving surface geometry.

## Final Three-Dimensional Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

The three-dimensional surface reconstruction provides the clearest visualisation of the developing stromatolite.

Although the initial substrate is perfectly flat, local environmental history produces gentle hummocks and depressions across the microbial surface.

No large-scale morphology is prescribed directly.

Instead, the surface topography emerges from the cumulative effects of independent biological growth, sediment deposition and burial acting over thousands of simulation steps.

## Internal Cross-Section

{% include fullwidth-image.html assets=page.assets img=page.final_surface_cross_section %}

A vertical slice through the completed structure reveals its internal laminated architecture.

The coloured laminae record successive episodes of biological growth and sediment accumulation.

Local variations in layer thickness reflect the differing environmental histories experienced by neighbouring regions of the stromatolite.

Because the model represents a complete three-dimensional volume, similar sections may be extracted at any position through the structure.

## What the Three-Dimensional Model Demonstrates

The three-dimensional rectangular implementation demonstrates that realistic stromatolite morphology can begin to emerge without introducing additional biological complexity.

Every surface location follows the same governing equations established by the reference one-dimensional model.

Nevertheless, small differences in local environmental history accumulate into coherent three-dimensional surface relief.

The model therefore shows that complex spatial structure can arise naturally from repeated interactions between simple biological processes and environmental forcing.

## Looking Ahead

The rectangular geometry represents an idealised computational platform rather than a complete representation of natural stromatolites.

Its principal purpose is to establish the numerical framework required for fully three-dimensional growth.

Future developments will introduce circular growth domains, domed morphology and more realistic environmental interactions while preserving the biological model established throughout the earlier stages of the project.
