---
layout: default
title: Estimating Evolutionary Time
breadcrumb: Estimating Evolutionary Time
description: Converting reconstructed phylogenetic trees into estimated geological timescales using molecular clock calibration and fossil evidence
series: molecular_clock
chapter: 4
assets: "/images/molecularclock/"
workflow:
   name: "tree-calibration.png"
   alt: "Workflow illustrating the calibration of a reconstructed phylogenetic tree using geological age constraints"
   caption: "A reconstructed phylogenetic tree is anchored to geological time using a calibration point, allowing branch lengths to be interpreted as estimated evolutionary time rather than accumulated genetic change"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
calibrated_tree:
   name: "calibrated_tree_hky85_nj.png"
   alt: "Time-calibrated phylogenetic tree with branch lengths expressed as estimated evolutionary time"
   caption: "After calibration, the phylogenetic tree retains the same branching relationships, but branch lengths are expressed as estimated evolutionary time rather than substitutions per site"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Estimating Evolutionary Time

By the end of the previous chapter we have reconstructed the evolutionary relationships between a collection of organisms.

The resulting phylogenetic tree tells us **how species are related**, but it does not tell us **when** those evolutionary divergences occurred.

A branch length measured in substitutions per site represents accumulated genetic change rather than geological time. Although two branches may differ by 0.05 substitutions per site, that value alone cannot tell us whether the divergence occurred thousands, millions or tens of millions of years ago.

Estimating evolutionary time therefore requires one additional source of information beyond the DNA sequences themselves.

## Relative Evolutionary Change

The branch lengths produced by reconstruction algorithms represent **relative evolutionary change**.

For example, a branch length of:

```
0.05 substitutions per site
```

indicates that, on average, approximately five substitutions have accumulated for every hundred nucleotide positions.

This is a perfectly meaningful measure of evolutionary divergence, but it is **not** a date.

Without knowing how rapidly substitutions accumulated, there is no way to convert genetic change into years.

## Fossils as Evolutionary Anchors

The missing information comes from outside the DNA.

Fossils provide independent evidence that particular evolutionary lineages already existed at specific points in geological history.

Suppose a fossil belonging to one evolutionary lineage has been reliably dated to 80 million years ago.

That fossil demonstrates that the lineage must already have diverged by that time.

Although fossils rarely provide the exact age of an evolutionary split, they provide valuable calibration points that anchor molecular evolution to geological time.

By combining molecular evidence with fossil evidence, it becomes possible to estimate the timing of evolutionary divergences throughout the tree.

## Calibrating the Molecular Clock

The basic idea behind calibration is straightforward.

If one point within a reconstructed tree can be assigned an approximate geological age, the relationship between genetic change and elapsed time can be estimated.

Once that relationship has been established, the remaining branch lengths can be converted from substitutions per site into estimated millions of years.

In effect, fossil evidence provides the scale that transforms a relative evolutionary tree into a geological timeline.

{% include fullwidth-image.html assets=page.assets img=page.workflow %}

## A Simplified Educational Example

Modern molecular dating is a sophisticated statistical problem involving multiple fossil constraints, uncertainty estimates and models of changing evolutionary rates.

The implementation developed for this project deliberately adopts a much simpler approach so that the underlying principle remains easy to understand.

The calibration procedure uses:

- A single calibration point;
- An assumed divergence age;
- A single global scaling factor; and
- A constant evolutionary rate throughout the tree.

Suppose a reconstructed tree estimates that a particular common ancestor lies:

```
0.08 substitutions per site
```

from its descendant taxa.

If fossil evidence suggests that this divergence occurred approximately:

```
20 million years ago
```

then one unit of evolutionary change corresponds to:

```
20 / 0.08 = 250 million years
```

This value becomes the scaling factor for the entire tree.

Every branch length is multiplied by this factor, converting the reconstructed tree from relative evolutionary change into estimated geological time.

{% include fullwidth-image.html assets=page.assets img=page.calibrated_tree %}

The topology of the tree remains unchanged.

Only the units used to measure branch lengths are modified.

## Why Real Molecular Dating Is More Complex

Although the simplified approach illustrates the principle clearly, real molecular dating is considerably more sophisticated. Modern analyses typically combine:

- Multiple fossil calibration points;
- Uncertainty in fossil ages;
- Varying evolutionary rates between lineages;
- Statistical models of sequence evolution; and
- Bayesian methods that estimate divergence times and evolutionary rates simultaneously.

Rather than producing a single date for each evolutionary event, these methods often estimate a range of probable divergence times together with their associated uncertainties.

These approaches lie beyond the scope of this project but all build upon the same central idea: combining molecular evidence with independent geological information.

## Why Use a Simplified Calibration?

The purpose of the Molecular Clock Simulation project is not to produce publication-quality divergence estimates.

Instead, it aims to illustrate the final step in the molecular clock workflow.

Beginning with simulated DNA sequence evolution, the project has followed the complete journey through computational molecular evolution:

- Simulating DNA sequence evolution;
- Measuring genetic distance;
- Eeconstructing evolutionary relationships; and
- Estimating evolutionary time through fossil calibration.

Together these stages demonstrate how molecular evidence can be transformed into an evidence-based hypothesis about the history of life.

The calibration method presented here is intentionally simple, but it captures the essential idea that underpins modern molecular dating: molecular evolution provides relative evolutionary change, fossil evidence provides absolute geological time, and calibration connects the two.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include molecular-clock-invitation.html %}
