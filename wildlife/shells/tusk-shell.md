---
layout: default
title: Tusk-Like Shell
breadcrumb: Tusk-Like Shell
description: A tusk-shell-inspired scaphopod with a slender, gently curved, tapering tube, a smooth surface and circular openings at both ends, with no internal chambers or siphuncle
series: morphology
chapter: 20
assets: "/images/modelling/shells/"
images:
  - name: "tusk-opaque-presentation.png"
    alt: "Simulation of Tusk-Like Shell"
    caption: "Simulation of Tusk-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "tusk-opaque-spire-oblique.png"
    alt: "Simulation of Tusk-Like Shell"
    caption: "Simulation of Tusk-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Tusk-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.images assets=assets_path %}

The tusk shell-like preset models the slender, curved tubular shell characteristic of scaphopods.

Characteristics:

- Long, gently curved shell
- Smooth surface
- Circular cross-section
- Progressive taper along the shell
- Open broad aperture
- Open narrow tip
- No internal chambers or siphuncle

Unlike the coiled gastropod and cephalopod presets, the tusk shell uses centreline-conical growth. A circular aperture is carried along a curved centreline while changing size linearly, producing the characteristic tapering tube.

The model demonstrates that LogSpiral's growth framework is not limited to spirally coiled shells. Relatively simple centreline growth and cross-section rules can also reproduce the broad geometry of an uncoiled molluscan shell.

Although the underlying growth mode is shared with cyrtoconic models, the tusk shell represents a scaphopod rather than a cephalopod and consequently contains no chamber septa or siphuncle.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
