---
layout: default
title: Turritella-Like Shell
breadcrumb: Turritella-Like Shell
description: A high-spired gastropod shell generated from logarithmic growth and axial translation, with closely abutting whorls, flattened whorl profiles and simple growth ribbing.
series: morphology
chapter: 9
images:
  - name: "turritella-001.png"
    alt: "Simulation of Turritella-Like Shell"
    caption: "Simulation of Turritella-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turritella-002.png"
    alt: "Simulation of Turritella-Like Shell"
    caption: "Simulation of Turritella-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turritella-003.png"
    alt: "Simulation of Turritella-Like Shell"
    caption: "Simulation of Turritella-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

### Tower Shell (Turritella-Like)

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The tower shell preset explores high-spired gastropod morphology using a logarithmic spiral combined with axial growth. Unlike the planispiral nautilus and ammonite-inspired forms, shell growth is translated progressively along the coiling axis, producing an elongated tower-like shell.

Characteristics:

- High-spired shell geometry
- Logarithmic growth with axial translation
- Closely abutting whorls
- Flattened aperture profile
- Continuous gastropod-style shell growth
- Simple growth rib ornamentation

The resulting morphology resembles tower shells such as Turritella and related high-spired gastropods, where shell form emerges from the interaction between logarithmic expansion, aperture shape and the spacing between successive whorls.

An interesting observation during development was that shell appearance proved highly sensitive to the relationship between aperture size and axial translation. Small changes in whorl overlap transformed the shell from a simple geometric spiral into a recognisably biological form, highlighting the importance of aperture geometry and growth trajectory alongside logarithmic expansion itself.

Current limitations include:

- Apertures remain vertically oriented
- Whorl profiles are simplified relative to many real gastropods
- Ornamentation is limited to growth ribs
- Aperture shape remains symmetrical
- No true spiral sculpture or shell shoulders are currently modelled

Future work may explore:

- Aperture inclination and rotation
- Spiral cords and more realistic ornamentation
- Asymmetric gastropod apertures
- Alternative whorl profiles
- Additional high-spired shell morphologies

The tower shell model also serves as a useful comparison with a separate conical-helix implementation. Although both approaches can produce superficially similar forms, the logarithmic-growth model more naturally reproduces the appearance of accretionary shell growth, where shell form emerges from the progressive enlargement and translation of a persistent aperture.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
