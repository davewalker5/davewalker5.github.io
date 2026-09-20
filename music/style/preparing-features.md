---
layout: default
title: Preparing the Features
description: Standardising style scores and weighting the category and mood indicators before clustering.
breadcrumb: Preparing the Features
assets: "/images/music/catalogue-style-analysis/"
series: style_analysis
chapter: 2
---

# Preparing the Features

A feature matrix is numeric, but that does not yet mean its columns can be compared fairly. A change in a style score and a change in a yes/no mood indicator are not automatically equivalent. Before grouping artists, the analysis decides how much influence these different descriptions should have on distance.

## Standardising the three style scores

Energy, intimacy and warmth are each centred on their average across the catalogue and divided by their own standard deviation. This is called **standardisation**.

A standardised score tells us where an artist sits relative to the other artists on that dimension. It also stops a dimension with a larger spread across the catalogue from dominating simply because its raw differences are numerically larger.

The 0–5 values are retained separately, however: those original values will be useful when explaining the results to a reader.

## Weighting categories and moods

The current analysis multiplies the vocal-presence and ensemble indicators by **0.7**, and the mood indicators by **0.4**. These values express a choice about how the different feature groups contribute to the distances between artist profiles.

| Feature group                    | Treatment in the clustering representation |
| -------------------------------- | ------------------------------------------ |
| Energy, intimacy, warmth         | Standardised separately                    |
| Vocal presence and ensemble type | Indicator values × 0.7                     |
| Assigned moods                   | Indicator values × 0.4                     |

The weights are **not percentages** of an overall musical score. K-Means uses squared distances, and several different mood indicators can add to the distance between a pair of artists. Consequently, the total influence of a feature group also depends on how many of its columns differ.

The relatively smaller per-mood weight means that a single shared or differing mood does not necessarily overwhelm the three scored dimensions. That is a modelling decision for this experiment, not a universal measure of musical importance.

## Two views of the same catalogue

From here the analysis maintains two useful representations: the **prepared matrix** for measuring similarity, and the **original, readable descriptions** for charts and cluster summaries.

This distinction prevents a common interpretive mistake: a plotted energy score of `3` still means `3` on the catalogue's 0–5 scale. It does not mean `3` standard deviations from the average.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
