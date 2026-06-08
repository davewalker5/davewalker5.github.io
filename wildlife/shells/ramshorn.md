---
layout: default
title: Ramshorn-Like Shell
breadcrumb: Ramshorn-Like Shell
description: 
series: morphology
chapter: 10
images:
  - name: "ramshorn-opaque-iso.png"
    alt: "Simulation of Ramshorn-Like Shell"
    caption: "Simulation of Ramshorn-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ramshorn-opaque-top.png"
    alt: "Simulation of Ramshorn-Like Shell"
    caption: "Simulation of Ramshorn-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Ramshorn-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The ramshorn preset explores planispiral gastropod morphology rather than chambered cephalopods.

Characteristics:

- Smooth rounded tube-like whorls
- Strongly flattened coiling
- Broad body whorl
- Relatively simple aperture geometry
- Minimal ornamentation

The resulting form resembles freshwater ramshorn snails (Planorbidae), whose shells coil within a near-planar spiral.

Unlike the cephalopod-inspired presets, this form is primarily driven by smooth continuous growth rather than chambered internal structure.

Reducing ribbing proved important here, as excessive ornamentation quickly pushed the morphology back toward ammonite-like forms.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
