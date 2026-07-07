---
layout: post
title: "Building a Molecular Clock from First Principles"
date: 2026-07-07 00:00:01
categories: [field-notes]
tags: [molecular-evolution, molecular-clock, phylogenetics, computational-natural-history, genetics, simulation, evolutionary-biology]
excerpt: "A new computational natural history project explores how molecular clocks and phylogenetic trees can be understood by building each component from first principles."
assets: "/images/blog/"
explorer:
   name: "relaxed-clock-explorer.png"
   alt: "Relaxed Molecular Clock Explorer"
   caption: "Relaxed Molecular Clock Explorer"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

One of the pleasures of Field Notes is discovering that an apparently straightforward question is anything but. A few weeks ago I began wondering whether I could model a molecular clock.

At first glance it seemed like a single algorithm. Feed in some DNA sequences, perform a little mathematics, and out would come an evolutionary tree.

The more I read, however, the more I realised that a molecular clock is really the culmination of a chain of ideas, each building naturally upon the last:

- Distance matrices
- Substitution models
- Tree reconstruction
- Clock models
- Rate variation
- Calibration

Rather than treating these as black boxes, I decided to take the same approach that has worked well for several other projects on Field Notes: build each component individually, understand what it does, and only then move on to the next.

That has proved surprisingly rewarding.

One of the first things that surprised me was learning that substitution models are not mysterious optimisation techniques operating somewhere inside a phylogenetic algorithm. Instead, they answer a remarkably focused question.

> Given the differences we observe between two DNA sequences today, how much evolutionary change has probably occurred?

Even the simplest model, Jukes-Cantor, turns out not to be replacing one algorithm with another. It is simply correcting an observed genetic distance to account for mutations that have been hidden by later changes at the same position.

That small realisation made several later ideas suddenly make much more sense.

{% include fullwidth-image.html assets=page.assets img=page.explorer %}

The project has gradually grown into a collection of small tools and interactive visualisations that explore these concepts individually. There are simulations of strict and relaxed molecular clocks, interactive explorers for experimenting with evolutionary rates, and tools for calculating genetic distances under different assumptions.

None of these components is especially complicated in isolation.

Together, however, they are beginning to form something that feels rather satisfying: not simply software that produces phylogenetic trees, but a computational notebook for understanding why those trees look the way they do.

It still feels too early to give the project a permanent home within Field Notes. There is a great deal left to explore before that feels justified.

Next on the list is tree reconstruction itself, beginning with UPGMA before moving on to more sophisticated approaches.

But the direction now feels clear enough that it seemed worth making a note of the journey.

After all, one of the themes running through Field Notes has been that computation can become another way of studying natural history. Sometimes that means modelling the geometry of shells. Sometimes it means exploring the growth of stromatolites.

Sometimes it means asking what the history of life looks like when it is written, not in fossils, but in DNA.

{% include molecular-clock-invitation.html %}
