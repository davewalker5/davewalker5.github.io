---
layout: default
title: The Three-Dimensional Circular Domed Model
breadcrumb: 3D Circular Domed Model
description: An overview of how the stromatolite growth model is extended from a 3-D circular to a 3-D circular domed stromatolite colony
series: stromatolites
chapter: 12
assets: "/images/modelling/stromatolites/"
---

# The Three-Dimensional Circular Domed Model

The three-dimensional circular domed model extends the circular masked implementation by introducing an idealised domed stromatolite geometry while preserving the existing biological model.

The underlying biological processes remain unchanged.

Every active location follows exactly the same governing equations established in the one-dimensional reference implementation.

Only the geometry of the growing stromatolite has been modified.

## From Circular to Domed

The previous implementation demonstrated that the biological model could operate within a realistic circular microbial colony.

The present implementation asks a different question:

What changes if the same biological model is allowed to develop upon a geometry representative of mature domed stromatolites?

Rather than beginning from a perfectly flat microbial mat, the colony now develops upon a shallow domed surface that provides a more realistic geometric framework for stromatolite growth.

The biological processes governing microbial growth, sediment accumulation, burial and lamina formation remain identical to those of the earlier models.

## Domed Geometry

The active microbial mat occupies the same circular footprint as in the previous implementation.

The principal change is the introduction of a configurable domed surface representing the initial stromatolite morphology.

Several dome profiles can be represented through model parameters while preserving the same underlying biological framework.

Throughout the simulation, microbial growth, sediment deposition and burial act upon the exposed domed surface, allowing the complete morphology to evolve naturally through time.

## Surface Evolution

The simulation begins with an idealised domed stromatolite.

As biological growth proceeds, successive cycles of photosynthesis, sediment accumulation and burial modify the exposed surface while preserving the overall domed morphology.

Surface smoothing represents small-scale redistribution processes acting across the exposed microbial mat, allowing the complete stromatolite surface to evolve as a coherent biological structure rather than treating newly deposited material independently of the existing morphology.

The resulting surface therefore reflects the combined influence of the initial geometry and the continuing ecological processes operating throughout the simulation.

## Internal Stratigraphy

As in the earlier implementations, the complete layered history of stromatolite development is preserved throughout the simulation.

Successive episodes of microbial growth, burial and recolonisation generate the characteristic laminated internal architecture.

The domed geometry influences the external morphology of the stromatolite while the internal lamination continues to emerge from the same biological mechanisms established in the one-dimensional reference model.

## Relationship to Earlier Models

The domed implementation introduces no new biological mechanisms.

Compared with the circular masked model, it changes only the geometric framework within which the biological model operates.

This deliberate separation between biology and geometry remains a central design principle throughout the project, demonstrating how increasingly realistic stromatolite morphology can emerge without increasing biological complexity.

## Current Limitations

Although considerably more representative of natural stromatolites than the previous implementations, the present model still assumes:

- A fixed circular colony
- An idealised initial dome geometry
- Uniform environmental forcing across the colony
- No hydrodynamic sediment transport
- No lateral biological interactions

These simplifications allow the influence of stromatolite geometry to be investigated independently of additional biological complexity.

## Looking Ahead

The circular domed implementation completes the project’s progression from a one-dimensional biological model to a fully three-dimensional domed stromatolite while preserving the same underlying biological framework throughout.

Future developments may investigate emergent dome formation, expanding colony margins, radial environmental gradients, erosion, hydrodynamic transport and more sophisticated interactions between biology and evolving stromatolite morphology.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
