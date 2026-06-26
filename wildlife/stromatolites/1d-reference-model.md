---
layout: default
title: The One-Dimensional Reference Model
breadcrumb: 1D Reference Model
description: Interpreting the outputs of the one-dimensional reference implementation of the stromatolite growth model
series: stromatolites
chapter: 5
assets: "/images/modelling/stromatolites/"
growth_summary:
   name: "1d-growth-summary.png"
   alt: "1-D Model Growth Summary"
   caption: "1-D Model Growth Summary"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
seasonal_forcing:
   name: "1d-seasonal-forcing.png"
   alt: "1-D Model Seasonal Forcing"
   caption: "1-D Model Seasonal Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
sediment_forcing:
   name: "1d-sediment-forcing.png"
   alt: "1-D Model Sediment Forcing"
   caption: "1-D Model Sediment Forcing"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
burial_events:
   name: "1d-burial-events.png"
   alt: "1-D Model Burial Events"
   caption: "1-D Model Burial Events"
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
---

# The One-Dimensional Reference Model

The one-dimensional stromatolite model provides a simplified representation of vertical stromatolite growth through time.

Although it omits the lateral growth that gives stromatolites their characteristic domed forms, the 1-D model is extremely useful for understanding the biological and environmental processes that control lamina formation.

Together the figures below provide a window into the model’s internal behaviour, illustrating how biological processes and environmental forcing combine to generate laminated growth.

## Overall Growth Behaviour

{% include fullwidth-image.html assets=page.assets img=page.growth_summary %}

The growth summary provides an overview of the principal biological variables throughout the simulation.

The figure shows how microbial growth, sediment accumulation and stromatolite height evolve together as the system responds to changing environmental conditions.

Several important behaviours can be observed:

- Stromatolite height increases progressively through time
- Biological activity varies with environmental forcing
- Growth is not perfectly uniform, reflecting seasonal and sedimentary influences
- Individual burial events interrupt otherwise continuous growth

Rather than exhibiting constant upward accretion, the stromatolite develops through alternating phases of active biological growth and environmental disturbance.

This interaction between biology and environment forms the basis of laminated stromatolite development.

## Seasonal Environmental Forcing

{% include fullwidth-image.html assets=page.assets img=page.seasonal_forcing %}

This figure illustrates the environmental forcing applied during the simulation.

The current implementation includes annual cycles in:

- Surface illumination
- Temperature

These quantities are represented as smooth periodic functions that modify the biological growth rates without altering the underlying mathematical model.

The seasonal cycles produce periods of favourable and unfavourable growth conditions:

- During brighter, warmer periods, microbial productivity increases
- During darker or cooler periods, biological growth slows, producing naturally varying lamina thicknesses rather than perfectly uniform layering

## Sediment Forcing

{% include fullwidth-image.html assets=page.assets img=page.sediment_forcing %}

Sediment deposition represents one of the principal environmental controls on stromatolite development.

Rather than applying sediment continuously at a constant rate, the model allows sediment input to vary through time.

- Quiet periods produce relatively little burial, allowing microbial communities to continue growing
- More energetic periods introduce larger sediment inputs that may bury the active microbial surface

Because sediment deposition varies independently of biological growth, the timing of lamina formation becomes environmentally controlled rather than biologically prescribed.

This represents an important transition from rule-based lamination to emergent lamination.

## Burial Events

{% include fullwidth-image.html assets=page.assets img=page.burial_events %}

This figure highlights the occurrence of individual burial events throughout the simulation.

Each event represents a significant episode of sediment deposition sufficient to terminate growth on the existing microbial surface.

Following burial:

- Photosynthetic activity at the buried surface ceases
- A new microbial mat colonises the deposited sediment
- Biological growth resumes
- A new lamina begins to develop

The spacing between burial events therefore determines the thickness of individual laminae.

Because burial depends upon environmental sediment supply rather than a fixed growth threshold, the resulting layering is naturally irregular.

## Development of the Vertical Column

{% include fullwidth-image.html assets=page.assets img=page.column_development %}

These snapshots provide perhaps the clearest visualisation of the simulated stromatolite developing through time with each panel represents the state of the vertical column at a different stage of growth.

Several characteristic features become apparent.

Early in the simulation, relatively few laminae have formed and the structure remains thin.

As growth proceeds, repeated cycles of biological accretion and sediment burial gradually construct an increasingly complex laminated column.

The resulting structure is not imposed directly by the model.

Instead, it emerges naturally from the interaction between:

- Microbial growth
- Photosynthesis
- Seasonal environmental forcing
- Sediment deposition
- Burial and recolonisation

This emergence of layered structure from relatively simple interacting processes is one of the principal objectives of the model.

## What the 1-D Model Demonstrates

Although simplified, the one-dimensional model demonstrates several important principles.

It shows that realistic stromatolite layering can emerge from the interaction of a relatively small number of ecological processes.

The model also illustrates the value of separating the biological equations from the environmental forcing functions.

Rather than embedding seasonality, sedimentation or light availability directly within the core equations, these influences are introduced as independent environmental processes that modify biological activity.

This modular approach makes the behaviour easier to understand while allowing progressively richer environmental scenarios to be explored.

## Looking Ahead

The one-dimensional model represents an important intermediate stage in the development of the project.

Its principal purpose is to test the biological assumptions, investigate parameter behaviour and understand how individual environmental processes influence stromatolite growth.

The same ecological principles can subsequently be extended into higher-dimensional models, allowing lateral growth, branching morphology and more complex stromatolite forms to emerge while retaining the biological framework established here.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
