---
layout: default
title: Under the Hood - How the Flight Period Classifier Works
description: A closer look at how butterfly flight periods are described and classified from seasonal records
breadcrumb: Flight Period Classifier
---

## Under the Hood: How the Flight Period Classifier Works

The flight period categories on this site are derived in much the same way as the seasonal and breeding classifications: from a small set of simple measurements and a sequence of transparent decisions.

But once again, the signal being described is different.

Rather than asking how a species occupies the year as a whole, or when reproduction becomes visible, the flight period classifier asks:

> how the period of adult activity is distributed through the year

For butterflies, this signal is often particularly clear. Adult flight is typically confined to defined windows, shaped by temperature, development, and the timing of successive broods. What emerges from the data is not just presence, but structure: peaks, troughs, and the overall shape of activity.

What follows is a look at how that structure is described.

## From Records to Shape

As with the other classifiers, everything begins with two monthly summaries:

- Total sightings by month — how many individuals were recorded
- Presence by month — on how many days the species was observed

For butterflies, these two measures tend to align closely. Observations are usually of single individuals or small numbers, and detectability is generally high when conditions are suitable.

For that reason, the flight period classifier treats presence as its primary signal, with counts retained as a secondary measure of relative intensity. Presence answers the central phenological question most directly:

> When in the year is the species actually being encountered in flight?

Counts remain useful, but mainly as supporting context. In most cases they reinforce the same seasonal structure already visible in the presence data.

## What the Signal Means

It is important to be clear about what is being measured.

The classifier does not attempt to identify life stages directly. It does not distinguish between emergence, mating, or egg-laying.

Instead, it describes a field-based proxy:

> When adult butterflies are in flight and therefore observable

This distinction matters.

A dip in the curve does not necessarily mean literal absence in a strict biological sense. It may reflect the transition between broods, a period of low adult activity, or simply conditions under which observation is less likely.

The classifier therefore describes the shape of observed flight activity, not the full life cycle behind it.

## The Basic Descriptors

The first step is simply to describe what is there.

### Occupancy

> In how many months is the species active?

This is counted as the number of months with recorded activity. A tightly constrained spring species differs markedly from one present across much of the year.

### Span

The classifier identifies the first and last months of activity, and measures the span between them.

This provides a simple sense of how much of the calendar the flight period occupies. But span on its own is not enough. A long season may still contain clearly separated broods, and the classifier therefore treats span as a secondary feature rather than a defining one.

### Peaks

A central feature of butterfly phenology is the presence of distinct peaks.

The classifier identifies:

- The number of significant peaks in the seasonal curve
- The timing of those peaks
- Their relative prominence

A single peak suggests a single brood. Multiple peaks may indicate successive broods or distinct phases of activity.

### Troughs and Separation

Equally important is what happens between peaks.

Rather than asking only whether activity falls to zero, the classifier asks whether there is a meaningful dip between adjacent peaks. In practice this is more useful, because many brood-structured species do not disappear completely between phases of activity, but they do show a marked reduction.

This helps distinguish between:

- Two peaks that are genuinely separated
- Several peaks that overlap into a more continuous seasonal pattern

In other words, the classifier gives priority to structure rather than simply to duration.

### Width

Not all peaks are equally sharp.

Some species show narrow, concentrated peaks. Others rise and fall more gradually, producing broader curves.

To capture this, the classifier measures how many months fall within the core of activity — defined as those exceeding a fraction of the peak.

### Concentration

The classifier also considers how strongly activity is concentrated.

A single, dominant peak produces a very different curve from one in which activity is spread more evenly across several months.

This is captured by comparing the height of the peak to the overall distribution of values.

## Presence vs Counts

The classifier uses presence as the main timing signal.

This reflects the way butterfly records behave in practice. Presence usually captures the seasonal rhythm clearly, while counts can be influenced by short-lived local bursts or repeated observations of the same small area under favourable conditions.

Counts are therefore best understood as a secondary layer. They can show the relative strength of activity, but they are not usually needed to identify the overall shape of the flight period.

In most cases, presence and counts tell the same story. Where they differ, presence is given priority.

## From Description to Decision

Once these features have been calculated, the classifier applies a sequence of simple rules.

As with the other classifiers, the order matters. The clearest cases are identified first, followed by more complex or ambiguous patterns.

The most important feature of the updated logic is this:

> Peak structure is interpreted before broad span is allowed to imply an extended pattern

This prevents long but clearly brood-structured species from being mistaken for migratory or weakly structured ones.

### 1. Is there enough data?

If activity is extremely sparse, or confined to a single isolated month, the signal is treated as too weak to interpret confidently.

| Condition                        | Classification               |
| -------------------------------- | ---------------------------- |
| Very sparse or isolated activity | Sparse / insufficient signal |

### 2. Is there a single, well-defined peak?

If the signal contains a single dominant peak, the classifier asks how broad that peak is.

