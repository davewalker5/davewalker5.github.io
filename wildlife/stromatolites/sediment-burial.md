---
layout: default
title: Sediment Burial Events
breadcrumb: Sediment Burial Events
description: Modelling the environmental processes that periodically bury microbial mats and generate stromatolite lamination.
series: stromatolites
chapter: 3
assets: "/images/modelling/stromatolites/"
---

# Sediment Burial Events

One of the defining characteristics of stromatolites is their laminated internal structure.

Each lamina represents a period of microbial growth that is interrupted by the deposition of sediment. Once the actively growing microbial surface becomes buried, photosynthetic activity ceases and a new microbial community colonises the freshly deposited material. Repeated cycles of growth, burial and recolonisation gradually construct the layered architecture preserved within the stromatolite.

The model treats burial not as an arbitrary event, but as an ecological consequence of sediment deposition.

## Burial as an Ecological Process

Early versions of the model generated laminae by burying the microbial mat once it reached a predetermined thickness.

Although this produced convincing layered structures, it implied that burial was triggered by biological growth itself rather than by changes in the surrounding environment.

The current implementation instead links burial directly to sediment accumulation.

This better reflects natural stromatolite systems, where the deposition of sediment—often associated with storms or other energetic conditions—periodically interrupts microbial growth.

## Ecological Sequence

The model represents the following sequence of events.

1. Sediment is deposited onto the actively growing microbial surface.
2. Sediment accumulates above the microbial mat.
3. Once sufficient material has accumulated, the active surface becomes buried.
4. Photosynthetic activity at the buried surface ceases.
5. A new microbial community colonises the newly deposited sediment.
6. Biological growth resumes, initiating the next lamina.

Rather than prescribing when a new layer should form, the model allows this sequence to emerge naturally from changing environmental conditions.

## Burial Thresholds

The model continuously monitors the amount of sediment present on the actively growing surface.

When sediment accumulation exceeds a specified threshold, the existing microbial layer is considered buried and biological activity is transferred to a newly established surface above the deposited sediment.

Because sediment deposition varies through time, the timing of burial events also varies naturally.

Periods of sustained low sediment supply may allow prolonged biological growth, whereas energetic depositional events can rapidly terminate an existing growth phase.

## Relationship to Storm Events

Many burial events are associated with episodic increases in sediment supply.

Within the model these may arise from stochastic storm events, which temporarily increase the rate of sediment deposition.

Large sediment pulses therefore produce:

- More frequent burial events
- Sediment-rich laminae
- Shorter intervals of uninterrupted biological growth

Quieter environmental conditions allow microbial mats to remain active for longer periods, producing thicker biologically dominated laminae.

The internal structure of the stromatolite therefore reflects both its biological development and its environmental history.

## Emergent Lamination

Because burial is controlled by sediment deposition rather than by a fixed biological thickness, the resulting laminated structure is an emergent property of the simulation.

The model naturally produces:

- Laminae of differing thickness
- Variable intervals between successive burial events
- Sediment-rich layers following energetic conditions
- Biologically dominated intervals during quieter periods

These features are not prescribed directly. They arise from the interaction between microbial growth and changing environmental conditions.

## Extension to Two Dimensions

The same ecological process applies in both the one-dimensional and two-dimensional implementations of the model.

In the one-dimensional model, a burial event affects the single actively growing column.

In the two-dimensional model, each position along the stromatolite surface maintains its own active microbial community and sediment layer. Burial is therefore evaluated independently at every surface location.

Neighbouring positions may consequently become buried at different times, producing laterally variable laminae and a more realistic internal structure. The underlying ecological process remains unchanged; only its spatial representation becomes richer.

## Relationship to the Core Model

Burial events do not introduce new biological processes. Instead, they alter the conditions under which the existing biological model operates.

During each simulation step the model:

1. Updates environmental sediment deposition.
2. Calculates sediment accumulation at the active surface.
3. Determines whether burial occurs.
4. Establishes a new active microbial surface where required.
5. Continues solving the biological growth equations.

The governing differential equations remain unchanged throughout this sequence.

## Relationship to Other Environmental Processes

Burial operates alongside the other environmental forcing mechanisms within the model.

- Seasonal forcing modifies biological growth rates.
- Water-column attenuation determines the light available for photosynthesis.
- Sediment deposition controls when active microbial surfaces become buried.

Together these processes determine both the rate of stromatolite growth and the formation of its characteristic laminated structure.

## Design Philosophy

The burial model illustrates one of the central design principles used throughout the project.

Wherever possible, visible geological structures should emerge from biologically and environmentally meaningful processes rather than from predefined construction rules.

The model does not instruct the stromatolite to produce a new lamina after reaching a particular thickness.

Instead, new layers form because environmental sediment deposition periodically buries the living microbial surface, forcing biological activity to migrate upward onto newly deposited material.

Lamination is therefore an emergent consequence of ecological interaction rather than an imposed geometric pattern.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
