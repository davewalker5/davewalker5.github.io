---
layout: default
title: Reconstructing Evolutionary Trees
breadcrumb: Reconstructing Evolutionary Trees
description: Reconstructing phylogenetic trees from genetic distance matrices using distance-based evolutionary methods
series: molecular_clock
chapter: 3
assets: "/images/molecularclock/"
workflow:
  name: "phylogenetic-reconstruction.png"
  alt: "Workflow showing the progression from DNA sequence simulation to genetic distance measurement and phylogenetic reconstruction"
  caption: "Simulated DNA sequences are compared to produce a genetic distance matrix, which forms the basis for reconstructing an evolutionary tree"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
upgma:
  name: "reconstructed_tree_hky85_upgma.png"
  alt: "Phylogenetic tree reconstructed using the UPGMA algorithm"
  caption: "UPGMA reconstructs a rooted ultrametric tree by assuming that all evolutionary lineages accumulate genetic change at approximately the same rate"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
nj:
  name: "reconstructed_tree_hky85_nj.png"
  alt: "Phylogenetic tree reconstructed using the Neighbour Joining algorithm"
  caption: "Neighbour Joining reconstructs an unrooted phylogenetic tree without assuming a constant molecular clock, allowing evolutionary rates to vary between lineages"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---
# Reconstructing Evolutionary Trees

By the end of the previous chapter we have transformed a collection of DNA sequences into a distance matrix describing the estimated evolutionary divergence between every pair of organisms.

The question that remains is perhaps the most important of all:

> **How can we reconstruct an evolutionary tree from these pairwise distances?**

Distance-based reconstruction algorithms attempt to answer this question by finding the tree that best explains the observed pattern of genetic similarities and differences between species.

Although the mathematics can become sophisticated, the underlying idea is remarkably intuitive. Closely related organisms should appear close together in the reconstructed tree, while more distantly related organisms should branch apart earlier in evolutionary history.

## From Distances to Relationships

A distance matrix tells us how different every pair of DNA sequences appears to be, but it does not directly tell us how those organisms are related.

Instead, reconstruction algorithms examine the complete pattern of distances and search for an arrangement of branches that best explains those observations.

{% include fullwidth-image.html assets=page.assets img=page.workflow %}

This transformation from pairwise distances to an evolutionary tree represents one of the central ideas in computational phylogenetics.

## Two Different Assumptions

The Molecular Clock Simulation project explores two classic distance-based reconstruction methods:

- **UPGMA (Unweighted Pair Group Method with Arithmetic Mean)**
- **Neighbour Joining (NJ)**

Both algorithms begin with exactly the same distance matrix.

The difference lies entirely in the assumptions they make about evolution.

| UPGMA                                      | Neighbour Joining                            |
| ------------------------------------------ | -------------------------------------------- |
| Assumes a strict molecular clock           | Makes no molecular clock assumption          |
| Produces a rooted tree                     | Produces an unrooted tree                    |
| Always ultrametric                         | Branch lengths may differ                    |
| Best suited to constant evolutionary rates | Better suited to variable evolutionary rates |

Neither algorithm is universally "better". Their suitability depends on how closely the biological assumptions match the evolutionary history represented by the data.

## UPGMA

UPGMA is one of the simplest phylogenetic reconstruction algorithms.

Initially, every taxon is treated as an independent cluster.

The algorithm repeatedly identifies the two closest clusters, joins them into a new common ancestor, recalculates the distances to every remaining cluster and repeats the process until a single tree has been constructed.

The defining assumption of UPGMA is that every evolutionary lineage accumulates mutations at approximately the same rate.

Under this strict molecular clock, genetic distance becomes proportional to evolutionary time. Organisms separated by twice the genetic distance are assumed to have diverged approximately twice as long ago.

Because of this assumption, UPGMA always produces a rooted ultrametric tree in which every present-day species lies the same distance from the common ancestor.

{% include fullwidth-image.html assets=page.assets img=page.upgma %}

When the underlying evolutionary history genuinely follows a strict molecular clock, UPGMA is capable of reconstructing remarkably accurate trees from surprisingly simple calculations.

Its greatest strength, however, is also its principal limitation. If different evolutionary lineages accumulate mutations at different rates, the strict molecular clock assumption is no longer valid and the reconstructed tree may no longer represent the true evolutionary history.

## Neighbour Joining

Neighbour Joining begins with the same distance matrix but asks a subtly different question.

Rather than simply identifying the closest pair of taxa, it attempts to identify the pair that are most likely to be immediate evolutionary neighbours within the context of the entire dataset.

To achieve this, the algorithm adjusts each pairwise distance using information from every remaining taxon before deciding which pair should be joined.

This compensates for situations in which some lineages have accumulated substitutions more rapidly than others.

Unlike UPGMA, Neighbour Joining makes no assumption that evolutionary rates remain constant throughout the tree.

As a result, the reconstructed branches are free to vary in length, allowing the algorithm to accommodate unequal rates of molecular evolution.

The resulting tree is therefore **unrooted**. It describes patterns of evolutionary relationship without attempting to identify the position of the common ancestor or estimate divergence times.

{% include fullwidth-image.html assets=page.assets img=page.nj %}

When evolutionary rates differ substantially between lineages, Neighbour Joining generally produces a reconstruction that more closely reflects the underlying evolutionary history than UPGMA.

## Rooted and Unrooted Trees

One of the most important differences between the two reconstruction methods is the type of tree they produce.

A **rooted** tree identifies a common ancestor and therefore represents both evolutionary relationships and the direction of evolutionary time.

An **unrooted** tree contains the same branching relationships but does not identify where the common ancestor lies. It describes which organisms are closely related without specifying the direction in which evolution proceeded.

UPGMA produces rooted trees because its molecular clock assumption allows evolutionary distance to be interpreted as time.

Neighbour Joining reconstructs only the pattern of relationships, leaving the position of the root to be determined using additional biological evidence.

## Choosing a Reconstruction Method

Both algorithms illustrate an important principle in computational biology.

Phylogenetic reconstruction is not simply a matter of applying an algorithm to a dataset. Every reconstruction method embodies assumptions about how evolution has occurred.

When those assumptions are appropriate, relatively simple methods can recover remarkably accurate evolutionary relationships.

When the assumptions are violated, even mathematically correct algorithms may produce misleading trees.

Understanding these assumptions is therefore just as important as understanding the algorithms themselves.

## Looking Ahead

Reconstructing a phylogenetic tree tells us how species are related.

It does not tell us **when** those evolutionary divergences occurred.

The final chapter explores how fossil evidence can be combined with reconstructed phylogenetic trees to estimate evolutionary timescales through molecular clock calibration.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include molecular-clock-invitation.html %}
