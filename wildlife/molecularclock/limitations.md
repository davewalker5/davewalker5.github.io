---
layout: default
title: Models, Assumptions and Reality
breadcrumb: Models, Assumptions and Reality
description: Understanding the assumptions behind computational molecular evolution and how simple educational models relate to modern phylogenetic methods
series: molecular_clock
chapter: 5
---

# Models, Assumptions and Reality

Throughout this project we have built a series of progressively more sophisticated computational models, beginning with simple simulations of DNA sequence evolution and ending with calibrated phylogenetic trees.

At every stage the emphasis has been on understanding the underlying biological principles rather than reproducing the full complexity of modern phylogenetic research.

Every model presented here therefore makes assumptions and deliberately simplifies aspects of molecular evolution. These simplifications are not shortcomings. They are choices that allow the essential ideas to remain visible while illustrating how increasingly realistic models improve our understanding of evolutionary history.

## Scientific Models Are Simplifications

Every scientific model is an approximation.

A useful model does not attempt to reproduce every detail of reality. Instead, it isolates the processes that are most important for answering a particular question.

Throughout this project each successive model has relaxed one or more assumptions made by its predecessor. Rather than replacing earlier models, these refinements demonstrate why increasingly sophisticated methods are needed as biological realism increases.

Understanding the assumptions behind a model is therefore just as important as understanding how the model itself operates.

## Assumptions in Sequence Simulation

The sequence simulations developed for this project intentionally represent only the most important processes involved in molecular evolution.

Among the principal assumptions are:

- DNA evolves only through nucleotide substitution
- Sites evolve independently of one another
- Insertions and deletions are ignored
- Recombination is not modelled
- Selection and population-level processes are omitted

Despite these simplifications, the simulations capture the essential process through which inherited DNA sequences gradually accumulate evolutionary differences over time.

## Assumptions in Genetic Distance Models

The distance models introduced in this project demonstrate how increasingly realistic assumptions improve estimates of evolutionary divergence.

The simplest approaches merely count observed sequence differences, while later models account for hidden substitutions, unequal nucleotide frequencies and differing probabilities of particular mutation types.

Even the most sophisticated models presented here remain simplified descriptions of molecular evolution.

As evolutionary divergence increases, repeated substitutions at individual nucleotide positions gradually erase historical information. Eventually the observed DNA sequences no longer contain sufficient information to estimate evolutionary distance reliably, a phenomenon known as **sequence saturation**.

## Assumptions in Phylogenetic Reconstruction

The reconstruction algorithms explored in this project also embody important assumptions.

UPGMA assumes that all evolutionary lineages accumulate substitutions at approximately the same rate, allowing genetic distance to be interpreted directly as evolutionary time.

Neighbour Joining removes this molecular clock assumption and generally performs better when evolutionary rates vary between lineages.

Neither approach attempts to model the complete evolutionary process. Instead, both infer phylogenetic relationships using pairwise genetic distances derived from the observed DNA sequences.

Understanding the assumptions behind each reconstruction method is an essential part of interpreting the resulting trees.

## Assumptions in Molecular Clock Calibration

The calibration method implemented for this project is intentionally straightforward. It assumes:

- A single calibration point
- An exact geological age
- A single evolutionary rate across the entire tree
- No uncertainty in either branch lengths or fossil ages

These assumptions allow the principle of molecular clock calibration to be demonstrated clearly without introducing unnecessary statistical complexity.

## Beyond This Project

Modern phylogenetic inference has developed far beyond the methods explored here.

Contemporary analyses commonly employ:

- Multiple fossil calibration constraints
- Complex substitution models
- Insertion and deletion models
- Likelihood-based tree reconstruction
- Bayesian inference
- Relaxed molecular clocks with variable evolutionary rates
- Statistical estimation of uncertainty

Software such as _BEAST_, _MrBayes_ and _IQ-TREE_ can simultaneously estimate evolutionary relationships, substitution parameters, divergence times and confidence intervals using sophisticated probabilistic methods.

These techniques are powerful, but they also conceal much of the underlying reasoning behind layers of mathematical and computational complexity.

## Why Stop Here?

The aim of the Molecular Clock Simulation project has never been to reproduce the capabilities of modern phylogenetic software.

Instead, it has been to understand the sequence of ideas that makes molecular evolutionary inference possible.

Beginning with simulated DNA sequence evolution, the project has explored how genetic differences arise, how those differences can be measured, how they can be transformed into evolutionary trees and finally how those trees can be placed on a geological timescale using fossil evidence.

By the end of this process the essential conceptual framework of computational molecular evolution is complete.

More sophisticated methods extend and refine these ideas rather than replacing them.

## Looking Back

Computational models occupy an increasingly important place within modern biology. They allow hypotheses to be explored, assumptions to be tested and complex biological processes to be understood in ways that would otherwise be difficult to observe directly.

The models presented throughout this project are deliberately simple, but they illustrate a broader principle that extends well beyond molecular evolution. Understanding begins not by building the most complicated model possible, but by building the simplest model capable of answering the question being asked.

Every refinement then becomes an opportunity to ask a deeper question about the natural world.

That philosophy underpins not only this project, but the wider approach to computational natural history explored throughout Field Notes.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include molecular-clock-invitation.html %}
