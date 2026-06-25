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

Each lamina represents a period of microbial growth followed by the deposition of sediment, after which a new microbial community colonises the freshly buried surface and begins the next phase of growth.

Early versions of the model reproduced this behaviour by burying the microbial mat once it reached a predetermined thickness.

While this approach generated convincing layered structures, the timing of burial was fixed and therefore independent of environmental conditions.

The model has since been refined so that burial is driven directly by sediment deposition, allowing lamination to emerge naturally from environmental processes.

## From Scheduled Burial to Process-Driven Burial

The original implementation followed a simple rule.

1. Microbial mat grows
2. Mat reaches fixed thickness
3. Burial occurs
4. New lamina begins

Although computationally straightforward, this approach implied that burial was triggered by biological growth rather than by changes in the surrounding environment.

In reality, burial occurs because sediment is deposited onto the microbial surface. The revised model therefore links burial directly to sediment accumulation.

## Ecological Sequence

The revised model follows the sequence believed to occur in natural stromatolites.

1. Storm or sediment deposition
2. Microbial surface becomes buried
3. Photosynthetic activity declines
4. New microbial community colonises
5. Growth resumes
6. Next lamina develops

This sequence reflects the interaction between biological growth and changing environmental conditions rather than an externally imposed timing rule.

## Sediment as the Trigger

Instead of monitoring microbial thickness, the model monitors sediment accumulation. When sufficient sediment is deposited onto the living microbial surface, the active layer becomes buried and biological activity shifts to the newly exposed sediment surface.

The timing of lamination therefore depends upon the surrounding depositional environment.

## Relationship to Storm Events

Large burial events are commonly associated with energetic conditions such as storms, as they introduce a pulse of sediment into the system.

If sufficient material is deposited, the existing microbial surface becomes buried, terminating the current phase of growth.

Following recolonisation, a new microbial layer begins to develop above the deposited sediment.

Storms therefore become an important mechanism for generating distinct lamina boundaries.

## Emergent Lamination

Because burial now depends upon environmental conditions rather than a fixed growth threshold, the internal structure of the stromatolite becomes more variable.

The model naturally produces:

- Laminae of differing thickness
- Irregular intervals between burial events
- Thicker sediment-rich layers following energetic conditions
- Thinner layers during quieter periods

These features emerge from the interaction between growth and sedimentation rather than from explicit programming.

## Interaction with the Core Model

Burial events do not introduce new biological processes. Instead, they alter the conditions experienced by the existing microbial community. The sequence during each simulation becomes:

1. Sediment is deposited.
2. Burial depth is updated.
3. The existing microbial surface may become buried.
4. Biological growth is transferred to the newly exposed surface.
5. Growth resumes according to the core biological equations.

The differential equations describing microbial growth remain unchanged. Only the environmental conditions controlling the active growth surface are modified.

## Relationship to Other Environmental Forcing

Burial events operate alongside the other environmental forcing mechanisms within the model.

- Seasonality controls the rate of biological growth
- Water-column attenuation determines the amount of light available for photosynthesis
- Sediment deposition determines when an actively growing microbial surface becomes buried

Together these processes govern both the rate of stromatolite growth and the formation of its characteristic layered structure.

## Design Philosophy

This refinement illustrates an important principle of the stromatolite model.

Where possible, visible structures should emerge from ecological processes rather than from predefined construction rules.

The model no longer instructs the stromatolite to create a new lamina after reaching a particular thickness.

Instead, lamination arises naturally because environmental sediment deposition periodically buries the living microbial surface, forcing growth to begin again on a newly established layer.

The resulting structure is therefore an emergent property of the interaction between biology and environment, rather than an imposed geometric pattern.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
