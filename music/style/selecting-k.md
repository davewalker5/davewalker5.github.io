---
layout: default
title: Choosing the Number of Clusters
description: Interpreting inertia and silhouette scores before selecting a working cluster count.
breadcrumb: Choosing the Number of Clusters
series: style_analysis
chapter: 6
assets: "/images/music/catalogue-style-analysis/"
elbow:
  name: "catalogue-clustering-elbow-plot.png"
  alt: "Inertia by candidate K from two through twelve"
  caption: "Elbow diagnostic: improvements in group compactness slow markedly after four clusters."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
silhouette:
  name: "catalogue-clustering-silhouette-score.png"
  alt: "Silhouette score by candidate K from two through twelve"
  caption: "Silhouette diagnostic: two clusters score highest, with four remaining a local high point."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Choosing the Number of Clusters

There is no single rule that tells us how many kinds of musical character a personal collection *really* contains. The approach here is to examine two complementary diagnostics, then treat the selected number as a useful modelling choice rather than a final answer.

## The elbow plot: how compact are the groups?

{% include fullwidth-image.html assets=page.assets img=page.elbow %}

**Inertia** is the total squared distance between artists and their assigned cluster centres. Lower inertia means that, under this model, artists sit more tightly around their centres. But inertia normally improves as we add clusters: a separate centre can account for finer differences.

The interesting point is where the improvement begins to slow. That bend is commonly called the **elbow**. In the supplied result, the most striking change in slope is around **K = 4**: the drop from three to four clusters is much greater than the drop from four to five.

The implemented procedure detects a knee in the decreasing inertia curve and uses that value for the final fit. The chart is not evidence that four natural genres exist in the collection.

## The silhouette plot: how distinct are the groups?

{% include fullwidth-image.html assets=page.assets img=page.silhouette %}

A **silhouette score** compares how close each artist is to others in its assigned cluster with how close it is, on average, to the nearest alternative cluster. Higher values indicate more distinct separation. The overall silhouette score is the average across artists.

In these results, **K = 2 has the highest silhouette score** (approximately 0.30), while **K = 4 scores about 0.27**. Neither reading should be hidden: the first favours a broad separation under the silhouette diagnostic, while the elbow suggests a more detailed four-group view at diminishing additional cost in inertia.

The analysis uses the **inertia knee** for its implemented selection; silhouette is an accompanying check, not a second automatic decision rule.

## What the choice means

Four groups provide a particular level of descriptive detail for this version of the catalogue. The silhouette values also suggest that the divisions are not sharply isolated. That is entirely compatible with a collection in which musical characteristics shade into one another.

The plotted diagnostics evaluate trial fittings; the final grouping is fitted again. The documented notebook uses a different fixed seed for that final fit, so the final membership need not be identical to the membership in a trial fitting at the same K.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
