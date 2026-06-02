---
layout: default
title: Computational Shell Morphology
description: Explorations of shell growth, coiling geometry, and biological morphospace using logarithmic spirals, swept apertures, and procedural natural history models
breadcrumb: Computational Shell Morphology
permalink: /wildlife/shells/
nautilus:
  - name: "nautilus-001.png"
    alt: "Simulation of Nautilus-Like Shell"
    caption: "Simulation of Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "nautilus-002.png"
    alt: "Simulation of Nautilus-Like Shell"
    caption: "Simulation of Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "nautilus-003.png"
    alt: "Simulation of Nautilus-Like Shell"
    caption: "Simulation of Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "nautilus-004.png"
    alt: "Simulation of Nautilus-Like Shell Showing Internal Structure"
    caption: "Simulation of Nautilus-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
smooth_nautilus:
  - name: "smooth-nautilus-001.png"
    alt: "Simulation of Smooth Nautilus-Like Shell"
    caption: "Simulation of Smooth Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "smooth-nautilus-002.png"
    alt: "Simulation of Smooth Nautilus-Like Shell"
    caption: "Simulation of Smooth Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "smooth-nautilus-003.png"
    alt: "Simulation of Smooth Nautilus-Like Shell"
    caption: "Simulation of Smooth Nautilus-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "smooth-nautilus-004.png"
    alt: "Simulation of Smooth Nautilus-Like Shell Showing Internal Structure"
    caption: "Simulation of Smooth Nautilus-Like Shell Showing Internal Structure"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
ammonite:
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
ramshorn:
  - name: "ramshorn-001.png"
    alt: "Simulation of Ramshorn-Like Shell"
    caption: "Simulation of Ramshorn-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ramshorn-002.png"
    alt: "Simulation of Ramshorn-Like Shell"
    caption: "Simulation of Ramshorn-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "ramshorn-003.png"
    alt: "Simulation of Ramshorn-Like Shell"
    caption: "Simulation of Ramshorn-Like Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
flared:
  - name: "flared-001.png"
    alt: "Simulation of Flared Shell"
    caption: "Simulation of Flared Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "flared-002.png"
    alt: "Simulation of Flared Shell"
    caption: "Simulation of Flared Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "flared-003.png"
    alt: "Simulation of Flared Shell"
    caption: "Simulation of Flared Shell"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Computational Shell Morphology

A small exploratory project investigating procedural shell generation using logarithmic spirals, swept apertures and simple growth rules.

The project began after a visit to the Oxford University Museum of Natural History and an observation that many shell forms can emerge from relatively small variations on a simple underlying mathematical model:

> Mollusc shells illustrate beautifully how diversity can arise from just a few variations on one simple mathematical model, encoded in the genes

At its core, the shell geometry is generated from the logarithmic spiral:

<pre>
r = ae^(b&theta;)
</pre>

Where:

- a controls the initial shell scale
- b controls the growth rate and tightness of coiling

The shell is treated as a record of growth. An elliptical aperture is swept along the spiral path, expanding over time and stitched into a continuous mesh surface.

Additional features can then be layered onto the basic geometry:

- Growth ribs via periodic aperture modulation
- Pigmentation banding
- Aperture lip flare
- Translucent shell rendering
- Internal chamber septa

The result is not intended as a strict biological simulation, but as an exploration of how relatively simple mathematical and geometric rules can generate complex natural forms.  That said, the use of logarithmic spirals here is not simply aesthetic or descriptive.

Many real molluscan shells grow by accretion at the aperture edge: new shell material is continuously added around the opening while the overall aperture shape remains broadly similar as the organism enlarges.

Under these conditions, growth becomes approximately self-similar:

- The shell expands continuously
- Proportions remain relatively stable
- Each new growth stage resembles a scaled version of earlier stages

This tends to produce shell geometries closely approximated by logarithmic spirals, where radial expansion is proportional to current size rather than occurring in fixed linear increments.

The logarithmic spiral therefore acts both as:

- A useful mathematical model of shell form
- And as a simplified representation of an underlying biological growth process

Real shells additionally reflect genetics, environment, biomechanics and ecological pressures, all of which can perturb or modify the underlying geometric pattern.

## Core Modelling Concepts

Although highly simplified, the shell models are built from several interacting developmental and geometric ideas.

### Logarithmic Growth

At the core of the model is the logarithmic spiral:

<pre>
r = ae^(b&theta;)
</pre>

This defines the overall shell growth path.

Changing the growth rate and coiling behaviour can dramatically alter the resulting shell morphology, producing tightly coiled forms, inflated whorls, open spirals, or rapidly expanding shells.

### Swept Apertures

The shell itself is generated by sweeping an elliptical aperture along the spiral growth path.

As the shell grows:

1. The aperture expands
2. The aperture rotates with the coiling direction
3. Consecutive aperture rings are stitched into a continuous mesh surface

Each aperture ring therefore represents a moment in the shell’s developmental history.

Changing aperture size and shape strongly influences:

- Shell inflation
- Whorl compression
- Coiling density
- Overall shell proportions

