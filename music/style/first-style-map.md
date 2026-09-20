---
layout: default
title: The First Style Map
description: Plotting energy and intimacy with warmth as colour before introducing cluster membership.
breadcrumb: The First Style Map
series: style_analysis
chapter: 4
assets: "/images/music/catalogue-style-analysis/"
style_map:
  name: "catalogue-style-coloured-by-warmth.png"
  alt: "Scatter plot of artist energy against intimacy, coloured by warmth"
  caption: "The unclustered style map: one point per artist, showing the original 0–5 style scores."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# The First Style Map

Before asking an algorithm to assign groups, I wanted to see what the catalogue looked like in familiar musical terms.

{% include fullwidth-image.html assets=page.assets img=page.style_map %}

Each dot represents a group of one or more artists at that energy and intimacy. **Energy** runs from left to right, **intimacy** from bottom to top, and **warmth** is shown by colour. All three use the original 0–5 catalogue scores, rather than the standardised values prepared for clustering.

## Reading the style map

Each artist is plotted according to three characteristics:

- **Energy**, represented by the horizontal axis
- **Intimacy**, represented by the vertical axis
- **Warmth**, represented by the colour of the marker

Artists farther right have higher assigned energy, while artists farther up have higher assigned intimacy. Colour introduces a third dimension, allowing warmth to be represented without making the plot too difficult to read.

Because energy and intimacy are recorded on discrete scales from 0–5, multiple artists may occupy exactly the same position. A visible dot therefore represents a particular combination of energy and intimacy, potentially shared by several artists.

Where artists at the same position differ in warmth, their differently coloured markers also overlap. The visible colour does not necessarily represent every artist at that position.

The map is intentionally simple. It provides an initial view of the range and distribution of stylistic characteristics represented in the catalogue, but it does not reveal how many artists occupy each position.

Nor does it show the additional characteristics — vocal presence, ensemble type and assigned moods — that will contribute to the subsequent clustering analysis.

A position on this map is therefore a readable summary of an artist's energy and intimacy scores, with warmth represented by colour, **not** that artist's entire feature profile.

The next question is whether those fuller profiles contain patterns and relationships that this initial view alone cannot reveal.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
