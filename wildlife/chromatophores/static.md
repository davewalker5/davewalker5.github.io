---
layout: default
title: Static Patterns
breadcrumb: Static Patterns
description: Exploring how fixed target arrangements can produce different cephalopod-inspired skin patterns from the same population of simulated chromatophores
series: chromatophores
chapter: 2
assets: "/images/modelling/chromatophores/"
checkerboard:
    name: "chromatophore/checkerboard.png"
    alt: "Chromatophore View of the Checkerboard Pattern"
    caption: "Chromatophore View of the Checkerboard Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
horizontal_bands:
    name: "skin/horizontal-bands.png"
    alt: "Skin View of the Horizontal Bands Pattern"
    caption: "Skin View of the Horizontal Bands Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
vertical_bands:
    name: "skin/vertical-bands.png"
    alt: "Skin View of the Vertical Bands Pattern"
    caption: "Skin View of the Vertical Bands Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
spots:
    name: "chromatophore/spots.png"
    alt: "Chromatophore View of the Spots Pattern"
    caption: "Chromatophore View of the Spots Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
random_mottle:
    name: "skin/random-mottle.png"
    alt: "Skin View of the Random Mottled Pattern"
    caption: "Skin View of the Random Mottled Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
radial_gradient:
    name: "skin/radial-gradient.png"
    alt: "Skin View of the Radial Gradient Pattern"
    caption: "Skin View of the Radial Gradient Pattern"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Static Patterns

The simplest way to create a pattern in the simulator is to give every chromatophore a fixed target expansion and let the field move towards that arrangement.

The important point is that the population itself does not change.

Cells do not move to new positions, exchange pigment, or become part of a different structure. The same 2,500 chromatophores remain in place throughout; only their visible sizes change.

That means a transition from one pattern to another is not a replacement image. It is a reconfiguration of the same underlying system.

A static pattern therefore works by assigning a target expansion to each cell and then allowing the normal expansion rate, contraction rate and response delay to determine how quickly the visible field reaches the new state. Once those targets have been reached, the pattern remains stable until another command is selected.

The simulator currently provides seven fixed pattern types, described below.

## Uniform

The Uniform pattern gives every cell the same target expansion:

```text
0.5
```

All chromatophores therefore move towards half expansion.

This does **not** mean that the field becomes a single colour. Yellow, red, brown and black pigment classes retain their identities throughout. What becomes uniform is the degree of expansion.

In Chromatophore View the alternating pigment classes remain obvious; in Skin View their combined appearance becomes much more continuous. static

Fully expanded and fully contracted uniform fields can instead be produced using **Expand All** and **Contract All**.

## Checkerboard

{% include fullwidth-image.html assets=page.assets img=page.checkerboard %}

Checkerboard divides the field into square regions six cells wide and six cells high. One block is fully expanded, its neighbours are contracted, and the state alternates in both directions.

Conceptually:

```text
expanded     contracted   expanded
contracted   expanded     contracted
expanded     contracted   expanded
```

The upper-left block begins expanded.

Because the 50 × 50 field is not an exact multiple of six, blocks at the far edges may be incomplete.

What is interesting here is that the checkerboard does not exist as a separately drawn graphic. It emerges simply because neighbouring groups of chromatophores have been assigned different target states.

## Horizontal Bands

{% include fullwidth-image.html assets=page.assets img=page.horizontal_bands %}

Horizontal Bands uses the same general idea, but groups the field by row.

Rows are arranged into bands six cells high. One band expands, the next contracts, and the sequence repeats down the field.

Every cell within a row therefore receives the same target, producing stripes that run horizontally across the full width of the simulated skin.

## Vertical Bands

{% include fullwidth-image.html assets=page.assets img=page.vertical_bands %}

Vertical Bands applies the same alternating arrangement to columns instead.

Columns are grouped into bands six cells wide. One band expands, the next contracts, and the sequence repeats across the field.

Every cell within a column receives the same target, producing the same basic pattern as Horizontal Bands rotated through 90 degrees.

These two patterns are useful because they make the relationship between target assignment and whole-field appearance particularly obvious.

## Spots

{% include fullwidth-image.html assets=page.assets img=page.spots %}

The Spots pattern produces regularly spaced areas of strong expansion against a contracted background. Each spot is defined computationally rather than drawn as an image.

The simulator places spot centres 12 cell spacings apart and then tests each chromatophore against a circular region with a radius of 3.5 cell spacings:

- Cells inside a circle receive full expansion
- Cells outside receive full contraction

The rounded shapes therefore emerge from the collective state of many individual cells.

This is a useful example of the distinction between **drawing a shape** and **causing a shape to emerge from local target values**.

## Random Mottle

{% include fullwidth-image.html assets=page.assets img=page.random_mottle %}

Random Mottle is more interesting because it avoids assigning unrelated random values to every cell. Instead, the simulator begins by choosing random expansion values at widely spaced sample positions, six cell spacings apart. The values between those samples are then blended gradually.

Neighbouring chromatophores therefore tend to receive similar targets, producing broad irregular patches rather than visual noise.

This differs from both **Randomise**, where every cell receives its own unrelated random target, and **Changing Mottle**, where new mottled arrangements are generated continuously as a dynamic display.

The distinction is useful:

```text
Randomise
    ↓
Independent random cells

Random Mottle
    ↓
Spatially related random field

Changing Mottle
    ↓
A sequence of spatially related random fields
```

## Radial Gradient

{% include fullwidth-image.html assets=page.assets img=page.radial_gradient %}

Radial Gradient produces a smooth transition rather than a hard boundary.

Chromatophores nearest the geometric centre receive the strongest expansion targets. Expansion then decreases progressively with distance from the centre, reaching zero at the corners.

The result is a gradual outward fading of pigment rather than discrete expanded and contracted regions.

Because the field contains an even number of rows and columns, its exact centre lies between cells. The closest cells therefore fall just short of full expansion.

This pattern is particularly useful for showing that target values do not have to be binary.

The same system that produces hard-edged checkerboards and spots can also generate continuous gradients simply by changing the rule used to assign expansion values.

## Comparing Patterns

One of the more interesting ways to use the static patterns is not simply to look at their final states, but to watch one become another.

For example, set both response rates to:

```text
0.5 / second
```

and move between:

```text
Checkerboard → Spots → Radial Gradient
```

Some chromatophores will need to expand, others contract, and some may already be close to their new targets.

This makes it possible to watch the same process at two scales:

> **individual cells changing state**

and

> **a whole visual pattern reorganising itself**

Re-selecting an unchanged fixed pattern does not restart the cells' response delays because their targets have not changed.

Random Mottle is the exception: selecting it again generates an entirely new target field.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include chromatophore-simulator-invitation.html %}
