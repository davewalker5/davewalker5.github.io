---
layout: default
title: Interpreting the 3-D Circular Domed Model Model Output
breadcrumb: 3D Circular Masked Model Interpretation
description: Interpreting the outputs of the 3-D rcircular masked model of stromatolite growth
series: stromatolites
chapter: 13
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "3d-circular-domed-growth-summary.png"
   alt: "3-D Circular Domed Model Growth Summary"
   caption: "3-D Rectangular  Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
environmental_forcing:
   name: "3d-circular-domed-environmental-forcing.png"
   alt: "3-D Circular Domed Model Environmental Forcing"
   caption: "3-D Circular Domed Model Environmental Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_snapshots:
   name: "3d-circular-domed-surface-snapshots.png"
   alt: "3-D Circular Domed Model Surface Snapshots"
   caption: "3-D Circular Domed Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
radial_profiles:
   name: "3d-circular-domed-radial-profiles.png"
   alt: "3-D Circular Domed Model Radial Profiles"
   caption: "3-D Circular Domed Model Radial Profiles"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_maps:
   name: "3d-circular-domed-final-surface-maps.png"
   alt: "3-D Circular Domed Model Final Surface Maps"
   caption: "3-D Circular Domed Model Final Surface Maps"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_render:
   name: "3d-circular-domed-final-surface-render.png"
   alt: "3-D Circular Domed Model Final Surface Render"
   caption: "3-D Circular Domed Model Final Surface Render"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
final_surface_cross_section:
   name: "3d-circular-domed-final-cross-section-slice.png"
   alt: "3-D Circular Domed Model Final Surface Cross-Section Slice"
   caption: "3-D Circular Domed Model Final Surface Cross-Section Slice"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Interpreting the 3-D Circular Domed Model Model Output

The three-dimensional circular domed model extends the biological framework established by the previous simulations into a realistic domed stromatolite while preserving exactly the same underlying biological processes.

The figures below illustrate how microbial growth, sediment accumulation and environmental forcing interact with the domed geometry to produce an evolving three-dimensional stromatolite.

## Overall Growth Behaviour

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

This figure summarises the principal biological and geometric behaviour of the simulation.

Mean stromatolite height increases steadily throughout the simulation while biomass, EPS production and sediment accumulation continue to follow the same ecological relationships established in the earlier implementations.

The biological behaviour remains consistent with the one-, two- and three-dimensional models, demonstrating that introducing a domed geometry does not alter the governing biological equations.

Instead, the simulation isolates the influence of geometry on stromatolite morphology.

## Environmental Forcing

{% include fullwidth-image.html assets=page.assets img=page.environmental_forcing %}

Environmental forcing remains identical to that used throughout the previous models.

Seasonal illumination, annual temperature variation, stochastic sediment supply and water-depth-dependent light attenuation continue to regulate microbial productivity.

As the domed surface evolves, small differences in local elevation produce corresponding differences in water depth and light availability across the colony, generating subtle spatial variability in biological activity.

## Evolution of the Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_snapshots %}

These snapshots illustrate the gradual evolution of the stromatolite surface.

Unlike the circular masked model, the simulation begins from an idealised domed morphology rather than a flat microbial mat.

As biological growth proceeds, the surface continues to evolve while preserving its overall domed form.

Local environmental histories produce subtle differences in elevation that accumulate naturally through time without disrupting the large-scale morphology of the stromatolite.

## Radial Height Profiles

{% include fullwidth-image.html assets=page.assets img=page.radial_profiles %}

The radial height profiles provide one of the clearest illustrations of stromatolite development.

The dashed profile represents the initial domed geometry.

Successive profiles show how biological growth progressively builds upon this initial surface while preserving the overall dome shape.

Rather than replacing the imposed geometry, the biological processes act to modify and extend it, demonstrating the interaction between geometric structure and ecological growth throughout the simulation.

## Final Surface Diagnostics

{% include fullwidth-image.html assets=page.assets img=page.surface_maps %}

These maps summarise the state of the stromatolite surface at the end of the simulation.

In addition to the biological variables presented in earlier implementations, the model now distinguishes between:

- The initial dome geometry
- Biological growth accumulated during the simulation
- The resulting final stromatolite surface

This separation makes it possible to distinguish inherited geometry from subsequent biological development.

The growth thickness map demonstrates that local biological accretion varies across the colony despite all locations following identical governing equations.

These differences emerge naturally through the interaction of geometry, environmental forcing and local growth history.

## Final Three-Dimensional Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

The final surface reconstruction represents the principal achievement of this implementation.

Although the biological model is identical to that used throughout the earlier simulations, the combination of a circular colony and domed geometry produces a morphology immediately recognisable as a stromatolite.

The resulting form emerges through the interaction of simple biological processes operating within an increasingly realistic geometric framework.

## Internal Cross-Section

{% include fullwidth-image.html assets=page.assets img=page.final_surface_cross_section %}

A vertical slice through the completed stromatolite reveals the preserved laminated structure beneath the domed surface.

Successive microbial mats remain visible as distinct growth layers, recording repeated episodes of growth, burial and recolonisation.

Comparison of the final surface with the initial dome illustrates how biological accretion progressively modifies the original geometry while preserving the characteristic domed morphology.

As in the previous implementations, the complete internal growth history remains accessible throughout the three-dimensional structure.

## What the Domed Model Demonstrates

The circular domed model demonstrates that realistic stromatolite morphology can be achieved without introducing additional biological complexity.

Throughout the progression from the one-dimensional reference model to the present implementation, the governing biological equations remain unchanged.

Each successive implementation refines only the spatial representation.

The resulting domed stromatolite therefore demonstrates one of the central themes of this project: increasingly realistic biological structures can emerge through progressively richer geometry while preserving a simple, interpretable biological model.

## Looking Ahead

The circular domed implementation completes the current sequence of geometric developments, progressing from a one-dimensional biological model to a recognisable three-dimensional stromatolite.

Future work can now focus less on geometric representation and more on biological and ecological questions, including emergent dome formation, expanding colonies, erosion, hydrodynamic sediment transport and increasingly realistic environmental interactions.

These developments can build upon a computational framework whose biological foundations have remained deliberately unchanged throughout the project.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
