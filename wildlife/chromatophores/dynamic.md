---
layout: default
title: Dynamic Patterns
breadcrumb: Dynamic Patterns
description: Exploring travelling waves, pulses, spreading signals and changing mottles in a cephalopod-inspired chromatophore field
series: chromatophores
chapter: 3
---

# Dynamic Patterns

Static patterns assign one target expansion to each chromatophore and then wait for the field to settle. Dynamic patterns do something different: **the targets themselves continue to change over time**.

The same population of chromatophores remains in place, but each cell continually receives new instructions and attempts to follow them using its current expansion rate, contraction rate and response delay. The visible pattern therefore emerges from two interacting processes:

```text
Changing signal
      ↓
Changing target expansion
      ↓
Chromatophores attempting to follow
      ↓
Visible moving pattern
```

This distinction is important. The simulator is not displaying a sequence of completed images. The cells themselves are expanding and contracting continuously while the instructions move, pulse or change around them.

Both Chromatophore View and Skin View show the same underlying process from different perspectives.

## Travelling Wave

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/travelling-wave.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

Travelling Wave sends a single band of activation from left to right across the field.

Chromatophores near the centre of the band receive the strongest expansion targets. Those towards its edges receive progressively smaller targets, while cells outside the band are asked to contract. The result is a soft moving region rather than a hard-edged stripe.

The band begins beyond the left-hand edge of the field, crosses the whole simulated skin, and finally leaves beyond the right-hand edge before the sequence repeats.

What makes the display interesting is that the wave itself is only a moving pattern of **requested expansion**. Whether the visible chromatophores actually reproduce that shape depends on how quickly they can respond.

With fast response rates, the wave appears relatively crisp. With slow response rates, cells lag behind the moving signal and the visible band becomes broader and softer.

## Radial Pulse

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/radial-pulse.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

Radial Pulse takes the same basic idea and changes the geometry. Instead of moving across the field in one direction, a ring begins at the centre and travels outwards.

Cells closest to the moving ring receive the strongest expansion targets. Cells further inside or outside it receive weaker targets according to their distance from the ring. Once the ring has passed, those cells are asked to contract again. This produces an outward-moving pulse rather than a permanently expanding filled circle.

The important distinction from the static Radial Gradient is that the region of strongest expansion is not fixed - it is a moving front.

## Flash

Flash is the simplest dynamic display. Every chromatophore is given the same alternating instruction:

```text
Expand for 2 seconds
Contract for 2 seconds
Repeat
```

The instruction changes instantly, but the chromatophores do not - they still obey their configured expansion and contraction rates. This makes Flash a particularly clear demonstration of the difference between:

```text
what the controller requests
```

and:

```text
what the simulated tissue is physically able to do
```

At a slow response rate, a fully contracted cell may only have enough time to reach partial expansion before the signal reverses. Increasing the response rate allows the cells to approach each extreme much more closely, producing a sharper and more complete flash.

## Moving Bands

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/moving-bands.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

Moving Bands creates a repeating field of stronger and weaker expansion that travels horizontally. Two bands span the field, with smooth transitions between their strongest and weakest regions. The whole arrangement then moves to the right.

After travelling half the width of the field, each band occupies the previous band's position and the pattern repeats. This differs from Travelling Wave in an important way:

```text
Travelling Wave
    ↓
one isolated band crosses the field

Moving Bands
    ↓
a repeating periodic pattern moves continuously
```

The first behaves like a passing event; the second behaves more like a continuously translating surface pattern.

## Local Excitation

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/local-excitation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

Local Excitation is conceptually different from the other displays because it models a **spreading signal** rather than simply evaluating a geometric pattern at each moment. The signal begins at a central cell and from there it passes to the four immediate neighbours:

```text
    ↑
← centre →
    ↓
```

Those cells then pass the signal onwards in the same way. Once the signal reaches a cell, that cell is asked to expand for a specified time before being told to contract. Since propagation is allowed only horizontally and vertically, not diagonally, the spreading front forms a diamond rather than a circle.

