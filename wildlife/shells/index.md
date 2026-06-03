---
layout: default
title: Computational Shell Morphology
description: Explorations of shell growth, coiling geometry, and biological morphospace using logarithmic spirals, swept apertures, and procedural natural history models
breadcrumb: Computational Shell Morphology
permalink: /wildlife/shells/
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

## Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.morphology.chapters %}
            <tr>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Acknowledgements

This work was inspired by the mathematics of logarithmic shell growth and by the broader traditions of theoretical morphology and computational natural history, particularly the work of D’Arcy Wentworth Thompson and David Raup.

The models, visualisations and implementations presented here were developed specifically for this project.

For the historical and theoretical background, see, please see the section on [Background and Historical Context]({% link wildlife/shells/background.md %})

{% include logspiral-invitation.html %}
