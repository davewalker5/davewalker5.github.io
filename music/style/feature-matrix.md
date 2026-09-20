---
layout: default
title: Building the Feature Matrix
description: Combining numeric style scores, category indicators and artist-to-mood mappings into one row per artist.
breadcrumb: Building the Feature Matrix
assets: "/images/music/catalogue-style-analysis/"
series: style_analysis
chapter: 2
---

# Building the Feature Matrix

The next task is to turn several different kinds of musical description into one consistent representation.

The purpose is to make it possible to compare artists and identify groups that share similar musical characteristics.

To do that, the analysis uses a technique called **K-Means clustering**.

## What is K-Means?

K-Means is a method of identifying groups within a collection of data based on similarity.

Rather than starting with predefined categories and deciding which artists belong in each, it looks for groups that emerge from the characteristics recorded about them.

In this project, those characteristics include energy, intimacy, warmth, vocal presence, ensemble type and assigned moods.

The basic process is relatively straightforward:

1. Each artist is represented by a set of numerical characteristics
2. A number of groups, known as clusters, is selected
3. K-Means establishes a centre for each cluster
4. Artists are assigned to whichever centre they are closest to
5. The centres are recalculated from the artists assigned to them
6. Assignment and recalculation continue until the grouping stabilises, or a stopping condition is reached

The result is a set of clusters containing artists whose recorded characteristics are relatively similar.

The name *K-Means* comes from the two central ideas: **K** is the number of clusters being sought, and each cluster's centre is calculated as the mean of the feature values of its members.

### Why use K-Means for this collection?

Traditional musical classifications are useful, but they don't necessarily describe the qualities that make two artists feel similar when listening to them.

Two artists may belong to different genres but share a similar sense of intimacy, warmth or energy. Conversely, artists within the same genre may occupy quite different stylistic territory.

K-Means offers a way of exploring these relationships without requiring the groups to correspond to established genres.

For example, it may identify a group characterised by high intimacy and warmth, another by high energy and low intimacy, or a group whose members share particular combinations of moods and ensemble characteristics.

The important distinction is that **K-Means does not understand music**.

It does not listen to recordings, recognise performances or make independent musical judgements. It identifies similarities in the information supplied to it.

The resulting classification therefore depends on how artists have been described in the catalogue.

That brings us to the feature matrix.

## What is a feature matrix?

Since K-Means works with numbers, every artist needs a numerical profile that represents its recorded musical characteristics.

That representation is called a **feature matrix**.

It has one row per artist and one column per characteristic used in the comparison.

The challenge is that the catalogue contains several different kinds of information. Energy, intimacy and warmth are already numerical scores, but vocal presence, ensemble type and moods are recorded as categories or associations.

Before K-Means can compare artists, these different descriptions need to be brought together into a consistent numerical structure.

## Bringing artist moods alongside artist styles

The catalogue stores artists and their assigned moods as related records. The first transformation turns these associations into an artist-by-mood grid. Each distinct mood becomes a column:

| Artist                | Mood: Cool | Mood: Artful | Mood: Contemplative |
| --------------------- | ---------: | -----------: | ------------------: |
| Illustrative artist A |          1 |            0 |                   1 |
| Illustrative artist B |          0 |            1 |                   0 |

*Illustrative structure only — these are not actual artist assignments from my collection.*

A `1` means that the association is recorded. A `0` means it is not recorded. Duplicate associations do not make the indicator larger than one. Joining this grid back to the artists preserves artists without assigned moods; their mood indicators are zero.

## Translating categories into indicators

Vocal presence and ensemble type require a similar treatment, often called **one-hot encoding**. Instead of assigning a potentially misleading number to a category, each possible category receives its own indicator column. An artist in the `Trio` ensemble category, for example, receives `1` in `Ensemble_Trio` and `0` in the other ensemble columns.

This is important because the arbitrary code assigned to a category should not imply musical distance. The difference between two categories comes from their indicator profiles, not from the numerical difference between their database codes.

## The combined profile

The final row for an artist contains three groups of features:

| Feature group                    | Representation               | Example             |
| -------------------------------- | ---------------------------- | ------------------- |
| Energy, intimacy, warmth         | Original 0–5 numeric scores  | `Energy = 2`        |
| Vocal presence and ensemble type | One indicator per category   | `Ensemble_Trio = 1` |
| Assigned moods                   | One indicator per named mood | `Mood_Artful = 1`   |

An artist's identifier and name allow the analysis to keep track of the source record; they are **not themselves measures of musical similarity**.

If the catalogue contains **N** artists and the combined description contains **F** feature columns, the matrix has **N × F** cells. A complete row is an artist's *feature vector*: its position in an F-dimensional descriptive space.

## What this representation preserves — and what it simplifies

The matrix preserves the distinction between scored dimensions and recorded associations. It also allows several moods to contribute to an artist's profile. It does not preserve the nuances of an individual performance, or the degree to which an artist exemplifies a mood. The representation is deliberately simplified so that a collection-wide comparison becomes possible.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
