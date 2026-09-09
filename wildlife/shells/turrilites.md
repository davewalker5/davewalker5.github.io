---
layout: default
title: Turrilites-Like Shell
breadcrumb: Turrilites-Like Shell
description: A Turrilites-inspired ammonoid shell with a tall tapering spire, closely stacked whorls, pronounced growth ribs, curved internal chamber septa and a helical siphuncle
series: morphology
chapter: 12
assets: "/images/modelling/shells/"
images:
  - name: "turrilites-opaque-aperture-raised.png"
    alt: "Simulation of Turrilites-Like Shell"
    caption: "Simulation of Turrilites-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turrilites-opaque-top.png"
    alt: "Simulation of Turrilites-Like Shell"
    caption: "Simulation of Turrilites-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turrilites-transparent-aperture-raised.png"
    alt: "Simulation of Turrilites-Like Shell Showing Internal Structure"
    caption: "Simulation of Turrilites-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "turrilites-transparent-top.png"
    alt: "Simulation of Turrilites-Like Shell Showing Internal Structure"
    caption: "Simulation of Turrilites-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Turrilites-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The Turrilites-like preset models a high-spired ammonoid inspired by the distinctive helically coiled shells of *Turrilites*.

Characteristics:

- Tall, tapering spire
- Closely stacked whorls
- Pronounced radial ribbing
- Helical rather than planispiral coiling
- Curved internal chamber septa
- Continuous internal siphuncle

The shell uses logarithmic growth combined with automatic axial translation to produce its tall, tightly stacked form. Strong sinusoidal ribbing emphasises the individual whorls and gives the exterior its characteristic ornamented appearance.

The model demonstrates how the same underlying growth framework used for planispiral shells can produce a markedly different ammonoid morphology when growth is displaced along the shell axis.

Transparent rendering additionally reveals:

- Internal chamber spacing
- Curved septal placement
- The siphuncle following the helical shell path

providing a simplified visualisation of the internal structure of a heteromorph ammonoid.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