| Pattern                    | Classification          |
| -------------------------- | ----------------------- |
| Narrow, concentrated peak  | Single brood (spring)   |
| Broader, more gradual peak | Single brood (extended) |

This distinction captures the difference between a tightly bounded spring emergence and a more prolonged single seasonal window.

### 3. Are there two clear peaks?

If two peaks are present, the classifier then asks whether they are meaningfully separated by a trough.

If they are, two different interpretations are possible.

| Pattern                                                                   | Classification                |
| ------------------------------------------------------------------------- | ----------------------------- |
| Two distinct peaks, with an early-season peak and a later return          | Bimodal (overwintering adult) |
| Two distinct peaks, separated by a marked dip, consistent with two broods | Bimodal (separated broods)    |

The first pattern is typical of species such as Brimstone or Peacock, where adults overwinter and reappear later in the year. The second is intended for species whose two broods are clearly separated, but which do not fit the overwintering-adult pattern.

If two peaks are present but not strongly separated, the classifier treats them differently:

| Pattern                                           | Classification            |
| ------------------------------------------------- | ------------------------- |
| Two peaks, but without a strong separating trough | Multi-brood (overlapping) |

This reflects overlapping broods or a more continuous sequence of emergence.

### 4. Are there three or more peaks?

If several peaks are present, the classifier treats the pattern as multi-brood, while still asking whether the brood structure is clearly separated or more blended.

| Pattern                                                | Classification            |
| ------------------------------------------------------ | ------------------------- |
| Multiple peaks with at least one meaningful separation | Multi-brood               |
| Multiple peaks without strong separation               | Multi-brood (overlapping) |

This distinction allows the classifier to describe both clearly staggered broods and more continuous seasonal activity.

### 5. Is the activity extended and weakly structured?

Only after the peak-based possibilities have been considered does the classifier ask whether the activity is simply broad, weakly concentrated, and lacking clear brood structure.

| Pattern                                                                               | Classification       |
| ------------------------------------------------------------------------------------- | -------------------- |
| Broad, weakly structured activity across many months, without clearly separated peaks | Extended / migratory |

This is typical of species whose activity is prolonged and not easily reducible to one or two brood-defined peaks, including migratory species or those influenced by arrivals from outside the local area.

### 6. And if none of those quite fit?

Some patterns are real, but do not fall cleanly into one of the above categories.

| Pattern                           | Classification       |
| --------------------------------- | -------------------- |
| Present, but not cleanly resolved | Mixed / transitional |

As with the other classifiers, this reflects the limits of the signal rather than a failure of the method.

## What the Classifier Is Really Doing

Underneath the thresholds and labels, the logic is simple. The classifier is asking:

- Is there enough activity to interpret?
- How many peaks are present?
- Are those peaks meaningfully separated by troughs?
- Is the signal narrow, broad, brood-structured, or extended?

From these questions, a small number of recurring shapes emerge.

The key point is that the classifier now gives priority to shape before extent. A long season is not automatically treated as extended or migratory if the underlying curve clearly resolves into distinct broods.

## A Note on Interpretation

The flight period classifier does not describe the full life history of a species.

It does not identify broods directly, nor does it distinguish with certainty between local emergence and migratory arrival. It works from what is observed: the presence of adult butterflies in flight.

The categories should therefore be read as descriptions of observed flight structure, not as definitive statements about breeding strategy or population dynamics.

A bimodal pattern may reflect overwintering behaviour. A separated-broods pattern may reflect successive broods. An extended pattern may reflect migration or a prolonged season of local activity. These interpretations remain ecological readings of the pattern rather than explicit claims made by the classifier itself.

## Why This Approach?

The aim is the same as elsewhere in the project: not maximum complexity, but readable structure.

Each feature is simple. Each decision can be followed. Each threshold can be adjusted.

The classifier does not impose a narrative. It identifies recurring shapes and gives them names, making differences between species easier to see, compare, and think about.

## Method Note

The flight period classifier follows the same general approach as the seasonal and breeding classifiers: simple descriptive measures, transparent thresholds, and a rule-based sequence of decisions.

Unlike the main seasonal classifier, which treats the year as circular, the flight period classifier generally treats it as a linear sequence. Butterfly activity is typically confined to a single part of the year or to distinct phases within it, rather than wrapping across the year boundary.

The updated version also places particular emphasis on the detection of meaningful troughs between peaks. This allows brood-structured curves to be recognised even when activity does not fall completely to zero between phases.

<div class="no-print">
  <blockquote>
    <p><strong>Classifier Implementation</strong></p>
    <p>The full flight period classifier — including feature extraction and rule set — is available here:</p>
    <p>→ <a href="https://github.com/davewalker5/davewalker5.github.io/blob/main/notebooks/wildlife/year_in_the_life.ipynb">View the classifier on GitHub</a></p>
  </blockquote>
</div>
