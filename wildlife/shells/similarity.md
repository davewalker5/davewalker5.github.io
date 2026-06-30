---
layout: default
title: Morphological Shell Similarity
description: Comparing computational shell models by quantifying morphological similarity from their classification characteristics
breadcrumb: Morphological Shell Similarity
assets: "/images/modelling/shells/"
series: morphology
chapter: 19
similarity_matrix:
   name: "similarity-matrix.png"
   alt: "Pairwise morphological similarity between computational shell models"
   caption: "Pairwise morphological similarity between computational shell models"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
similarity_dendrogram:
   name: "similarity-dendrogram.png"
   alt: "Hierarchical clustering of the computational shell models based on morphological similarity"
   caption: "Hierarchical clustering of the computational shell models based on morphological similarity"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Morphological Shell Similarity

## Overview

Once every shell could be described using a common set of morphological characteristics, it became possible to compare those descriptions quantitatively.

Rather than comparing rendered images or analysing mesh geometry directly, the similarity analysis compares the classification metadata associated with each shell.

Each shell therefore occupies a position within a computational morphospace defined by its observable characteristics.

{% include fullwidth-image.html assets=page.assets img=page.similarity_matrix %}

## Measuring Similarity

Each shell classification consists of a number of independent characteristics describing features such as:

- biological family
- growth geometry
- overall shell form
- coiling style
- umbilicus
- whorl contact
- shell axis
- spire development
- aperture morphology

For every pair of shells, matching characteristics contribute to an overall similarity score.

The result is expressed as a percentage ranging from:

- 100% — identical classifications
- 0% — no shared characteristics

Because the comparison operates entirely on classification data, the results are deterministic and reproducible.

## Why use classification instead of geometry?

Two shells may appear visually similar for reasons unrelated to their underlying growth mathematics.

Equally, mathematically similar models may produce very different shell forms after parameter variation.

By comparing classifications rather than meshes, the analysis focuses on morphology rather than implementation.

This makes the comparison easier to interpret and avoids introducing geometric measures that may obscure the biological questions being explored.

## Natural Groupings

The resulting similarity matrix immediately reveals relationships between shell forms.

Several expected groupings emerge naturally:

- Orthocones cluster with annulated orthocones
- Ammonites cluster with serpenticones
- Nautilus variants are effectively identical
- Turritella variants form their own group
- Ramshorn shells lie close to ammonites through convergent planispiral morphology despite belonging to a different biological lineage

These relationships emerge directly from the recorded characteristics rather than being imposed beforehand.

{% include fullwidth-image.html assets=page.assets img=page.similarity_dendrogram %}

## Interpreting the Dendrogram

The dendrogram provides a hierarchical view of shell similarity.

Nearby branches represent shell forms sharing many morphological characteristics, while distant branches indicate progressively greater differences.

Importantly, the dendrogram does not represent evolutionary history.

Instead, it visualises morphological similarity alone.

This distinction allows convergent forms to appear close together even when their biological origins differ.

## A Computational Morphospace

Although developed primarily to organise the shell collection, the similarity analysis transforms the models into a small computational morphospace.

The project therefore moves beyond generating individual shell geometries towards investigating relationships between shell forms themselves.

As additional shell models are introduced, this morphospace will naturally expand, providing an increasingly rich framework for exploring computational shell morphology.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include logspiral-invitation.html %}
