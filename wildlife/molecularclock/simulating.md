---
layout: default
title: Simulating Molecular Evolution
breadcrumb: Simulating Molecular Evolution
description: Simulating DNA sequence evolution under strict and relaxed molecular clocks to explore how evolutionary history becomes encoded in molecular data
series: molecular_clock
chapter: 1
assets: "/images/molecularclock/"
workflow:
  name: "clock-simulation-workflow.png"
  alt: "Molcecular Clock Simulation Workflow"
  caption: "Molcecular Clock Simulation Workflow"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Simulating Molecular Evolution

Every living organism inherits its DNA from its ancestors. Over evolutionary time that DNA gradually changes as mutations accumulate, producing the genetic similarities and differences that allow evolutionary relationships to be reconstructed.

The challenge for molecular evolutionary biology is that we can only observe the sequences that exist today. The common ancestors, the historical mutations and the true evolutionary tree have all disappeared into the past.

Simulation provides a way to overcome this limitation.

Instead of attempting to infer evolutionary history from real DNA, we begin with a known history and allow DNA sequences to evolve along it. Because every stage of the process is under our control, the complete evolutionary history remains known throughout the simulation. This "ground truth" allows reconstruction methods to be explored and evaluated against the correct answer.

{% include fullwidth-image.html assets=page.assets img=page.workflow %}

The simulations developed for this project deliberately favour clarity over biological realism. Their purpose is not to reproduce every aspect of molecular evolution, but to illustrate the fundamental ideas that underpin molecular clocks and phylogenetic inference.

## From Ancestor to Descendants

Every simulation begins with a single ancestral DNA sequence representing the common ancestor of all the organisms in the study.

A branching evolutionary tree is then constructed. Each branch represents an independent evolutionary lineage, while the tips of the tree represent present-day species.

DNA evolves from the root towards the tips of the tree. At every branching event, each descendant inherits a copy of its parent's sequence before accumulating its own mutations independently.

Over time, the descendants gradually diverge from one another, producing the genetic variation that later allows evolutionary relationships to be inferred.

## Simulating Mutation

Mutation is modelled as a series of nucleotide substitutions occurring as DNA passes along each evolutionary branch.

Most nucleotides remain unchanged. Occasionally, however, a nucleotide is replaced by another, introducing a new genetic difference into one lineage.

Although greatly simplified, this captures the central idea of molecular evolution: inherited DNA sequences gradually accumulate changes over time while retaining evidence of their shared ancestry.

The simulator records every substitution as it occurs, preserving the complete mutational history of every branch.

## Strict Molecular Clocks

The simplest molecular clock assumes that every evolutionary lineage accumulates mutations at the same average rate.

Under this assumption, equal amounts of evolutionary time produce approximately equal amounts of genetic change. If two branches have the same duration, they are expected to accumulate similar numbers of substitutions.

This produces an ultrametric tree, in which every present-day species lies the same evolutionary distance from their common ancestor.

Although real biological evolution is rarely this regular, the strict molecular clock provides an ideal starting point for understanding molecular evolution.

## Relaxed Molecular Clocks

Real organisms rarely evolve at identical rates.

Generation times, population sizes, life histories and selective pressures all influence how rapidly mutations accumulate. Some lineages evolve relatively slowly, while others change more rapidly.

Relaxed molecular clocks acknowledge this variation by allowing each branch of the tree to evolve at its own rate.

In the simulations presented here, daughter lineages inherit mutation rates similar to those of their ancestors, while allowing gradual stochastic variation between generations. Closely related lineages therefore tend to evolve at comparable rates without being identical.

This produces trees in which equal periods of evolutionary time can correspond to different amounts of genetic change.

Understanding this distinction between time and accumulated genetic change is one of the central ideas behind relaxed molecular clocks.

## Why Simulate Evolution?

One of the advantages of simulation is that the correct evolutionary history is always known.

For every dataset we know:

- the ancestral DNA sequence;
- every mutation that occurred;
- the true phylogenetic tree;
- the evolutionary time represented by every branch; and
- the mutation rate associated with every lineage.

Real biological datasets never provide this information. Simulation therefore offers a unique opportunity to understand how molecular evolutionary methods behave under controlled conditions before applying them to real organisms.

The chapters that follow build on these simulated datasets, exploring how genetic differences are measured, how phylogenetic trees are reconstructed and how fossil evidence can be used to estimate evolutionary timescales.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include molecular-clock-invitation.html %}
