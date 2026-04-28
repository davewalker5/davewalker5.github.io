---
layout: default
title: Under the Hood - How the Breeding Classifier Works
description: A closer look at the simple measures used to describe observed breeding activity
breadcrumb: Breeding Classifier
---

## Under the Hood: How the Breeding Classifier Works

The breeding categories on this site are derived in much the same way as the seasonal classifications: from a small set of simple measurements and a sequence of transparent decisions.

But the signal being described here is different.

Rather than asking how a species occupies the year as a whole, the breeding classifier asks when reproduction becomes visible in the field - that is, when a species is recorded with dependent young, and how that signal is distributed through the months.

What follows is a look at how that works in practice.

## From Records to Shape

Everything begins with two monthly summaries, calculated only from records in which a species was observed with young:

- Total sightings with young by month — how many individuals were recorded in those observations
- Presence with young by month — on how many days the species was recorded with dependent young

These two measures capture related but slightly different things.

Counts reflect the strength of the visible signal — how many individuals are being encountered in family groups or breeding-related observations. Presence reflects timing more directly — how often the observer meets with evidence of dependent young.

This distinction matters. A species whose young remain with the adults for many weeks may produce high and prolonged counts, even though the actual breeding event itself was concentrated much earlier. For that reason, the breeding classifier treats presence as its primary signal, and counts as a supporting one.

## What the Signal Means

It is important to be clear about what is being measured.

The breeding classifier does not identify breeding in the strict biological sense. It does not know when eggs were laid, when incubation began, or how many broods were attempted.

Instead, it describes a field-based proxy:

> when breeding becomes visible through the observation of dependent young

For some species, that visibility is brief. Fledged young appear, remain associated with the adults for a short period, and then disperse. For others, particularly larger waterbirds, young may remain with the parents for months, extending the visible signal well beyond the moment of hatching.

The classifier therefore describes not breeding alone, but the seasonal shape of **observed breeding activity**.

## The Basic Descriptors

As with the seasonal classifier, the first step is simply to describe the shape of what is there.

### Occupancy

> In how many months is breeding activity visible?

This is counted as the number of months in which the species was recorded with young. A narrow signal confined to two or three months is very different from one spread across half the year.

### Signal Strength

The classifier also measures the total amount of breeding-related presence across the year.

This is not used to infer productivity directly, but to decide whether there is enough information to interpret at all. A species with only one or two isolated breeding records may be real, but the pattern is too weak to classify confidently.

### Timing

The classifier identifies the peak month — the month in which the breeding signal is strongest.

For breeding, unlike whole-year seasonality, the signal is usually treated as a simple sequence rather than a circular one. December and January are adjacent in the calendar, but breeding activity is not usually expected to wrap around the year boundary in the same way that winter presence can.

To describe the centre of activity more fully, the classifier also calculates a weighted mean month. This gives a single value representing where the observed breeding signal is centred.

### Width

Not all breeding signals are equally compact.

Some are tightly concentrated - a brief pulse of visibility in late spring or early summer. Others are broader, either because breeding is spread across a longer period, because multiple broods are involved, or because young remain associated with the adults well after fledging or hatching.

To capture this, the classifier measures the width of the active period by asking:

> How many months fall within the core of the breeding signal?

As in the seasonal classifier, this is based not simply on non-zero months, but on the number of months that exceed a fraction of the peak.

### Span

Alongside width, the classifier also measures the calendar span from the first month with observed breeding activity to the last.

This helps distinguish a compact seasonal peak from a more extended period of family association.

### Concentration

Some breeding signals are strongly concentrated in a single month, while others are spread more evenly across several.

To capture this, the classifier measures:

- how variable the monthly values are
- how large the peak is relative to the annual total or average

A high peak fraction suggests a compact breeding window. A lower peak fraction suggests a broader, more prolonged signal.

### Post-peak Persistence

This is the feature that matters most for breeding.

The classifier asks not only when the signal peaks, but what happens afterwards:

- How much of the signal lies after the peak month?
- How many months remain above a meaningful fraction of the peak after that point?

This helps distinguish two very different kinds of curve.

A species such as Great Tit may show a narrow peak and then a rapid decline, consistent with a brief period in which fledged young are visible before dispersal.

A species such as Mute Swan may peak and then remain present with young for several further months, producing a long post-peak tail. In that case, the signal reflects prolonged parental association rather than a long breeding season in the strict sense.

## Presence vs Counts

The breeding classifier uses both presence and counts, but not in equal measure.

