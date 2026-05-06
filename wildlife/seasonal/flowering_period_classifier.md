---
layout: default
title: Under the Hood - How the Flowering Period Classifier Works
description: A closer look at the simple measures used to describe observed flowering periods
breadcrumb: Flowering Classifier
---

## Under the Hood: How the Flowering Period Classifier Works

The flowering categories on this site are derived in much the same way as the seasonal and breeding classifications: from a small set of simple measurements and a sequence of transparent decisions.

But the signal being described here is different again.

Rather than asking when a species is present, or when breeding becomes visible, the flowering classifier asks:

> when a plant is encountered in flower, and how that visibility is distributed through the year

What follows is a look at how that works in practice.

## From Records to Shape

Everything begins with two monthly summaries, calculated from records in which a species was observed in flower:

- Total flowering records by month — how many individual observations were made
- Flowering presence by month — on how many days flowering was recorded

As with the other classifiers, these two measures capture related but distinct aspects of the signal.

Counts reflect intensity — how frequently flowering individuals are encountered. Presence reflects timing more directly — how consistently flowering is visible across the calendar.

For flowering plants, this distinction is particularly important. A species may be present throughout the year, but only conspicuous — and therefore recorded — when in flower. For that reason, the classifier treats **presence as the primary signal**, with counts used to support interpretation where useful.

## What the Signal Means

It is important to be clear about what is being measured.

The flowering classifier does not attempt to define the full biological flowering period of a species. It does not capture the precise onset of flowering, the duration of individual blooms, or the complete ecological range of the plant.

Instead, it describes a field-based proxy:

> when flowering is visible and recorded in the course of observation

For some species, this produces a narrow and well-defined window. For others, flowering may occur across a much longer period, either continuously or in repeated flushes. In many cases, a strong seasonal peak is accompanied by lower levels of flowering outside the main period.

The classifier therefore describes not flowering in the strict botanical sense, but the seasonal shape of **observed flowering visibility**.

## The Basic Descriptors

As with the other classifiers, the first step is simply to describe what is there.

### Occupancy

> In how many months is flowering recorded?

This is counted as the number of months in which flowering presence is greater than zero. A species recorded in only two or three months is very different from one recorded in ten or eleven.

### Signal Strength

The classifier also measures the total amount of flowering presence across the year.

This is not used to infer abundance, but to decide whether there is enough information to interpret. A species recorded only once or twice in flower may be real, but the pattern is too weak to classify confidently.

### Timing

The classifier identifies the peak month — the month in which flowering presence is strongest.

Unlike whole-year seasonality, flowering is generally treated as a **linear sequence**, not a circular one. While December and January are adjacent in the calendar, flowering activity does not usually wrap cleanly across the year boundary in the way that winter presence can.

To describe the centre of activity more fully, the classifier also calculates a weighted mean month.

### Width

Not all flowering periods are equally concentrated.

Some species show a brief and sharply defined flowering window. Others maintain a broad period of activity, with flowering visible across many months.

To capture this, the classifier measures the width of the flowering signal:

> How many months fall within the core of flowering activity?

This is based not simply on non-zero months, but on the number of months that exceed a fraction of the peak.

### Span

Alongside width, the classifier measures the calendar span from the first month with recorded flowering to the last.

This helps distinguish a compact seasonal pulse from a long, tapering period of activity.

### Concentration

Some flowering signals are strongly concentrated in a single month, while others are more evenly distributed.

To capture this, the classifier measures:

- how large the peak is relative to the annual total
- how variable the monthly values are

A high peak fraction suggests a short, intense flowering period. A lower value suggests a broader or more persistent signal.

### Gaps and Continuity

For flowering, continuity is particularly informative.

The classifier asks:

- Are there gaps in the flowering record?
- How long are the longest runs of months with no recorded flowering?

A species recorded in most months, with only brief or no gaps, behaves very differently from one with a clearly bounded seasonal window.

## Presence vs Counts

As with the breeding classifier, both presence and counts are used, but not equally.

Presence provides the primary timing signal:

> When in the year is flowering actually encountered?

Counts provide context. They can indicate whether the signal is dominated by a strong seasonal peak or spread more evenly across the year.

This keeps the classifier grounded in observation. It does not assume that more records mean more flowering in a biological sense — only that flowering is more often encountered.

## From Description to Decision

Once these features have been calculated, the classifier applies a sequence of simple rules.

