---
layout: post
title: "From DNA Sequences to Evolutionary Trees"
date: 2026-07-09 00:00:01
categories: [field-notes]
tags: [molecular-evolution, phylogenetics, molecular-clock, upgma, computational-natural-history, genetics]
excerpt: "Implementing UPGMA completes the project’s first end-to-end phylogenetic workflow, transforming simulated DNA sequences into reconstructed evolutionary trees."
assets: "/images/blog/"
series: "Molecular Clock Simulation"
series_order: 3
upgma:
    name: "upgma-strict-hky85.png"
    alt: "Phylogenetic Tree Reconstructed From Estimated Evolutionary Distances"
    caption: "Phylogenetic Tree Reconstructed From Estimated Evolutionary Distances"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

When this project began, I imagined building a molecular clock would mostly involve writing one interesting algorithm.

Instead, it has unfolded as a sequence of connected ideas, each making the next one possible.

First came the simulation of DNA sequence evolution. Then the problem of estimating evolutionary distance. That led naturally to substitution models, each trying to account for the mutations that are no longer directly visible in present-day sequences.

This week, those pieces finally came together, as the project can now reconstruct its first phylogenetic trees.

{% include fullwidth-image.html assets=page.assets img=page.upgma %}

The algorithm is UPGMA (Unweighted Pair Group Method with Arithmetic Mean), one of the classic methods for building evolutionary trees from a distance matrix.

It isn’t the most sophisticated approach available. Its assumption of a constant evolutionary rate means it isn’t appropriate for every biological dataset.

That simplicity, however, is exactly what makes it such a good place to begin.

One of the themes running through this project has been that understanding usually comes from seeing how one idea leads naturally to the next. UPGMA does exactly that. It takes the corrected evolutionary distances produced by the substitution models and turns them into something recognisably biological: a hypothesis about how the sequences are related.

Perhaps the most satisfying part has been seeing the whole pipeline operate from beginning to end.

- A simulated evolutionary history produces DNA sequences
- Those sequences are compared to estimate evolutionary distances
- Those distances are corrected using different substitution models
- Finally, the corrected distances are used to reconstruct an evolutionary tree

None of those individual stages feels especially remarkable on its own. Taken together, though, they form something that is beginning to resemble a genuine computational investigation rather than a collection of disconnected demonstrations.

The project still has plenty of room to grow. More sophisticated reconstruction methods such as neighbour joining lie ahead, along with calibration, confidence estimates and other aspects of modern phylogenetics.

But reaching this point feels significant.

For the first time, the project can follow the same broad path as a real phylogenetic analysis: from DNA sequences to an inferred evolutionary history.

More importantly, I now understand why each stage exists.

That, more than the software itself, feels like the real achievement.

{% include molecular-clock-invitation.html %}