---
layout: default
title: Computational Molecular Evolution
description: Explorations of molecular evolution, phylogenetic tree reconstruction and fossil calibration through computational models and interactive simulations
breadcrumb: Computational Molecular Evolution
permalink: /wildlife/molecularclock/
assets: "/images/molecularclock/"
reconstructed:
   name: "nj-hky85-reconstructed-comparison.png"
   alt: "Simulated evolutionary tree and the phylogenetic tree reconstructed from the simulated DNA sequences"
   caption: "Simulated evolutionary tree and the phylogenetic tree reconstructed from the simulated DNA sequences"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
explorer:
   name: "online-molecular-clock-explorer.png"
   alt: "Interactive Relaxed Molecular Clock Explorer"
   caption: "Interactive Relaxed Molecular Clock Explorer"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Computational Molecular Evolution

{% include fullwidth-image.html assets=page.assets img=page.reconstructed %}

Every living organism carries a record of its evolutionary past within its DNA. This project explores how biologists extract that history, using computational models to reconstruct relationships between species and estimate when they diverged.

This project explores that question through a series of computational models and interactive experiments that follow the complete journey from simulated DNA sequences to calibrated evolutionary trees.

Beginning with simple models of sequence evolution, the project gradually introduces increasingly realistic substitution models before examining how genetic distances can be used to infer evolutionary relationships and estimate divergence times.

Along the way it explores ideas including molecular clocks, genetic distance, phylogenetic tree reconstruction, fossil calibration and the assumptions that underpin modern evolutionary inference.

The emphasis is not on reproducing the sophisticated methods used in contemporary phylogenetic research. Instead, the project aims to understand the underlying principles by building them one step at a time.

Like the other computational natural history projects on Field Notes, the work treats software not simply as an implementation but as a way of asking scientific questions. Each model is deliberately simple enough that its assumptions remain visible, allowing readers to experiment, compare approaches and develop an intuition for how evolutionary history can be reconstructed from molecular evidence.

## Interactive Molecular Clock Explorer

{% include fullwidth-image.html assets=page.assets img=page.explorer %}

The interactive Molecular Clock Explorer accompanies the project and allows every stage of the workflow to be explored directly.

Readers can simulate sequence evolution under different molecular clock models, compare genetic distance measures, reconstruct phylogenetic trees using alternative algorithms and investigate the effect of fossil calibration on estimated divergence times.

Rather than simply presenting finished results, the explorer encourages experimentation with the assumptions behind each method and illustrates how changes to evolutionary models influence the trees that are ultimately reconstructed.

<p class="feature-invite-action">
<a href="/wildlife/molecularclock/explorer/">Launch the Molecular Clock Explorer</a>
</p>

## Contents

This section is currently being expanded into a complete introduction to computational molecular evolution.

Over the coming days it will grow into a series of chapters following the journey from simulated DNA sequences through genetic distance estimation, phylogenetic tree reconstruction and fossil calibration, explaining the biological ideas that underpin each stage.

In the meantime, the interactive Molecular Clock Explorer is fully available and provides the complete computational workflow explored by the project.

The accompanying reference material and downloadable booklet will be published shortly.

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.molecular_clock.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Acknowledgements

This project draws upon the long development of molecular evolutionary biology and phylogenetics, particularly the concepts of molecular clocks, substitution models and distance-based tree reconstruction developed over the latter half of the twentieth century.

The simulations, visualisations and interactive tools presented here were developed specifically for Field Notes as educational explorations in computational natural history.

{% include molecular-clock-invitation.html %}
