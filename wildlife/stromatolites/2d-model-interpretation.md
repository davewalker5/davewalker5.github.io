---
layout: default
title: Interpreting the 2-D Cross-Sectional Model Output
breadcrumb: 2D Model Interpretation
description: Interpreting the outputs of the 2-D cross-sectional model of stromatolite growth
series: stromatolites
chapter: 7
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "2d-growth-summary.png"
   alt: "2-D Cross-Sectional Model Growth Summary"
   caption: "2-D Cross-Sectional  Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
environmental_forcing:
   name: "2d-environmental-forcing.png"
   alt: "2-D Cross-Sectional Model Environmental Forcing"
   caption: "2-D Cross-Sectional Model Environmental Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_snapshots:
   name: "2d-surface-snapshots.png"
   alt: "2-D Cross-Sectional Model Surface Snapshots"
   caption: "2-D Cross-Sectional Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
height_time:
   name: "2d-height-time-map.png"
   alt: "2-D Cross-Sectional Model Height vs. Time Map"
   caption: "2-D Cross-Sectional Model Height vs. Time Map"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
burial_events:
   name: "2d-burial-event-map.png"
   alt: "2-D Cross-Sectional Model Burial Events Map"
   caption: "2-D Cross-Sectional Model Burial Events Map"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
final_cross_section:
   name: "2d-final-cross-section.png"
   alt: "2-D Cross-Sectional Model Final Cross Section"
   caption: "2-D Cross-Sectional Model Final Cross Section"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
final_surface_diagnostics:
   name: "2d-final-surface-diagnostics.png"
   alt: "2-D Cross-Sectional Model Final Surface Diagnostics"
   caption: "2-D Cross-Sectional Model Final Surface Diagnostics"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Interpreting the 2-D Cross-Sectional Model Output

The two-dimensional cross-section model extends the reference one-dimensional implementation by solving the same biological equations independently at many positions along a horizontal transect.

This allows the stromatolite surface to evolve as a spatially distributed system while retaining the biological framework established by the core model.

The figures below illustrate the behaviour of the current implementation and demonstrate how local biological processes combine to produce an evolving stromatolite cross-section.

## Overall Growth Behaviour

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

The growth summary provides an overview of the principal biological and geometric properties of the simulation.

As in the one-dimensional implementation, stromatolite height increases through the interaction of microbial growth and sediment deposition. The two-dimensional model additionally tracks the evolution of surface relief across the growing stromatolite.

Several important behaviours can be observed:

- Mean stromatolite height increases steadily through time.
- Biological activity responds to changing environmental conditions.
- Surface roughness evolves naturally as neighbouring columns experience different growth histories.
- Burial events interrupt growth locally rather than simultaneously across the entire cross-section.

The figure demonstrates that the underlying biological model remains stable when extended into a spatial representation.

## Environmental Forcing

{% include fullwidth-image.html assets=page.assets img=page.environmental_forcing %}

The environmental forcing remains identical to that used by the reference one-dimensional model.

Seasonal variation in illumination and temperature modifies biological growth rates, while changing sediment supply influences burial frequency and lamina formation.

Within the two-dimensional implementation these forcing functions are evaluated independently for every surface location, allowing neighbouring columns to experience different local conditions as their elevations diverge through time.

## Evolution of the Surface

{% include fullwidth-image.html assets=page.assets img=page.surface_snapshots %}

These snapshots illustrate how the stromatolite surface develops throughout the simulation.

Each profile represents the elevation of the actively growing surface at a different stage of growth.

Initially the surface is nearly uniform, with only small variations between neighbouring columns.

As the simulation progresses, local differences in sediment accumulation, biological growth and burial history produce an increasingly complex surface profile.

Although the current implementation introduces only modest spatial coupling, coherent surface structure nevertheless emerges from the interaction of many independently evolving growth columns.

## Height Through Time

{% include fullwidth-image.html assets=page.assets img=page.height_time %}

The height-time map provides a convenient summary of surface evolution throughout the simulation.

The horizontal axis represents position along the stromatolite cross-section, while the vertical axis represents simulation time.

Colour indicates the height of the actively growing surface.

This visualisation makes it possible to identify:

- Persistent differences between neighbouring locations.
- The development of local surface relief.
- Regions that experience relatively faster or slower long-term growth.

The figure provides a concise overview of how spatial variability develops over the course of the simulation.

## Spatial Burial Events

{% include fullwidth-image.html assets=page.assets img=page.burial_events %}

Unlike the one-dimensional model, burial is no longer represented by a single sequence of events.

Instead, each location along the stromatolite surface maintains its own burial history.

This figure illustrates where and when burial occurs throughout the simulation.

Horizontal bands indicate environmental events affecting much of the surface simultaneously, while local variations reflect differences in sediment accumulation and independent biological development.

The resulting pattern demonstrates that lamination becomes spatially heterogeneous even though the governing biological equations remain unchanged.

## Final Cross-Section

{% include fullwidth-image.html assets=page.assets img=page.final_cross_section %}

The final cross-section summarises the internal structure produced by the simulation.

The coloured laminae record the cumulative history of biological growth and sediment deposition, while the upper boundary represents the final stromatolite surface.

Although the present implementation represents only a vertical cross-section, the figure illustrates how local environmental history influences the developing internal architecture.

The resulting structure is not prescribed directly.

Instead, it emerges from repeated cycles of biological growth, sediment deposition, burial and recolonisation occurring independently across the growing surface.

## Final Surface Diagnostics

{% include fullwidth-image.html assets=page.assets img=page.final_surface_diagnostics %}

The final diagnostic plots summarise the biological and environmental state of every surface location at the end of the simulation.

Variables such as surface height, biomass, sediment accumulation and light availability can be compared directly across the entire transect.

These diagnostics provide a useful means of understanding why different regions of the stromatolite evolved differently during the simulation and help identify the environmental processes responsible for the observed surface morphology.

## What the Two-Dimensional Model Demonstrates

The two-dimensional implementation demonstrates that the biological framework established by the reference one-dimensional model can be extended naturally into space without altering its governing equations.

Each surface location follows the same ecological model while responding to its own local environmental conditions.

The resulting stromatolite therefore develops through the interaction of many locally evolving microbial communities rather than as a single vertical column.

This represents an important step towards investigating the mechanisms responsible for stromatolite morphology.

## Looking Ahead

The present implementation should be regarded as a spatial extension of the reference biological model rather than a complete morphological simulation.

Although it captures local environmental variability and spatially distributed growth, many processes that influence natural stromatolite form remain absent.

## Future developments may incorporate:

- Directional sediment transport
- Hydrodynamic flow
- Curvature-dependent growth
- Nutrient transport
- Fully three-dimensional geometry

By introducing these processes incrementally while retaining the existing biological framework, the model provides a transparent platform for investigating how complex stromatolite morphology may emerge from relatively simple ecological interactions.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