As with the other classifiers, the order matters. The clearest patterns are identified first.

### 1. Is there enough data?

If flowering is recorded in only one or two months, or the total signal is extremely small, the pattern is treated as too weak to classify confidently.

| Condition                    | Classification               |
| ---------------------------- | ---------------------------- |
| Very sparse flowering signal | Sparse / insufficient signal |

This does not imply absence of flowering — only that it is not sufficiently represented in the records.

### 2. Is flowering effectively continuous?

If flowering is recorded across most of the year, with little or no gap between months, the species is classified as:

| Pattern                                      | Classification            |
| -------------------------------------------- | ------------------------- |
| Present across most months with minimal gaps | Near-continuous flowering |

In some cases, this includes a strong seasonal peak. The key feature is continuity, not uniformity.

### 3. Are there multiple distinct peaks?

Some species show more than one flowering pulse within the year.

If these peaks are clearly separated by a dip in activity, the pattern is classified as:

| Pattern                              | Classification                |
| ------------------------------------ | ----------------------------- |
| Multiple peaks with clear separation | Bimodal / recurrent flowering |

If the peaks are present but not strongly separated, the pattern is described more generally as:

| Pattern                              | Classification                 |
| ------------------------------------ | ------------------------------ |
| Extended period with multiple pulses | Extended / recurrent flowering |

### 4. Is the signal concentrated in early spring?

If flowering is tightly confined to the early part of the year, with a short span and an early peak, it is classified as:

| Pattern                              | Classification         |
| ------------------------------------ | ---------------------- |
| Short, early-season flowering window | Early spring ephemeral |

### 5. Is there a clear spring or spring–summer season?

If flowering forms a recognisable seasonal window centred on spring or extending into summer, the classifier distinguishes between:

| Pattern                           | Classification                   |
| --------------------------------- | -------------------------------- |
| Compact spring-centred window     | Spring pulse                     |
| Broader spring into summer signal | Extended spring-summer flowering |

### 6. Is the peak centred on summer or later?

If the flowering signal is centred later in the year, it is classified as:

| Pattern             | Classification        |
| ------------------- | --------------------- |
| Peak in mid-summer  | Summer peak           |
| Peak in late season | Late-season flowering |

### 7. And if none of those quite fit?

Some flowering patterns are real, but do not resolve cleanly into a single category.

These are classified as:

| Pattern                             | Classification                 |
| ----------------------------------- | ------------------------------ |
| Structured but not clearly resolved | Mixed / transitional flowering |

As elsewhere, this reflects the limits of the signal rather than a failure of classification.

## What the Classifier Is Really Doing

Underneath the thresholds and labels, the logic is simple. The classifier is asking:

- Is there enough flowering signal to interpret?
- Is flowering continuous or seasonal?
- If seasonal, is it early, extended, or late?
- Are there multiple peaks?
- And if not, is the pattern too diffuse to resolve cleanly?

The result is a set of recognisable shapes, given consistent names.

## A Note on Interpretation

This matters particularly for flowering.

The classifier does not describe the full flowering biology of a species. It reflects what is recorded in the field: when flowering is noticed, and therefore when it becomes part of the visible landscape.

Some species may flower over a longer period than is recorded. Others may be overlooked outside their peak. Weather, observer effort, and habitat all influence what is seen.

The classifications should therefore be read as descriptions of **observed flowering visibility**, not definitive phenological limits.

## Why This Approach?

The aim is the same as elsewhere on the site: not complexity, but clarity.

Each feature is simple. Each decision can be followed. Each threshold can be adjusted.

The classifier does not attempt to replace botanical knowledge. It provides a consistent way of describing how flowering is encountered in one place, over time.

## Method Note

The flowering classifier follows the same general approach as the seasonal, breeding, and flight-period classifiers: simple descriptive statistics, transparent thresholds, and a rule-based sequence of decisions.

Unlike the main seasonal classifier, it treats the year as a linear sequence, reflecting the fact that flowering periods are typically bounded within a single annual cycle rather than wrapping across the year boundary.

<div class="no-print">
  <blockquote>
    <p><strong>Classifier Implementation</strong></p>
    <p>The full flowering classifier — including feature extraction and rule set — is available here:</p>
    <p>&rarr; <a href="https://github.com/davewalker5/davewalker5.github.io/blob/main/notebooks/wildlife/year_in_the_life.ipynb">View the classifier on GitHub</a></p>
  </blockquote>
</div>