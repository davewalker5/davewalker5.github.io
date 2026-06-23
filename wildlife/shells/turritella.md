---
layout: default
title: Turritella-Like Shell
breadcrumb: Turritella-Like Shell
description: A high-spired gastropod shell generated from logarithmic growth and axial translation, with closely abutting whorls, flattened whorl profiles and simple growth ribbing.
series: morphology
chapter: 14
images:
  - name: "turritella-opaque-presentation.png"
    alt: "Simulation of Turritella-Like Shell"
    caption: "Simulation of Turritella-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turritella-opaque-top.png"
    alt: "Simulation of Turritella-Like Shell"
    caption: "Simulation of Turritella-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Tower Shell (Turritella-Like)

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The tower shell preset explores high-spired gastropod morphology using logarithmic shell growth combined with progressive translation along the coiling axis. Unlike the planispiral nautilus and ammonite-inspired forms, growth is directed upward as successive whorls accumulate around a central axis, producing a tall, tapering shell resembling tower shells such as Turritella.

Characteristics:

- High-spired gastropod shell geometry
- Logarithmic expansion with axial translation
- Closely abutting and partially overlapping whorls
- Aperture inclination through geometric shear
- Flattened aperture profile
- Continuous accretionary shell growth
- Simple growth-rib ornamentation

The resulting morphology emerges from the interaction between logarithmic expansion, aperture geometry, axial translation and the degree of whorl overlap. Although the model remains highly simplified, these factors together produce forms that are recognisably biological rather than purely geometric.

A particularly important observation during development was the sensitivity of shell form to the relationship between aperture size and axial translation. Small adjustments to whorl spacing transformed the shell from a helical "spring-like" structure into a coherent tower shell, demonstrating the importance of whorl contact and overlap in generating realistic gastropod morphology.

The addition of aperture inclination proved similarly significant. By introducing a simple geometric shear to the aperture profile, successive whorls acquire a subtle asymmetry that enhances the appearance of accretionary shell growth and improves the visual transition between neighbouring whorls.

Current limitations include:

- Whorl profiles remain simplified relative to many real gastropods
- Ornamentation is limited to growth ribs
- Aperture shape remains symmetrical
- No true spiral sculpture, sutures or shell shoulders are currently modelled
- Internal shell structures are not represented

Future work may explore:

- True aperture rotation and more complex aperture geometry
- Spiral cords and additional ornamentation styles
- Asymmetric gastropod apertures
- Suture formation and whorl shoulder development
- Alternative high-spired shell morphologies
- Internal shell architecture and columellar structures

The tower shell model also provides a useful comparison with a separate conical-helix implementation. While both approaches can generate superficially similar tower-like forms, the logarithmic-growth model more naturally reproduces the appearance of accretionary shell growth, where shell form emerges from the progressive enlargement, inclination and translation of a persistent aperture through time.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
