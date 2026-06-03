---
layout: default
title: Ammonite-Like Shell
breadcrumb: Ammonite-Like Shell
description: A ribbed coiled shell form inspired by ammonites, combining logarithmic growth with ornamentation and evolving shell expansion
series: morphology
chapter: 6
images:
  - name: "ammonite-001.png"
    alt: "Simulation of Ammonite-Like Shell"
    caption: "Simulation of Ammonite-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ammonite-002.png"
    alt: "Simulation of Ammonite-Like Shell"
    caption: "Simulation of Ammonite-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ammonite-003.png"
    alt: "Simulation of Ammonite-Like Shell"
    caption: "Simulation of Ammonite-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ammonite-004.png"
    alt: "Simulation of Ammonite-Like Shell Showing Internal Structure"
    caption: "Simulation of Ammonite-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Ammonite-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The ammonite-like preset exaggerates shell expansion and ornamentation relative to the nautilus form.

Characteristics:

- Broader outer whorl
- Stronger radial ribbing
- More compressed appearance
- Faster shell expansion
- Larger visible aperture

The resulting morphology resembles many fossil ammonites, particularly strongly ribbed planispiral forms.

The model demonstrates how relatively small parameter changes can shift shell morphology from nautilus-like inflation toward more ornamented ammonite-like geometries.

Transparent rendering additionally reveals:

- Internal chamber spacing
- Septal placement
- Siphuncle trajectory

providing a simplified visualisation of cephalopod internal shell structure.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
