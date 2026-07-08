---
layout: post
title: "Learning to Measure Evolution"
date: 2026-07-08 00:00:01
categories: [field-notes]
tags: [molecular-evolution, molecular-clock, phylogenetics, substitution-models, computational-natural-history, genetics]
excerpt: "Building successive substitution models has revealed that evolutionary distance is not a single quantity but an estimate shaped by our assumptions about how DNA changes over time."
assets: "/images/blog/"
series: "Molecular Clock Simulation"
series_order: 2
explorer:
   name: "distance-matrix-explorer.png"
   alt: "Distance Matrix Explorer"
   caption: "The Distance Matrix Explorer compares pairs of DNA sequences using several different substitution models"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

When I began building a molecular clock, I assumed that estimating evolutionary distance would be a fairly mechanical exercise. Compare two DNA sequences, apply a mathematical correction, and move on to constructing the phylogenetic tree.

Instead, I've spent the past day or two discovering that the correction is where much of the biology lives.

The project now implements several classic substitution models. On the surface they all answer the same question:

> Given two DNA sequences today, how much evolutionary change probably separates them?

The interesting part is that each model answers that question by making different assumptions about how mutations occur.

Some assume that every nucleotide is equally common. Others recognise that genomes often contain unequal proportions of A, C, G and T. Some distinguish between transitions and transversions, reflecting the observation that not all mutations occur with the same frequency.

Each model isn't simply "better" than the last. Each is an attempt to describe a little more of the underlying biology.

{% include fullwidth-image.html assets=page.assets img=page.explorer %}

One of the more satisfying additions has been a small Distance Analysis Explorer. Rather than producing a table of numbers, it allows different substitution models to be applied to the same pair of DNA sequences and compares the resulting estimates of evolutionary distance.

Seeing the models side by side makes something much clearer than reading the equations alone: they all begin with the same observations, but interpret those observations in subtly different ways.

Perhaps the biggest surprise has been how these models have changed my own understanding.

When I first encountered substitution models, I imagined they were sophisticated algorithms hidden somewhere inside phylogenetic tree reconstruction. In reality, they perform a much more focused task. They estimate how much evolutionary change has been hidden by the fact that DNA positions can mutate more than once over long periods of time.

That simple realisation has made everything that follows feel much more intuitive.

The project has also reminded me that learning often progresses by questioning assumptions rather than accumulating features.

I originally expected to move fairly quickly from sequence simulation to tree reconstruction. Instead, each stage has revealed another idea that seemed worth understanding before moving on. Those diversions have proved anything but distractions; they've gradually built a much clearer picture of how the whole process fits together.

UPGMA and the first tree-building algorithms are now next on the list.

But for the first time, I feel as though I understand why those algorithms need corrected evolutionary distances in the first place.

And that feels like genuine progress.

{% include molecular-clock-invitation.html %}