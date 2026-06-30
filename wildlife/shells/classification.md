---
layout: default
title: Computational Shell Classification
description: A descriptive framework for recording and comparing the morphology of computational shell models
breadcrumb: Computational Shell Classification
assets: "/images/modelling/shells/"
series: morphology
chapter: 18
---

# Computational Shell Classification

## Overview

As the collection of shell models expanded, it became increasingly useful to describe each shell using a consistent set of morphological characteristics rather than relying solely on its name or underlying implementation.

Each shell model is therefore accompanied by a computational classification recording its biological inspiration, growth geometry and observable morphology.

The aim is not to reproduce formal biological taxonomy, but to provide a consistent descriptive vocabulary that allows shell forms to be compared objectively.

## Why classify shells?

Several shell models may share a similar appearance while being generated using different mathematical growth models.

Conversely, a single computational growth model may produce a wide range of different shell forms simply by varying its parameters.

Separating these ideas allows each shell to be described from several complementary perspectives:

- its broad biological affinity
- the mathematical growth model used to generate it
- its overall morphology
- the specific features that distinguish it from related forms

This distinction reflects the wider philosophy of the project: separating implementation from observable morphology.

## The classification hierarchy

Each shell is described using a small number of independent characteristics.

### Biological family

The broad biological group that inspired the shell, for example:

- Ammonoid
- Nautiloid
- Orthoceratoid
- Gastropod

### Growth geometry

The mathematical model used to generate the shell.

Examples include:

- Logarithmic spiral
- Centreline conical growth
- Helical conical growth

### Morphological characteristics

Additional descriptors record observable shell form, including:

- Overall form
- Coiling style
- Umbilicus
- Whorl contact
- Growth axis
- Spire development
- Aperture morphology

Because each characteristic is recorded independently, the system can naturally accommodate new shell forms as they are added.

| Shell      | geometry           | family        | form         | coiling     | umbilicus | whorl_contact | axis     | spire | aperture |
| ---------- | ------------------ | ------------- | ------------ | ----------- | --------- | ------------- | -------- | ----- | -------- |
| nautilus   | log-spiral         | nautiloid     | nautiliconic | planispiral | narrow    | overlapping   |          |       |          |
| orthocone  | centreline-conical | orthoceratoid | orthoconic   | none        |           |               | straight |       |          |
| turritella | log-spiral         | gastropod     | turriform    | high-spired |           | stacked       |          | high  |          |

## Why independent descriptors?

Rather than forcing every shell into rigid categories, each characteristic records one observable aspect of the morphology.

This has several advantages.

- New shell types can be introduced without redesigning the classification system
- Similarities between otherwise unrelated shells become easier to identify
- Computational growth mathematics remains separate from biological appearance

The result is a flexible description of shell morphology that supports both organisation of the project and subsequent comparative analysis.

## Beyond organisation

The classification system originally arose as a convenient way of organising an expanding collection of shell presets.

It has since become something more useful.

Because every shell is described using the same vocabulary, the classifications provide a consistent dataset from which quantitative comparisons between shell forms can be made.

That observation naturally led to the next stage of the project: _Morphological Similarity Analysis_.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
