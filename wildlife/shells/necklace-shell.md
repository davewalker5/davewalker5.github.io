---
layout: default
title: Necklace Shell
breadcrumb: Necklace Shell
description: A necklace-shell-inspired gastropod with a smooth, globose shell, a low spire, overlapping whorls and a dominant rounded body whorl ending in a broad aperture, with no internal chambering
series: morphology
chapter: 15
images:
  - name: "necklace-opaque-spire-oblique.png"
    alt: "Simulation of Moon Snail-Like Necklace Shell"
    caption: "Simulation of Moon Snail-Like Necklace Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "necklace-opaque-back-inverted.png"
    alt: "Simulation of Moon Snail-Like Necklace Shell"
    caption: "Simulation of Moon Snail-Like Necklace Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Necklace Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The necklace shell preset models a smooth, globose gastropod inspired by necklace shells and other moon snails.

Characteristics:

- Rounded, dominant body whorl
- Low, visible spire
- Smooth surface without ribbing
- Overlapping whorls
- Broad aperture
- No internal chambering

The shell uses logarithmic spiral growth with proportional aperture expansion. Compared with more strongly spired forms, growth is concentrated into a broad final whorl which dominates the overall shell shape.

The model demonstrates how logarithmic spiral growth can produce a compact, inflated gastropod morphology through changes to aperture proportions, whorl overlap and axial growth.

Unlike the chambered cephalopod models, the necklace shell has no septa or siphuncle, reflecting its gastropod inspiration.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
