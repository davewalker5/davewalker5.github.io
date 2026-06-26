---
layout: default
title: The Three-Dimensional Rectangular Model
breadcrumb: 3D Rectangular Model
description: An overview of how the stromatolite growth model is extended from a two-dimensional cross-section to a three-dimensional stromatolite surface
series: stromatolites
chapter: 8
assets: "/images/modelling/stromatolites/"
---

# The Three-Dimensional Rectangular Model

The two-dimensional cross-section model demonstrated that the core biological model could be extended into space while preserving its governing equations.

The three-dimensional rectangular model represents the next stage in that progression.

Rather than simulating a single vertical slice through a stromatolite, the model now represents an entire growing microbial surface as a rectangular grid of independently evolving growth columns.

The underlying biological processes remain unchanged. Only the spatial representation has been extended.

## From Two Dimensions to Three

The two-dimensional implementation models a single cross-section through the stromatolite.

The three-dimensional model performs the same biological calculations simultaneously across a two-dimensional surface.

Each grid cell represents an individual vertical growth column with its own:

- Surface elevation
- Living microbial biomass
- Extracellular polymeric substances (EPS)
- Active sediment layer
- Burial history
- Local environmental conditions

Together these columns form a complete three-dimensional microbial mat whose surface evolves through time.

## Spatial Representation

The stromatolite surface is represented as a regular rectangular grid.

At each timestep every surface location evaluates:

- Seasonal illumination
- Temperature
- Water depth
- Light attenuation
- Sediment deposition
- Biological growth
- Burial and recolonisation

The resulting changes are applied independently to every grid cell before the updated surface is reconstructed.

Although each column follows the same biological model, differences in local environmental history allow neighbouring regions to diverge naturally over time.

## Surface Evolution

Initially the stromatolite surface is perfectly flat.

Small spatial differences arise through stochastic sediment deposition and local burial events.

As these differences accumulate, local water depth and light availability also begin to differ slightly between neighbouring locations.

This produces gentle topographic relief without requiring any additional biological mechanisms.

The resulting morphology therefore emerges from repeated interactions between environmental forcing and the existing biological model.

## Internal Stratigraphy

The model records successive depositional layers throughout the simulation.

Any vertical or horizontal slice through the final structure therefore reveals the complete laminated history of stromatolite growth.

Unlike the previous two-dimensional implementation, these slices may be extracted from any position within the three-dimensional volume.

The model therefore represents the internal architecture of a complete stromatolite rather than a single predetermined cross-section.

## Surface Smoothing

Natural microbial mats do not develop perfectly sharp discontinuities between neighbouring regions.

To represent this, the model applies a weak lateral smoothing operation to the evolving surface.

This numerical relaxation suppresses unrealistic single-cell height differences while preserving the independent biological behaviour of each growth column.

The biological model itself remains unchanged.

## Relationship to the Core Biological Model

The three-dimensional implementation introduces no additional biological processes.

Every grid cell solves exactly the same governing equations described in the Core Growth Model.

The extension from two to three dimensions is therefore entirely geometric.

Maintaining this separation between biological behaviour and spatial representation remains a central design principle of the project.

## Current Limitations

The present implementation represents an idealised rectangular stromatolite growing on a flat substrate.

Although it captures fully three-dimensional surface morphology, it does not yet represent:

- Circular stromatolite geometry
- Radially varying growth area
- Curvature-dependent growth
- Directional sediment transport
- Hydrodynamic flow
- Nutrient transport across the surface

These provide natural directions for future development while preserving the existing biological framework.

## Looking Ahead

The rectangular model establishes the computational framework required for realistic three-dimensional stromatolite simulations.

Future work will replace the idealised rectangular growth area with geometries more representative of natural stromatolites, allowing questions of doming, radial growth and large-scale morphology to be investigated without altering the underlying biological model.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