Presence is the main timing signal. It answers the question:

> When in the year is breeding activity actually being encountered?

Counts are kept as a secondary layer. They can show whether the signal is especially intense or whether repeated sightings of family groups are inflating the total.

This means the classifier is designed to be cautious. It does not assume that more young seen means more breeding. Often it may simply mean that the same family group remains visible for longer.

## From Description to Decision

Once these features have been calculated, the classifier applies a sequence of simple rules.

As with the seasonal classifier, the order matters. The clearest cases are identified first, and only then do the more ambiguous patterns come into view.

### 1. Is there enough data?

If there are too few records with young, or activity appears in only one isolated month, the signal is treated as too weak to classify confidently.

These are labelled:

| Condition | Classification |
| --------- | -------------- |
| Very sparse breeding signal | No breeding signal |

This is not a claim that breeding did not occur - only that it did not produce enough visible pattern in the records to interpret.

### 2. Is the signal narrow and concentrated?

If the breeding signal is confined to a small number of months, has a strong peak, and falls away quickly after that peak, it is classified as:

| Pattern | Classification |
| ------- | -------------- |
| Narrow, sharply peaked, short tail | Brief breeding window |

This is typical of species in which young are visible for only a short period before dispersal.

### 3. Does the signal extend well beyond the peak?

If the breeding signal persists strongly for several months after the peak, with a broad width and an obvious post-peak tail, it is classified as:

| Pattern | Classification |
| ------- | -------------- |
| Broad signal with prolonged post-peak persistence | Extended family association |

This category is especially useful for species in which dependent young remain with the adults for a long time.

### 4. Is there a clear but not especially brief or prolonged window?

Some species show an obvious seasonal breeding pattern without being tightly concentrated or strongly extended.

These are classified as:

| Pattern | Classification |
| ------- | -------------- |
| Clear seasonal window of intermediate breadth | Moderate breeding window |

This often reflects a recognisable breeding season spread across several months, whether through repeat broods, staggered nesting, or a moderately prolonged period of visible dependency.

### 5. And if none of those quite fit?

Some patterns are real, but irregular.

The signal may be scattered, behaviourally messy, or shaped as much by detectability as by breeding itself. These are classified as:

| Pattern | Classification |
| ------- | -------------- |
| Present, but not cleanly compact or extended | Diffuse / ambiguous breeding signal |

As with the seasonal classifier, this is not a failure of classification so much as a recognition that some patterns resist neat reduction.

## What the Classifier Is Really Doing

Underneath the thresholds and labels, the logic is simple. The classifier is asking, in sequence:

- Is there enough visible breeding signal to interpret?
- If so, is it brief or extended?
- Does it form a clear seasonal window?
- And if not, is it too diffuse to resolve cleanly?

The result is not a direct measure of breeding biology, but a description of how reproduction appears in the records.

## A Note on Interpretation

This matters particularly here.

The breeding classifier does not distinguish between nesting, hatching, fledging, or prolonged parental care. It works from what is observable: records in which young were seen.

That means the categories should be read as descriptions of **observed breeding activity**, not of breeding chronology in a strict ornithological sense.

A brief breeding window may correspond mainly to fledged young becoming visible. An extended family-association pattern may reflect long parental care rather than an unusually long breeding season. In this sense, the classifier remains faithful to the underlying philosophy of the wider project: it describes how the species is encountered through the year, not an abstract life history independent of observation.

## Why This Approach?

The aim is the same as with the seasonal classifier: not maximum complexity, but readable structure.

Each feature is simple. Each decision can be followed. Each threshold can be questioned and adjusted.

The classifier does not impose a story on the records. It gives recurring shapes consistent names, so that differences between species become easier to see, compare, and think about.

## Method Note

The breeding classifier uses the same general approach as the seasonal classifier - simple descriptive statistics, transparent thresholds, and a rule-based sequence of decisions - but applies them to a different signal: records of species observed with dependent young.

Unlike the main seasonal classifier, the breeding classifier generally treats the year as a linear sequence rather than a circular one, since breeding activity is usually concentrated within a single part of the calendar rather than wrapping across the year boundary.

<div class="no-print">
  <blockquote>
    <p><strong>Classifier Implementation</strong></p>
    <p>The full breeding classifier — including feature extraction and rule set — is available here:</p>
    <p>&rarr; <a href="https://github.com/davewalker5/davewalker5.github.io/blob/main/notebooks/wildlife/year_in_the_life.ipynb">View the classifier on GitHub</a></p>
  </blockquote>
</div>