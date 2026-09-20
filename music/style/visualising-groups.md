---
layout: default
title: Mapping the Clustered Catalogue
description: Returning the group assignments to the familiar style map and adding a visual indication of artist density.
breadcrumb: Mapping the Clustered Catalogue
series: style_analysis
chapter: 8
assets: "/images/music/catalogue-style-analysis/"
clustered_map:
  name: "catalogue-style-with-clustering.png"
  alt: "Artist style map with coloured cluster dots, labelled groups and hexagonal density shading"
  caption: "The final catalogue map: group membership and artist density shown together."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

## Reading the clustered style map

The final visualisation builds on the original style map rather than replacing it.

{% include fullwidth-image.html assets=page.assets img=page.clustered_map %}

Each artist still appears at its original **energy** and **intimacy** coordinates. The difference is that the artist marker is now coloured by **cluster membership** instead of warmth.

Behind those markers is a second visual layer: a pale **hexagonal density grid** showing where artists are concentrated on the map.

The chart therefore combines two related views of the collection:

- The **coloured dots** show individual artists and the cluster to which each has been assigned
- The **hexagonal background** shows the density of artists occupying different parts of the energy–intimacy space

The labels placed on the map summarise the clusters themselves, using their average energy and intimacy, a warmth description and selected mood terms.

## Showing where artists accumulate

Because energy and intimacy are recorded on discrete scales from 0–5, the actual artist positions lie on a regular grid of whole-number coordinates. Several artists can therefore occupy exactly the same point.

If those same coordinates were used directly to calculate the density layer, all artists sharing a score would fall on top of one another at a single location. The resulting hexagonal plot would tend to concentrate the density into isolated cells centred around the discrete score positions, rather than giving a useful impression of how strongly populated each region is.

To make those concentrations easier to see, the density calculation introduces a very small amount of **jitter**.

For the density layer only, each artist's energy and intimacy coordinates are displaced slightly and randomly from their recorded values before the points are counted into hexagonal cells. An artist recorded at `(2, 3)`, for example, might contribute to the density calculation at a position such as `(2.04, 2.95)`.

The underlying data have not changed. The jitter is purely a visualisation technique.

This explains why the pale hexagonal density pattern does not line up precisely with the discrete whole-number positions visible in the original style map. The density layer shows a slightly dispersed representation of artists that actually occupy those discrete positions.

The coloured artist markers themselves are **not** jittered. They remain at their original energy and intimacy coordinates.

The final chart can therefore be read as two superimposed representations of the same data:

- **Foreground — actual artist positions:** coloured dots remain on the discrete energy–intimacy grid, with colour showing cluster membership
- **Background — visualised artist density:** the hexagonal layer uses slightly jittered copies of those positions to reveal where multiple artists accumulate

The density layer does not create or influence the clusters. It is simply a way of making concentrations that would otherwise be hidden by overlapping artist markers visible.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
