---
layout: default
title: Under the Hood - How the Seasonal Classifier Works
description: A closer look at the simple measures used to describe seasonal patterns
breadcrumb: Seasonal Classifier
---

## Under the Hood: How the Seasonal Classifier Works

The categories that emerge from the comparison of monthly patterns are the result of a small set of calculations and a sequence of decisions - all of them simple, but carefully chosen.

What follows is a look at how that works in practice.

## From Records to Shape

Everything begins with two monthly summaries for each species:

- Total sightings by month — how many individuals were recorded
- Presence by month — on how many days the species was seen

These two measures capture slightly different things. Counts reflect abundance — how many birds are present, how large a flock might be - while presence reflects encounter frequency — how often the species is met with.

From these two short sequences, the classifier builds a description of the year not as a list of observations, but as a set of features.

## The Basic Descriptors

The first step is simply to describe what is there.

### Occupancy

> How much of the year does the species appear in?

This is counted as the number of months with any recorded presence. A species recorded in all twelve months looks very different, at a glance, from one that appears in only four.

### Absence

Just as important is when it is not there.

The classifier measures the longest uninterrupted run of months with no records at all. A long gap — four or more months — is a strong signal of seasonal absence while a short gap — or none at all — suggests continuity.

### Timing

To understand when activity is concentrated, two measures are used.

The simplest is the peak month — when the maximum occurs.

But that alone can mislead, since a species active in December and January has two peaks at opposite ends of the calendar, that are in fact adjacent in time.

To handle this, the classifier uses a circular mean — treating the months as points on a loop rather than a line. In effect, January sits next to December, and the “centre of activity” can be placed correctly across the year boundary.

This gives a single number — a month, often fractional — representing where the activity is centred.

### Seasonal Breadth

Not all seasons are equally sharp. Some species have a narrow window of activity — a brief flowering period, or a tightly defined migration. Others are spread broadly across the year.

To capture this, the classifier calculates:

> How many months fall within the core of activity?

Rather than counting any non-zero value, it defines a threshold — typically a fraction of the peak — and counts how many months exceed it.

This produces a measure of seasonal width: how broad or concentrated the active period is.

### Variability

Finally, the classifier looks at how much the values fluctuate using two simple ratios:

- How variable are the monthly values?
- How large is the peak relative to the average?

These capture whether a species is relatively even through the year, or sharply peaked.

## Presence vs Abundance

Up to this point, everything could be done with a single series but having both counts and presence allows one further distinction.

Some species vary in how often they are encountered, but not dramatically in how many are present. Others are encountered fairly consistently, but their numbers rise and fall sharply — think of winter flocks assembling and dispersing.

To capture this, the classifier compares variability in counts with variability in presence.

If counts fluctuate much more than presence, this suggests aggregation — birds gathering and dispersing in groups. If presence itself fluctuates strongly, this suggests detectability — the species is there, but more or less noticeable at different times of year.

This distinction underlies the two “resident” subtypes described earlier.

## From Description to Decision

Once these features have been calculated, the classifier applies a series of rules. This is not a model in the statistical sense, but a set of ordered decisions — each one asking a simple question about the shape of the year.

The order matters, and the classifier works from the most clear-cut cases to the most ambiguous.

### 1. Is there enough data?

If a species has only been recorded a handful of times, or in very few months, there is not enough signal to interpret. These are set aside as “Sparse / low-signal”.

This is less a classification than a recognition of uncertainty.

### 2. Is there a clear seasonal absence?

If there is a long uninterrupted gap — typically four or more months — and activity is confined to part of the year, the species is treated as a visitor. The timing then determines which kind:

| Center of Activity                | Classification |
| --------------------------------- | -------------- |
| Activity centred on winter        | Winter visitor |
| Activity centred on spring/summer | Summer visitor |

At this point, the shape is already doing most of the work.

### 3. Is there a winter “tail”?

Some species complicate this picture by showing a strong summer-centred pattern, but with a persistent, if smaller, presence through winter. If there is a moderate gap — but not a complete absence — and winter records are genuinely present, the classifier identifies these as Partial migrants.

This is the distinction that allows species such as blackcap to sit between categories, rather than being forced into one.

### 4. Is the species present year-round?

If the species appears in most months, with little or no sustained absence, it is treated as a resident. From there, the subtype depends on variability:

| Classification                | Pattern                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Detectability-driven resident | Presence varies strongly through the year — the species is more or less seen, rather than more or less there |
| Aggregation-driven resident   | Counts vary more than presence — the species forms groups or flocks                                          |
| Resident (general)            | Neither pattern dominates                                                                                    |

### 5. Otherwise, what kind of curve is it?

For species that do not fit neatly into these categories — often plants, or species with broad seasonal distributions — the classifier falls back to the shape of the curve itself:

| Activity Window                | Classification        |
| ------------------------------ | --------------------- |
| Narrow activity window         | Narrow seasonal curve |
| Broad activity across the year | Broad seasonal curve  |

### 6. And if none of that quite fits?

Some patterns remain ambiguous.

These are labelled Mixed / transitional — not as a failure, but as a prompt for closer inspection.

## What the Classifier Is Really Doing

Despite the number of steps, the underlying idea is simple. The classifier is asking, in sequence:

- Is it there all year, or not?
- If not, when is it there?
- If it is, how does its presence change?
- And if none of those are clear, how wide is its season?

Each decision is based on a small, interpretable feature.

There is no training data, no optimisation, and no attempt to generalise beyond what is observed.

## A Note on Interpretation

It is worth emphasising that the classifier is not identifying biological truth in isolation. As the previous post in the series mentioned, it is describing patterns of encounter.

A species classified as a winter visitor may, in reality, be present year-round but rarely encountered outside winter. A “detectability-driven” pattern may reflect behaviour as much as abundance. The classifier makes no distinction between these and, in a sense, that is the point as it's not modelling the species directly, but the way the species is experienced through observation.

## Why This Approach?

The aim here is not to produce the most accurate possible classification, but the most readable one, in which each step can be understood, each threshold examined, each decision questioned.

The result remains close to the observations from which it is derived. The classifier doesn't create the patterns observed in the charts for individual species - it simply gives them consistent names, allowing the focus to shift to recurring forms and rhythms.

## Method Note

The approach here draws on simple descriptive statistics and, where needed, treats the year as a circular sequence (so that December and January sit adjacent), a common technique in seasonal analysis. Beyond that, the classification itself is heuristic and developed directly from the patterns in these observations.

<div class="no-print">
  <blockquote>
    <p><strong>Classifier Implementation</strong></p>
    <p>The full classifier — including feature extraction and rule set — is available here:</p>
    <p>&rarr; <a href="https://github.com/davewalker5/davewalker5.github.io/blob/main/notebooks/wildlife/year_in_the_life.ipynb">View the classifier on GitHub</a></p>
  </blockquote>
</div>