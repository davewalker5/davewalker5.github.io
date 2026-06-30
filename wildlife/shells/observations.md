---
layout: default
title: Observations
breadcrumb: Observations
description: Notes and reflections arising from the modelling process, including observations on shell geometry, parameter interactions, morphology, and computational natural history
series: morphology
chapter: 20
images:
---

# Observations

## Shells as Developmental History

An important aspect of logarithmic shell growth is self-similarity.

As a shell enlarges, the organism can continue growing without fundamentally changing its body geometry. Earlier shell stages therefore become preserved records of previous growth states, producing the characteristic coiled forms seen in many molluscs and cephalopods.

The project consequently treats shell form not simply as static geometry, but as accumulated developmental history emerging from iterative growth rules.

## The Major Drivers of Shell Morphology

A recurring theme throughout the project is that shell morphology emerges from the interaction of a relatively small number of developmental processes:

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

The project therefore extends beyond computer graphics into a simplified exploration of developmental morphology and computational natural history.

The development of the annulated orthocone revealed an additional distinction within shell ornamentation itself. Continuous ornamentation, such as sinusoidal ribbing or pigmentation bands, primarily affects surface appearance. By contrast, discrete growth ornamentation, such as annulations, can introduce visually significant developmental structure while leaving the underlying shell geometry unchanged. The resulting forms suggest that ornamentation spans a spectrum from purely decorative surface features to structures that express aspects of growth history and shell construction.

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

## Classification as Morphological Description

As the collection of shell models expanded, describing shells simply by their preset names became increasingly limiting. Introducing a computational classification demonstrated that shell morphology can be decomposed into a small set of largely independent descriptive characteristics.

Separating biological affinity, growth geometry and observable morphology produced a flexible vocabulary capable of describing every shell currently implemented while remaining readily extensible to future forms.

More significantly, the classification became more than an organisational convenience. By expressing shell form in a consistent, machine-readable way, it established a bridge between computational modelling and comparative morphology, allowing shell morphology itself to become the subject of quantitative investigation.

## From Individual Models to Morphospace

The introduction of classification naturally led to a second observation.

Once every shell could be described using the same morphological vocabulary, it became possible to compare shell forms quantitatively without analysing their meshes directly.

The resulting similarity analysis demonstrated that relationships between shell forms emerge naturally from their recorded characteristics. Expected groupings, such as orthocones with annulated orthocones, ammonites with serpenticones and Turritella variants with one another, arose automatically from the classification rather than being specified in advance.

Perhaps more importantly, the analysis highlighted the distinction between morphological similarity and evolutionary relationship. Convergent shell forms may occupy nearby positions within the computational morphospace despite belonging to different biological lineages.

The project therefore evolved from generating individual shell geometries towards constructing and exploring a computational morphospace of shell form.

## Computational Natural History

Viewed as a whole, the project increasingly suggests that shell diversity can be understood at several complementary levels.

Individual shell forms emerge from the interaction between a relatively small number of developmental processes, including aperture growth, growth trajectory, coiling behaviour and ornamentation. These mechanisms proved capable of generating a remarkably broad range of shell morphologies while remaining conceptually simple.

As the collection of shell models expanded, it became apparent that generation alone was only part of the investigation. Introducing a computational classification provided a consistent vocabulary for describing shell morphology independently of the underlying implementation. Growth mathematics, biological inspiration and observable shell characteristics could each be recorded separately, allowing shells to be organised and compared in a systematic way.

This descriptive framework naturally led to quantitative similarity analysis. By comparing the recorded morphological characteristics rather than the generated meshes, relationships between shell forms emerged directly from their classifications. Expected groupings, such as orthocones with annulated orthocones, ammonites with serpenticones and the two Turritella variants, arose automatically without requiring predefined taxonomic groupings. At the same time, the analysis illustrated the distinction between morphological similarity and evolutionary relationship, allowing convergent forms to occupy nearby positions within the resulting morphospace despite differing biological origins.

Taken together, these developments suggest a progression in the scope of the project. What began as an investigation into the computational generation of shell geometry has evolved into a broader exploration of computational shell morphology. The emphasis has shifted from asking whether particular shell forms can be reproduced towards understanding how those forms relate to one another, which developmental mechanisms underpin their diversity, and how that diversity can be described and analysed within a consistent computational framework.

Although intentionally simplified, the models demonstrate how a relatively small collection of geometric and developmental principles can generate, describe and compare a diverse range of shell forms. In that sense, the project increasingly increasingly sits at the intersection of computer graphics, developmental morphology and computational natural history.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
