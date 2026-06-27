---
layout: default
title: The Three-Dimensional Circular Masked Model
breadcrumb: 3D Circular Masked Model
description: An overview of how the stromatolite growth model is extended from a rectangular 3-D surface to a circular stromatolite colony
series: stromatolites
chapter: 10
assets: "/images/modelling/stromatolites/"
---

# The Three-Dimensional Circular Masked Model

The three-dimensional circular masked model extends the rectangular implementation by replacing the idealised rectangular computational domain with a circular microbial colony.

The underlying biological model remains unchanged.

Every active location follows exactly the same governing equations established in the one-dimensional reference implementation.

Only the geometry of the growing colony has been modified.

## From Rectangular to Circular

The previous implementation demonstrated that the biological model could be extended across a complete three-dimensional surface.

The present implementation asks a different question:

What changes if the same biological model is allowed to grow within a geometry more representative of natural stromatolites?

Rather than occupying every location within a rectangular grid, biological growth is now restricted to a circular region representing the active microbial colony.

Cells outside this region are excluded from biological calculations while the internal dynamics remain unchanged.

## Circular Growth Domain

The active microbial mat occupies a circular footprint centred within the computational grid.

Only locations lying inside this region participate in:

- Photosynthetic growth
- Biomass accumulation
- EPS production
- Sediment deposition
- Burial
- Lamina formation

The surrounding grid exists solely to provide a convenient computational framework.

## Surface Evolution

Initially the colony forms a perfectly flat circular microbial mat.

As stochastic burial events occur, neighbouring locations experience different environmental histories.

These differences accumulate gradually into subtle variations in surface elevation while preserving the overall circular colony shape.

The resulting morphology emerges naturally from the interaction of environmental forcing and the existing biological model.

## Internal Stratigraphy

As in the rectangular implementation, the complete layered history of stromatolite development is preserved throughout the simulation.

Vertical sections extracted through any part of the colony reveal successive episodes of microbial growth, burial and recolonisation.

The circular boundary influences only the external geometry of the stromatolite.

The laminated internal architecture develops through exactly the same biological processes as in earlier models.

## Relationship to Earlier Models

The circular implementation introduces no new biological mechanisms. Compared with the rectangular model it changes only one aspect of the simulation: The spatial domain within which biological growth is permitted.

This deliberate separation between biology and geometry remains a central design principle throughout the project.

## Current Limitations

Although considerably more representative of natural stromatolites than the rectangular implementation, the present model still assumes:

- A fixed circular colony
- A flat underlying substrate
- Uniform environmental forcing across the colony
- No hydrodynamic transport
- No lateral biological interactions

These simplifications allow the influence of geometry to be investigated independently of additional biological complexity.

## Looking Ahead

The circular implementation establishes a realistic geometric foundation for future investigations of stromatolite morphogenesis.

Possible future developments include gradually expanding colonies, domed growth forms, radial environmental gradients and more sophisticated interactions between biology and surface geometry.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
