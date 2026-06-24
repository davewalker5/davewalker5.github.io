---
layout: default
title: Logarithmic Spiral Growth
breadcrumb: Logarithmic Spiral Growth
description: Mathematical foundations of shell growth through logarithmic spirals, aperture expansion and accretionary geometry
series: morphology
chapter: 2
assets: "/images/modelling/shells/"
log_spiral:
  name: "log-spiral.png"
  alt: "Logarithmic Spiral Growth"
  caption: "Logarithmic Spiral Growth"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
growth_schematic:
  name: "ammonite-growth-schematic.png"
  alt: "Log Spiral Growth Schematic"
  caption: "Log Spiral Growth Schematic"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Logarithmic Spiral Growth

{% include fullwidth-image.html assets=page.assets img=page.log_spiral %}

The logarithmic spiral formed the starting point of the shell morphology project and remains one of its most important growth models. Many molluscan shells can be approximated by logarithmic spiral growth, making it a useful framework for exploring shell form computationally.

As the project expanded, additional growth trajectories such as straight orthocone and curved cyrtocone centrelines were introduced. The logarithmic spiral therefore represents one member of a broader family of growth-path models used throughout the project.

This simple mathematical curve appears throughout nature and provides a useful approximation to the growth patterns seen in many mollusc shells.

Unlike an ordinary spiral, where spacing between successive turns remains constant, a logarithmic spiral expands continuously as it rotates. As the spiral grows, its overall shape remains similar to itself at all scales, a property known as self-similarity.

For shell modelling, the logarithmic spiral provides a natural way to represent the path followed by a growing shell aperture through time.

## The Spiral Equation

The model uses the polar equation:

```
r = a e^(b * theta)
```

where:

- r is the radius from the centre of the spiral
- theta is the spiral angle
- a controls the initial size of the spiral
- b controls the growth rate

Larger values of b produce more rapidly expanding spirals, while smaller values produce tighter coils.

The spiral is converted into Cartesian coordinates using:

```
x = r * cos(theta)
y = r * sin(theta)
```

These coordinates define the path followed by the shell aperture during growth.

## Simulating Aperture Growth

A shell can be thought of as the accumulated record of a growing aperture. At each point along the spiral, an aperture is imagined to exist, representing the opening of the shell at that stage of development.

The figure above shows a sequence of elliptical apertures positioned along the spiral growth path. As the spiral expands, the apertures increase in size, illustrating how shell growth proceeds through time.

The shell surface emerges by sweeping successive apertures along the growth trajectory and connecting neighbouring growth stages together:

{% include fullwidth-image.html assets=page.assets img=page.growth_schematic %}

## Aperture Sizing Modes

The model currently supports two approaches to aperture sizing.

### Proportional Mode

In proportional mode, aperture dimensions are calculated directly from spiral radius:

```
width = k(w) * r
height = k(h) r
```

where k(w) and k(h) are user-defined scaling factors.

This produces a simple shell growth model in which aperture size increases smoothly as the shell expands.

### Abutting Mode

Real shells often exhibit whorls that closely contact or partially overlap neighbouring whorls. To better reproduce this behaviour, an alternative aperture-sizing scheme is used.

The radius of the previous whorl is estimated as:

```
r(inner) = r * e^(-2 * pi * b)
```

which corresponds to one complete rotation earlier in the growth sequence.

The radial separation between adjacent whorls is then:

```
dr = r - r(inner)
```

Aperture width is derived from this spacing:

```
width = s * dr
```

where s is a user-controlled abutment factor.

Aperture height is then calculated from the chosen width-to-height ratio:

```
height = h * width
```

This approach produces apertures whose size is linked to the spacing between neighbouring whorls rather than to absolute shell size, allowing shells with closely contacting or overlapping whorls to be generated more naturally.

## From Spiral to Shell

The logarithmic spiral defines only the growth trajectory and aperture size.

The visible shell itself is created in a separate stage by generating aperture rings along the growth path and connecting them together into a continuous mesh. Additional processes such as shell-wall thickness, growth ribs, pigmentation patterns and aperture modification are then applied to produce the final shell geometry.

The logarithmic spiral therefore provides the mathematical framework for growth, while the mesh-generation stage converts that growth history into a three-dimensional shell.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
