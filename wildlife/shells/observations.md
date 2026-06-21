---
layout: default
title: Observations
breadcrumb: Observations
description: Notes and reflections arising from the modelling process, including observations on shell geometry, parameter interactions, morphology, and computational natural history
series: morphology
chapter: 17
images:
---

# Observations

## Shells as Developmental History

An important aspect of logarithmic shell growth is self-similarity.

As a shell enlarges, the organism can continue growing without fundamentally changing its body geometry. Earlier shell stages therefore become preserved records of previous growth states, producing the characteristic coiled forms seen in many molluscs and cephalopods.

The project consequently treats shell form not simply as static geometry, but as accumulated developmental history emerging from iterative growth rules.

## The Major Drivers of Shell Morphology

A recurring theme across the shell presets is that morphology emerges from the interaction of a relatively small number of mechanisms:

1. Logarithmic radial growth
2. Growth trajectory and spatial translation
3. Aperture geometry and scaling
4. Coiling rate
5. Ornamentation and pigmentation
6. Terminal aperture modification
7. Internal shell structures

Despite this relatively small parameter set, shell form proved highly sensitive to the relationships between these components. Small parameter changes often produced disproportionately large morphological differences.

The tower-shell investigations provided a particularly clear example. Relatively modest changes to whorl overlap, aperture inclination and axial translation transformed a form resembling a simple helical spring into a recognisably biological gastropod shell. This demonstrated that shell morphology depends not only on logarithmic expansion itself, but also on the spatial relationship between successive growth stages.

More generally, the tower-shell experiments showed that aperture geometry, whorl interaction and growth trajectory can be as important as the underlying logarithmic spiral. While logarithmic expansion provides the growth framework, much of the recognisable morphology emerged from the way successive apertures were translated, inclined and allowed to overlap through space.

The orthocone investigations extended this observation further. By replacing the logarithmic spiral growth path with a simple linear growth trajectory, the same aperture-sweep framework produced straight-shelled cephalopod forms rather than coiled shells. This reinforced the idea that shell morphology emerges from the interaction between aperture growth and growth trajectory, with coiling representing only one possible developmental path among many.

The subsequent development of cyrtocone shells extended this idea further. Introducing curvature into the growth trajectory produced recognisably different cephalopod morphologies while leaving aperture growth, chamber generation and siphuncle construction largely unchanged. Together, the orthocone and cyrtocone models demonstrated that growth trajectory itself constitutes a major driver of shell morphology, capable of generating substantial anatomical diversity without requiring changes to the underlying developmental mechanisms.

The development of the crioceratite model provided an instructive counterpoint to the orthocone and cyrtocone investigations. Whereas those forms required new growth trajectories, the crioceratite emerged entirely within the existing logarithmic-spiral framework. Relatively modest changes to shell expansion, whorl interaction and ornamentation transformed a tightly coiled ammonite-like shell into a recognisably open-coiled heteromorph form. This demonstrated that substantial morphological diversification can arise both from changes in growth trajectory and from changes in the interaction between successive growth stages within a shared developmental framework.

## Growth Rules and Rendering Rules

A useful distinction emerged between growth rules and rendering rules.

Growth-related parameters such as logarithmic expansion, coiling rate, aperture geometry and growth trajectory largely determine overall shell architecture. By contrast, features such as ribbing, pigmentation and shell-wall thickness primarily influence appearance. Although ornamentation contributes significantly to realism, the most substantial morphological changes generally arose from modifications to the growth process itself rather than from surface decoration.

The project therefore acts not only as a graphics exercise, but also as a simplified exploration of computational natural history and developmental morphology.

## Structural Abstractions

In practice, separating:

- Growth trajectory
- Aperture geometry
- Coiling geometry
- Ornamentation
- Pigmentation
- Internal shell structures

proved valuable both visually and conceptually. Treating these as distinct layers made it easier to explore how different aspects of shell form contribute to the final morphology.

The tower-shell investigations highlighted the value of treating growth trajectory independently from logarithmic expansion. Similar overall forms could be produced by both conical-helix and logarithmic-growth models, but the latter more naturally reproduced the appearance of accretionary shell growth and progressive whorl development.

The orthocone investigations provided a similar lesson for internal shell structures. Several components, including chamber septa placement, initially assumed that progression through the shell corresponded to angular position along a coil. Straight-shelled forms exposed this assumption and required chamber generation to be reformulated in terms of progression along the shell growth axis.

This demonstrated that many shell features are most naturally defined relative to developmental growth position rather than specific geometric representations such as coiling angle.

The development of orthocone shells also showed that internal features such as the siphuncle can be expressed in shell-relative coordinates rather than absolute geometry. Defining siphuncle position as a proportion of local shell radius allowed the same conceptual structure to be reused across both coiled and straight-shelled shell architectures.

The cyrtocone investigations extended this principle beyond growth coordinates. Once shell curvature was introduced, aperture orientation, chamber geometry and siphuncle construction could no longer rely on fixed global reference frames. Instead, these structures had to be generated relative to local coordinate systems derived from the shell centreline itself. This revealed that many aspects of shell construction are most naturally expressed in terms of shell-relative geometry rather than absolute spatial coordinates.

## Computational Natural History

The project increasingly suggests that diverse shell forms can emerge from a common set of geometric and developmental principles.

The orthocone investigations broadened this perspective by demonstrating that many aspects of shell construction can be expressed independently of any particular shell geometry. Chamber formation, siphuncle placement and shell-wall generation could all be reformulated in terms of growth-relative coordinates and developmental progression.

Although the models presented here are intentionally abstract, they suggest how complex shell forms may emerge from the interaction of a relatively small number of growth processes operating over long periods of development. More broadly, they hint at the possibility of a general growth-based framework capable of generating a wide range of shell architectures from shared underlying rules.

The progression from logarithmic spiral shells through tower shells, orthocones and cyrtocones also suggested a useful higher-level abstraction: shell form can be viewed as the interaction between a growth trajectory and a growing aperture. Under this interpretation, logarithmic spirals, straight axes and curved axes become alternative growth-path geometries within a shared developmental framework. The resulting diversity of forms emerges less from fundamentally different construction processes than from variations in how growth is directed through space.

The crioceratite investigations suggested a complementary mechanism for morphological diversification. Not all major changes in shell form required alternative growth trajectories; some emerged through modifications to the relationship between successive whorls within the same logarithmic growth process. The transition from tightly coiled ammonite-like shells to open-coiled heteromorph forms demonstrated how substantial anatomical differences can arise from relatively small adjustments to developmental parameters while retaining the same underlying construction principles.

The subsequent development of serpenticone morphologies reinforced this observation. Unlike the crioceratite, the serpenticone remains fully planispiral and requires no alteration to the underlying growth framework. Changes to shell expansion rate, whorl overlap and ornamentation alone were sufficient to transform a conventional ammonite-like shell into a recognisably distinct cephalopod form. Together, the ammonite, serpenticone and crioceratite models demonstrated that substantial morphological diversity can emerge from relatively small movements through parameter space while preserving the same fundamental developmental process.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