This makes Local Excitation particularly useful as a simple experiment in how **local connectivity influences global form**. The diamond is not explicitly drawn - it emerges from the rule governing which cells are allowed to pass the signal to which neighbours.

The simulator calculates the earliest arrival time of the signal at every cell when the display begins and then reuses those timings for subsequent cycles. The actual expansion state of a cell does not affect how quickly the signal propagates, so this remains a deliberately simple model of spreading activation rather than a feedback system.

A new sequence begins shortly after the final cell's expansion instruction ends.

If contraction rates are slow, some cells may still be shrinking when the next sequence starts.

## Changing Mottle

<figure class="report-figure no-print">
  <div id="video-wrap" class="report-image-wrap">
    <video id="recording-video" class="responsive" controls preload="metadata">
      <source id="recording-source" src="{{ site.assets_url }}/movies/modelling/chromatophores/changing-mottle.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</figure>

Changing Mottle takes the spatially coherent Random Mottle used in the static patterns and turns it into a sequence.

Each field consists of broad irregular patches produced by blending between widely spaced random samples, exactly as in the static Random Mottle pattern.

The important point is that the simulator does not display one finished mottle and then replace it with another. Instead:

```text
Mottle A targets
      ↓
cells move towards them
      ↓
Mottle B targets arrive
      ↓
cells change direction
      ↓
Mottle C targets arrive
      ↓
...
```

The field therefore remains continuous and some cells may still be moving towards one arrangement when the next set of instructions arrives.

This makes Changing Mottle one of the clearest demonstrations of the relationship between **pattern timescale** and **cell response timescale**.

## Display Speed and Response Speed

Dynamic displays introduce two different kinds of speed that should not be confused.

### Display speed

Controls how quickly the **instructions themselves** move or change. For example:

- How quickly a wave crosses the field
- How quickly a pulse expands
- How often a new mottle is generated

### Response speed

Controls how quickly the **chromatophores themselves** expand or contract towards the requested values. The two can therefore be deliberately mismatched. A fast display combined with slow cells produces:

- Visible lag
- Softer boundaries
- Incomplete expansion
- Overlapping transitions

A slower display gives the chromatophores more time to approach each target before the instructions change again.

This distinction is one of the more interesting features of the model because it introduces a simple form of **physical constraint**. The control signal can request anything it likes, but the visible system can only respond at the rate allowed by its simulated cells.

## Response Delay During Dynamic Displays

Response delay introduces another kind of lag. For a static target, delay means waiting before beginning to move but that approach would not work well for a continuously changing signal: if every small target change restarted the countdown, the chromatophore might remain permanently waiting.

Dynamic displays therefore use a different interpretation: A delayed cell follows an **earlier point in the signal's history**.

For example:

```text
delay = 0.5 seconds
```

means:

```text
follow what the display was requesting 0.5 simulation seconds ago
```

rather than:

```text
wait 0.5 seconds every time the target changes
```

When a dynamic display begins, cells initially hold their existing sizes until enough signal history exists. After that, they follow the delayed version of the display continuously.

Changing the delay while the simulation is running changes which historical point is being followed, while the chromatophores themselves still move gradually towards the resulting targets.

This provides another useful way of separating:

```text
signal
```

from:

```text
response
```

and observing what happens when the two become increasingly out of step.

## Watching the System Fail to Keep Up

One of the most useful experiments with the dynamic displays is simply to make them too fast. Start with slow expansion and contraction rates and then increase the display speed. Eventually the requested pattern changes faster than the chromatophores can reproduce it.

The visible field becomes:

- Smoother
- Weaker
- Delayed
- Less sharply defined

That is interesting in itself: The model begins to behave less like a direct renderer of a target pattern and more like a system with its own **response bandwidth** that cannot reproduce every signal equally well.

Try comparing:

```text
slow display + fast cells
fast display + fast cells
slow display + slow cells
fast display + slow cells
```

and switch between Chromatophore View and Skin View while each combination is running.

The underlying control signal may be identical, but the visible outcome can be very different.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include chromatophore-simulator-invitation.html %}
