---
layout: default
title: Measuring Genetic Distance
breadcrumb: Measuring Genetic Distance
description: From simple sequence comparisons to evolutionary distance models that account for hidden molecular change
series: molecular_clock
chapter: 2
assets: "/images/molecularclock/"
explorer:
   name: "distance-matrix-explorer.png"
   alt: "Distance Matrix Explorer"
   caption: "Pairwise genetic distances between simulated DNA sequences, visualised as a colour-coded distance matrix"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Measuring Genetic Distance

Once DNA sequences have been simulated, the next question is deceptively simple:

> **How different are they?**

At first glance the answer appears obvious. We could simply compare two sequences nucleotide by nucleotide and count the positions at which they differ.

In practice, however, this simple comparison tells only part of the story. DNA sequences preserve the history of evolution imperfectly. Over long periods of time, individual nucleotide positions may mutate more than once, causing some evolutionary change to become hidden from direct observation.

Measuring genetic distance is therefore not simply a matter of counting differences. It requires us to estimate how much evolution has occurred, given the molecular evidence that remains.

## Comparing DNA Sequences

Genetic distance begins with an aligned set of DNA sequences representing the organisms under study.

Each sequence is compared with every other sequence, examining corresponding nucleotide positions one at a time.

Some positions are identical, reflecting shared ancestry. Others differ, indicating that one or more mutations have occurred since the two organisms diverged from their common ancestor.

These pairwise comparisons form the foundation of every distance-based phylogenetic method.

## Hamming Distance

The simplest measure of genetic difference is the Hamming distance.

This simply counts the number of nucleotide positions at which two aligned sequences differ.

For closely related organisms, this provides an intuitive measure of sequence similarity.

Its limitation is equally straightforward: every observed difference is counted equally, regardless of how many mutations may actually have occurred.

## Proportional Distance

Rather than reporting the absolute number of differences, proportional distance expresses divergence as the fraction of positions that differ.

A proportional distance of 0.02, for example, indicates that approximately two percent of nucleotide positions differ between the two sequences.

This provides a convenient measure of observed sequence divergence, but it still assumes that every observed difference represents exactly one evolutionary change.

## Hidden Evolutionary Change

As evolutionary time increases, that assumption begins to fail.

A nucleotide may mutate from A to G and later return to A, leaving no observable difference despite two mutations having occurred.

Alternatively, a nucleotide might change several times before ending in a different state. Although multiple substitutions have taken place, only a single difference is visible in the present-day sequences.

These hidden substitutions cause simple observed distances to underestimate the true amount of evolutionary change.

This effect becomes increasingly important as sequences diverge over longer evolutionary timescales.

## Correcting for Multiple Substitutions

Substitution models attempt to compensate for these hidden evolutionary changes.

Rather than treating the observed differences as the complete history, they use simple models of sequence evolution to estimate how many substitutions are likely to have occurred.

Each model incorporates different biological assumptions.

### Jukes-Cantor (JC69)

The Jukes-Cantor model assumes that all four nucleotides occur equally frequently and that every possible substitution is equally likely.

Although highly simplified, it provides the first correction for multiple substitutions and illustrates why observed differences increasingly underestimate evolutionary change.

### Kimura Two-Parameter (K80)

Kimura recognised that not all mutations occur with equal frequency.

Transitions (A↔G and C↔T) often occur more readily than transversions between different nucleotide classes.

By accounting for this asymmetry, the K80 model generally provides more realistic estimates of evolutionary divergence.

### Felsenstein 1981 (F81)

Real DNA sequences rarely contain equal proportions of A, C, G and T.

The F81 model extends Jukes-Cantor by allowing unequal nucleotide frequencies while retaining otherwise simple substitution assumptions.

### Hasegawa-Kishino-Yano (HKY85)

HKY85 combines the principal improvements introduced by the previous models.

It allows both unequal nucleotide frequencies and different rates for transitions and transversions, producing a more biologically realistic estimate of evolutionary distance while remaining relatively straightforward to understand.

## Sequence Saturation

Every substitution model has limits.

As sequences become increasingly divergent, multiple substitutions at individual nucleotide positions become so common that much of the original evolutionary signal is lost.

Eventually, observed sequence differences no longer contain enough information to estimate evolutionary distance reliably.

This phenomenon, known as **sequence saturation**, represents one of the fundamental limitations of molecular evolutionary inference.

## Building a Distance Matrix

{% include fullwidth-image.html assets=page.assets img=page.explorer %}

Once every pair of sequences has been compared, the calculated distances are organised into a distance matrix.

Each row and column corresponds to one taxon, while each cell records the estimated evolutionary distance between the corresponding pair of organisms.

This matrix provides the starting point for the next stage of the project: reconstructing an evolutionary tree.

## From Sequences to Evolutionary History

The progression of distance measures illustrates an important theme running throughout computational molecular evolution.

Each successive model attempts to compensate for a biological simplification made by the previous one.

Rather than simply counting differences, they progressively incorporate more realistic assumptions about how DNA evolves, producing estimates that more closely reflect the underlying evolutionary history.

The next chapter explores how these pairwise distances can be transformed into a phylogenetic tree representing the evolutionary relationships between species.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include molecular-clock-invitation.html %}
