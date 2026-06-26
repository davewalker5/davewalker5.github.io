---
layout: default
title: The Two-Dimensional Cross-Sectional Model
breadcrumb: 2D Cross-Sectional Model
description: An overview of how the stromatolite growth model is extended from a single vertical column to a spatially distributed two-dimensional cross-section
series: stromatolites
chapter: 6
assets: "/images/modelling/stromatolites/"
---

# The Two-Dimensional Cross-Sectional Model

The one-dimensional stromatolite model demonstrates how laminated structures can emerge from the interaction of microbial growth, sediment deposition and environmental forcing.

Although biologically informative, a single vertical column cannot represent one of the most recognisable features of natural stromatolites: their spatial morphology.

The two-dimensional model extends the same biological framework into space by representing the stromatolite as a horizontal transect composed of many interacting vertical growth columns.

The underlying biological equations remain unchanged. Only their spatial representation becomes richer.

## From One Dimension to Two

The one-dimensional implementation models a single vertical column through time.

Each timestep updates:

- Surface height
- Living microbial biomass
- Sediment accumulation
- Burial and recolonisation

The two-dimensional model performs exactly the same calculations, but does so independently at many positions along a horizontal cross-section.

Each location therefore possesses its own:

- Surface elevation
- Active microbial community
- Sediment layer
- Burial history
- Environmental conditions

The resulting collection of locally interacting columns represents a growing stromatolite cross-section rather than a single laminated core.

## Spatial Representation

The stromatolite surface is represented as a one-dimensional array of vertical growth columns.

Each column follows the core biological model described elsewhere in this Wiki.

At every simulation step the environmental forcing is evaluated, biological growth is calculated and the active surface is updated independently for every column.

This allows neighbouring regions of the stromatolite to evolve differently while remaining part of a continuous growing surface.

## Local Environmental Conditions

Although all columns experience the same seasonal cycles, each occupies a different position on the stromatolite surface.

Consequently, several environmental quantities become local rather than global.

These include:

- Water depth above the actively growing surface
- Light reaching the microbial mat
- Sediment accumulation
- Burial state

The biological equations are therefore solved using conditions appropriate to each individual surface location.

## Lateral Coupling

Natural stromatolites do not consist of completely isolated vertical columns.

To represent this, the model introduces weak lateral coupling between neighbouring locations. The current implementation applies gentle spatial smoothing to the evolving surface. This represents the combined effects of small-scale sediment redistribution, microbial continuity and local surface relaxation while preventing unrealistic column-to-column discontinuities.

The biological model itself remains unchanged.

## Spatial Burial

In the one-dimensional implementation, a burial event affects the single active growth column.

Within the two-dimensional model, burial is evaluated independently for every position along the surface.

Different regions of the stromatolite may therefore become buried at different times, depending upon their local sediment accumulation.

This produces laterally variable laminae that more closely resemble natural stromatolite fabrics.

## Emergent Surface Morphology

The principal purpose of the two-dimensional model is not simply to create a wider simulation.

Instead, it allows spatial structure to emerge naturally from the interaction of biological growth and environmental processes.

Small differences between neighbouring locations may develop through local sediment deposition, differing light availability and independent burial histories.

These differences produce an evolving surface that cannot be represented within a purely one-dimensional framework.

The current implementation represents an important intermediate stage between the reference one-dimensional model and future three-dimensional simulations.

## Relationship to the Core Biological Model

The two-dimensional implementation introduces no new biological mechanisms.

Each vertical column solves exactly the same governing equations described in the Core Growth Model.

The two-dimensional simulation simply repeats these calculations across many neighbouring locations while introducing limited spatial interactions between them.

This separation between biological processes and spatial representation is a central design principle of the project.

It allows increasingly sophisticated geometries to be explored without altering the underlying ecological model.

## Current Limitations

The present implementation represents a vertical cross-section through a stromatolite rather than a complete three-dimensional structure.

Although it captures spatial variability and local environmental interactions, it does not yet represent:

- Fully three-dimensional surface geometry
- Directional sediment transport
- Hydrodynamic flow
- Curvature-dependent growth
- Nutrient diffusion across the microbial surface

These processes provide natural directions for future development while preserving the biological framework already established.

## Looking Ahead

The two-dimensional model demonstrates that the core biological equations remain valid when extended into space.

It provides a bridge between the reference one-dimensional implementation and more realistic spatial simulations, allowing questions of stromatolite morphology to be investigated while maintaining a transparent and biologically interpretable mathematical framework.

Future developments will build upon this spatial representation to explore increasingly realistic mechanisms governing stromatolite form, including environmental heterogeneity, self-organised pattern formation and fully three-dimensional growth.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
