---
layout: default
title: What My Collection Reveals
description: A field-note reading of the style maps and four-cluster analysis of my own catalogue.
breadcrumb: What My Collection Reveals
series: style_analysis
chapter: 9
assets: "/images/music/catalogue-style-analysis/"
style_map:
  name: "catalogue-style-coloured-by-warmth.png"
  alt: "Style map with energy and intimacy axes and warmth colouring"
  caption: "The catalogue before clustering, using its original style scores."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
elbow:
  name: "catalogue-clustering-elbow-plot.png"
  alt: "Elbow plot showing inertia for two to twelve clusters"
  caption: "The elbow used to select four clusters for this analysis."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
silhouette:
  name: "catalogue-clustering-silhouette-score.png"
  alt: "Silhouette scores for two to twelve clusters"
  caption: "The highest silhouette score is at two clusters; four offers a more detailed view."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
clustered_map:
  name: "catalogue-style-with-clustering.png"
  alt: "Final four-cluster map with labelled groups and artist density"
  caption: "Four-group catalogue style map with density shading."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# What My Collection Reveals

Having described the method, the interesting part for me is what happens when I turn it back on the records I actually catalogue.

This is not an externally imposed classification of jazz, rock or any other genre. The analysis starts with my own artist descriptions, then looks for similarities across the combined features. Its results are consequently a portrait of **my catalogue as described by me** at the time the analysis was run.

## First, the collection without groups

{% include fullwidth-image.html assets=page.assets img=page.style_map %}

The starting chart places artists by energy and intimacy, and uses colour for warmth. Even in this simple view, the points are not evenly distributed. Several artists share discrete positions, and there are concentrations around the lower-to-middle energy and intimacy values as well as more energetic, less intimate positions.

Warmth adds a useful extra distinction. Some artists with similar energy and intimacy have different assigned warmth. A purely two-dimensional grouping would miss that, just as it would miss differences in vocal and ensemble character or moods.

## Why this version uses four clusters

{% include fullwidth-image.html assets=page.assets img=page.elbow %}

The inertia curve falls steeply until around **K = 4**, after which each additional cluster brings a smaller reduction in within-group squared distance. That is the elbow used to select the working cluster count.

{% include fullwidth-image.html assets=page.assets img=page.silhouette %}

There is an important qualification. The highest silhouette score in the supplied chart is at **K = 2**, approximately **0.30**, while **K = 4** is approximately **0.27**. Four groups offer more descriptive detail than the broad two-group division, but the silhouette plot does not claim that four is the uniquely strongest separation.

That matters because I am looking for an informative way to *explore* the collection, not a claim that the music falls into four sharply bounded natural kinds.

## The clustered catalogue

{% include fullwidth-image.html assets=page.assets img=page.clustered_map %}

With **K = 4**, the final map shows four assigned groups and background shading for artist density. The annotations in the supplied image identify musical characters including:

| Character described on the map       | Indicative mood terms shown |
| ------------------------------------ | --------------------------- |
| Low energy, low intimacy, cool       | Jazz Club, Cool             |
| Mid energy, high intimacy, very warm | Jazz Club, Warm             |
| Mid energy, mid intimacy, warm       | Jazz Club, Artful           |
| High energy, low intimacy, warm      | Rocky, Energetic            |

These are **map annotations**, not new fixed genre definitions or a complete reproduction of the cluster-summary workbook. Their use of phrases such as “Jazz Club” and “Rocky” comes from the catalogue's mood vocabulary.

The distribution is interesting in its own right. The chart contains a concentrated set of artists around the middle energy-and-intimacy region, and a separate visible extension toward higher energy and lower intimacy. Other artists occupy more intimate positions. The four labels supply a readable route through that landscape rather than hard boundaries drawn around isolated islands.

Crucially, cluster colours do not have to fall into separate patches on this map. Membership was assigned using **all** the prepared features, while the chart shows only energy and intimacy. Warmth, vocal presence, ensemble type and moods can distinguish dots that appear close together.

## What I would take back to the records

For me, the result creates several questions worth pursuing while browsing and listening: which artist pairings make immediate sense, which are unexpected, whether the mood vocabulary captures distinctions that my three numeric scales miss, and how the picture changes as the catalogue grows or I refine an artist's descriptions.

The value is not that an algorithm has told me what I like. It has given me another way to look at a collection that grew through years of listening and collecting — and a way to notice patterns that might otherwise have stayed hidden among the shelves.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
