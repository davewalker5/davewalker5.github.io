---
layout: default
title: Describing the Groups
description: Fitting the chosen grouping, then summarising clusters using readable style scores and common artist attributes.
breadcrumb: Describing the Groups
series: style_analysis
chapter: 7
assets: "/images/music/catalogue-style-analysis/"
---

# Describing the Groups

With the number of clusters selected, K-Means is fitted again to the **prepared, weighted matrix**. Every artist receives a cluster membership label.

The cluster numbers are just identifiers. Cluster `1` is not a higher quality, a stronger genre or a more important part of the collection than cluster `2`.

## Returning to musical language

The algorithm compares prepared numeric profiles, but the group descriptions return to the artist data as it was originally recorded. For each cluster, the analysis gathers:

| Summary                       | What it says                                                            |
| ----------------------------- | ----------------------------------------------------------------------- |
| Artist count                  | How many artist records were assigned to the group                      |
| Mean energy, intimacy, warmth | The group's average original 0–5 style scores                           |
| Common moods                  | Which recorded mood associations occur most frequently within the group |
| Dominant vocal presence       | The most common vocal category in the group                             |
| Dominant ensemble type        | The most common ensemble category in the group                          |
| Example artists               | A short, navigable selection of names from the group                    |

The mean style scores are translated into readable bands:

| Mean score       | Energy      | Intimacy      | Warmth    |
| ---------------- | ----------- | ------------- | --------- |
| Below 2.0        | low energy  | low intimacy  | cool      |
| 2.0 to below 3.5 | mid energy  | mid intimacy  | warm      |
| 3.5 and above    | high energy | high intimacy | very warm |

The label also draws on up to two of the most frequent recorded moods. It is an **interpretation of the group's profile after grouping**, not the criterion by which its artists were assigned.

## Two useful cautions

A common mood means that a higher *proportion* of the group's artists have that recorded association. The current reporting process can include zero-prevalence entries when a group has fewer recorded moods than the display limit, so the presence of a mood name in a long exported list is not by itself proof that it occurs in that cluster.

The implementation's three example artists are chosen by descending warmth and then intimacy. They are **illustrations selected by those characteristics**, not necessarily the three artists closest to the cluster centre.

## A summary to explore outside the chart

The process exports a cluster-summary spreadsheet, with one row per cluster and its descriptive statistics and examples. It does not export a complete artist-by-artist membership table or write the new cluster labels back into Music Catalogue.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
