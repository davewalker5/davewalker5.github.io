---
layout: default
title: Finding Groups with K-Means
description: Using K-Means to investigate similarities in the full weighted artist feature space.
breadcrumb: Finding Groups with K-Means
series: style_analysis
chapter: 5
assets: "/images/music/catalogue-style-analysis/"
---

# Finding Groups with K-Means

The plotted map is a useful starting point, but the classification needs to use the *whole* artist description. An artist's warmth, vocal character, ensemble type and assigned moods may distinguish it from another artist at the same energy-and-intimacy coordinates.

For that comparison, the analysis uses **K-Means clustering** on the prepared feature matrix.

## The idea behind K-Means

Imagine placing a chosen number of centres among the artist profiles. Each artist is assigned to the nearest centre. Each centre then moves to the mean position of the artists assigned to it. The process repeats until the grouping settles, or the fitting procedure reaches its stopping limit.

The centres exist in the **full feature space**, not just on the two axes used in the earlier chart. Similarity is defined by distances in that weighted space, not by whether artists share a recognised musical genre.

## Why the number of groups is a question

K-Means needs a number of clusters, usually called **K**, before it fits the groups. Too few may fold together markedly different artist profiles; too many may divide the collection into increasingly narrow sets.

Rather than assuming a count, this analysis tries **K = 2 through 12**. For each candidate, it measures how compact the resulting groups are and how distinctly they separate from the alternatives.

The trial runs use a fixed initialisation seed for repeatability. A fixed seed does not turn the results into an objective truth: different inputs, feature weights or a different fitting setup can still produce different groups.

The next page explains the two diagnostics used to examine these alternatives.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