### Ornamentation and Pigmentation

Additional growth behaviours can be layered onto the base geometry.

These include:

- Growth ribs via periodic aperture modulation
- Pigmentation banding
- Aperture lip flare
- Shell wall thickness
- Transparent shell rendering

Separating shell geometry from ornamentation proved important, allowing smooth and strongly ornamented forms to emerge from the same underlying growth framework.

### Internal Structures

Some presets additionally generate simplified internal cephalopod shell structures.

#### Chamber Septa

Curved internal chamber walls are generated by constructing concave surfaces within selected aperture rings.

These structures divide the shell interior into a sequence of chambers reminiscent of cephalopod buoyancy chambers.

#### Siphuncle

A simplified siphuncle is modelled as a small tube passing through the chambered interior.

The siphuncle follows the shell’s growth trajectory and provides a simplified representation of the tube-like structure connecting chambered shell compartments.

### Morphospace Exploration

The project is intended less as a strict biological simulation and more as an exploration of shell morphospace.

Relatively small changes in:

- growth rate
- aperture geometry
- ornamentation
- shell inflation
- coiling behaviour

can generate dramatically different shell forms, ranging from nautilus-like and ammonite-like morphologies to more speculative open-coiled structures.

This reflects a broader theme running throughout the project:

complex natural forms can emerge from surprisingly simple underlying developmental rules.

## Example Shell Presets

The following shell presets explore how relatively small changes in growth and aperture geometry can generate dramatically different shell morphologies using variations in:

- Logarithmic growth rate
- Aperture scaling
- Coiling geometry
- Shell inflation
- Ornamentation (ribbing)
- Aperture flare
- Shell wall thickness

Although highly simplified, these presets demonstrate how a relatively small set of growth parameters can produce shell forms reminiscent of real molluscan and cephalopod shells.

## Nautilus-Like Shell

{% assign assets_path = site.assets_url | append: "/images/modelling/shells/" %}
{% include image-block.html images=page.nautilus assets=assets_path %}

The nautilus-like preset produces a tightly coiled, inflated shell with adjacent whorls in contact.

Characteristics:

- Smooth rounded whorl profile
- Relatively low expansion rate
- Planispiral coiling
- Broad inflated chambers
- Visible siphuncle and chamber septa

This form resembles extant chambered nautiluses, whose shells grow as expanding logarithmic spirals with internally partitioned buoyancy chambers.

The model demonstrates how relatively modest geometric rules can produce biologically recognisable cephalopod shell forms.

## Smooth Nautilus

{% include image-block.html images=page.smooth_nautilus assets=assets_path %}

The smooth nautilus variant removes geometric ribbing while retaining pigmentation banding and shell inflation.

Compared with the ornamented nautilus-like form:

- Shell growth appears calmer and more continuous
- The underlying logarithmic geometry becomes more visually apparent
- Pigmentation and curvature dominate the visual texture

This preset highlights the distinction between:

- Shell geometry
- Shell ornamentation
- Shell pigmentation

which are treated separately within the model.

## Ammonite-Like Shell

{% include image-block.html images=page.ammonite assets=assets_path %}

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

## Ramshorn-Like Shell

{% include image-block.html images=page.ramshorn assets=assets_path %}

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

## Flared Shell

{% include image-block.html images=page.flared assets=assets_path %}

The flared shell preset intentionally explores more open and exaggerated shell geometries.

Characteristics:

- Rapidly expanding aperture
- Separated whorls
- Open spiral growth
- Dramatic terminal flare
- Loosely coiled geometry

Unlike the more biologically conservative presets, this form acts as an exploration of the shell generator’s morphospace.

The resulting geometry resembles aspects of:

- Vermetid shells
- Juvenile uncoiled gastropods
- Speculative or transitional shell forms

and demonstrates how altering aperture expansion can fundamentally change shell architecture.

Interestingly, once whorl abutment is relaxed, the shell begins to behave more like a continuously expanding tube traced through space rather than a tightly packed coil.

## Observations

An important aspect of logarithmic shell growth is self-similarity.

As the shell enlarges, the organism can continue growing without fundamentally changing its body geometry. Earlier shell stages therefore become preserved records of previous growth states, producing the characteristic coiled shell forms seen in many molluscs and cephalopods.

The project therefore treats shell form not simply as static geometry, but as accumulated developmental history emerging from iterative growth rules.

A recurring theme across these presets is that shell morphology emerges from the interaction between only a few core mechanisms:

1. Logarithmic radial growth
2. Aperture scaling
3. Coiling rate
4. Ornamentation modulation
5. Terminal aperture flare

Small parameter changes can produce disproportionately large morphological differences.

The project therefore acts not only as a graphics exercise, but also as a simplified exploration of computational natural history and developmental morphology.

In particular, separating:

- Growth trajectory
- Aperture geometry
- Ornamentation
- Pigmentation
- Internal shell structures

proved important both visually and conceptually.

This mirrors, in a highly simplified way, the layered processes involved in real biological shell formation.


{% include logspiral-invitation.html %}
