---
layout: default
title: Observations
breadcrumb: Observations
description: Notes and reflections arising from the modelling process, including observations on shell geometry, parameter interactions, morphology, and computational natural history
series: morphology
chapter: 13
images:
---

# Observations

An important aspect of logarithmic shell growth is self-similarity.

As a shell enlarges, the organism can continue growing without fundamentally changing its body geometry. Earlier shell stages therefore become preserved records of previous growth states, producing the characteristic coiled forms seen in many molluscs and cephalopods.

The project consequently treats shell form not simply as static geometry, but as accumulated developmental history emerging from iterative growth rules.

A recurring theme across the shell presets is that morphology emerges from the interaction of a relatively small number of mechanisms:

1. Logarithmic radial growth
2. Growth trajectory and spatial translation
3. Aperture geometry and scaling
4. Coiling rate
5. Ornamentation and pigmentation
6. Terminal aperture modification
7. Internal shell structures

Despite this small parameter set, shell form proved highly sensitive to the relationships between these components. Small parameter changes often produced disproportionately large morphological differences.

The tower-shell investigations provided a particularly clear example. Relatively modest changes to whorl overlap, aperture inclination and axial translation transformed a form resembling a simple helical spring into a recognisably biological gastropod shell. This demonstrated that shell morphology depends not only on logarithmic expansion itself, but also on the spatial relationship between successive growth stages.

More generally, the tower-shell experiments showed that aperture geometry, whorl interaction and growth trajectory can be as important as the underlying logarithmic spiral. While logarithmic expansion provides the growth framework, much of the recognisable morphology emerged from the way successive apertures were translated, inclined and allowed to overlap through space.

A useful distinction also emerged between growth rules and rendering rules.

Growth-related parameters such as logarithmic expansion, coiling rate, aperture geometry and growth trajectory largely determine overall shell architecture. By contrast, features such as ribbing, pigmentation and shell-wall thickness primarily influence appearance. Although ornamentation contributes significantly to realism, the most substantial morphological changes generally arose from modifications to the growth process itself rather than from surface decoration.

The project therefore acts not only as a graphics exercise, but also as a simplified exploration of computational natural history and developmental morphology.

In practice, separating:

- Growth trajectory
- Aperture geometry
- Coiling geometry
- Ornamentation
- Pigmentation
- Internal shell structures

proved valuable both visually and conceptually. Treating these as distinct layers made it easier to explore how different aspects of shell form contribute to the final morphology.

The tower-shell investigations additionally highlighted the value of treating growth trajectory independently from logarithmic expansion. Similar overall forms could be produced by both conical-helix and logarithmic-growth models, but the latter more naturally reproduced the appearance of accretionary shell growth and progressive whorl development.

This mirrors, in a highly simplified way, the layered processes involved in real biological shell formation. Although the models presented here are intentionally abstract, they suggest how complex shell forms may emerge from the interaction of a relatively small number of growth processes operating over long periods of development.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
