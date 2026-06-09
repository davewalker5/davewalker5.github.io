---
layout: default
title: Cyrtocone-Like Shell
breadcrumb: Cyrtocone-Like Shell
description: A curve-shelled cephalopod form generated through linear growth, with internal chamber septa and a longitudinal siphuncle
series: morphology
chapter: 14
assets: "/images/modelling/shells/"
images:
  - name: "cyrtocone-opaque-iso.png"
    alt: "Simulation of Cyrtocone-Like Shell"
    caption: "Simulation of Cyrtocone-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "cyrtocone-transparent-iso.png"
    alt: "Simulation of Cyrtocone-Like Shell Showing Internal Structure"
    caption: "Simulation of Cyrtocone-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "cyrtocone-transparent-top.png"
    alt: "Simulation of Cyrtocone-Like Shell Showing Internal Structure"
    caption: "Simulation of Cyrtocone-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "cyrtocone-opaque-presentation.png"
    alt: "Simulation of Cyrtocone-Like Shell"
    caption: "Simulation of Cyrtocone-Like"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Cyrtocone-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The cyrtocone extends the orthocone model by introducing curvature into the shell growth axis.

Where the orthocone grows along a straight centreline, the cyrtocone follows a gently curved trajectory, producing the characteristic horn-shaped shell seen in many extinct nautiloid cephalopods. In biological terms, a cyrtocone can be viewed as an intermediate architecture between a straight orthocone and more strongly curved or coiled shell forms.

Within the shell morphology framework, the cyrtocone provides an important demonstration that major changes in shell form can arise from modifications to the growth trajectory while leaving much of the underlying shell-generation machinery unchanged.

## A Curved Growth Path

The cyrtocone differs from the orthocone primarily in the geometry of its growth axis.

Instead of extending along a straight line, the shell centreline follows a smooth curve. Apertures are swept along this curved path while continuing to increase in size, producing a shell that gradually expands while simultaneously bending through space.

Although the resulting morphology differs substantially from the orthocone, the shell is generated using the same fundamental process:

- define a growth trajectory
- place apertures along that trajectory
- increase aperture size through growth
- connect successive apertures into a continuous shell surface

The resulting shell demonstrates how strongly overall morphology can depend upon the geometry of the growth path itself.

## Local Coordinate Frames

The introduction of curvature revealed an important geometric limitation in the earlier orthocone implementation.

For a straight shell, aperture orientation can remain constant throughout growth because the growth direction never changes. Once the growth axis begins to curve, however, each aperture must rotate to remain correctly aligned with the local direction of shell growth.

To support this, the shell framework was extended to construct aperture coordinate frames from the local centreline tangent. Apertures are therefore generated perpendicular to the instantaneous growth direction rather than remaining fixed in a global orientation.

This allows the shell surface to follow curved trajectories naturally and provides a more general foundation for future shell architectures.

## Chamber Geometry Along Curved Paths

The cyrtocone also provided an important test of the chamber-generation system.

In the orthocone, septa aligned to a fixed axis appeared visually acceptable because the shell itself was straight. Once curvature was introduced, any assumptions about global orientation became immediately visible.

Correct chamber construction required septa to be generated within the local coordinate system of the shell rather than a fixed world coordinate system. Each septum therefore follows the changing orientation of the growth path and remains approximately perpendicular to the local growth direction.

The resulting chamber sequence produces a much more convincing cephalopod anatomy and demonstrates the importance of generating internal structures within the shell's own geometric framework.

## The Siphuncle

The siphuncle provided a similar geometric challenge.

In the orthocone model the siphuncle follows a straight path parallel to the shell axis. Within the cyrtocone, the siphuncle must instead follow the curvature of the shell while maintaining a consistent position relative to the aperture cross-section.

Constructing the siphuncle within the shell's local coordinate system allows it to follow the curved growth trajectory naturally. In transparent renders the siphuncle forms a continuous tube running through the chamber sequence and clearly reveals the relationship between shell curvature and internal anatomy.

The cyrtocone therefore served as a useful validation model for both chamber and siphuncle generation.

## Visualising Internal Architecture

The transparent cyrtocone renders proved particularly informative.

Because the shell lacks overlapping whorls, the internal chamber structure remains visible while the curved growth path introduces a greater sense of three-dimensional form than the orthocone. The resulting models clearly expose:

- Chamber spacing
- Septal curvature
- Siphuncle position
- Shell-wall thickness
- Growth-axis geometry

The combination of transparency and curvature makes the cyrtocone one of the most effective shell forms for visualising the interaction between external morphology and internal anatomy.

## Observations

The development of the cyrtocone reinforced several broader observations emerging from the shell morphology project.

First, it demonstrated that large-scale morphological differences can arise from relatively small changes to the underlying growth trajectory. The same aperture, chamber and siphuncle mechanisms used in the orthocone can generate a recognisably different shell form simply by introducing curvature into the growth axis.

Second, it highlighted the importance of local coordinate systems. Once shell growth follows a curved path, both external and internal structures must be generated relative to the shell's own geometry rather than a fixed global reference frame.

More broadly, the cyrtocone illustrates a recurring theme within the project: growth architecture often exerts a greater influence on shell morphology than ornamentation alone. A simple modification to the growth path can transform the overall shell form while leaving most other developmental mechanisms unchanged.

In this sense, the cyrtocone serves as an important bridge between straight-shelled cephalopods and more complex curved or coiled shell architectures, demonstrating how diverse biological forms can emerge from variations in a common growth process.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
