---
layout: default
title: The Chromatophore Model
breadcrumb: The Chromatophore Model
description: A simplified computational model of cephalopod-inspired chromatophores, exploring how many small pigment organs can combine into a changing skin surface
series: chromatophores
chapter: 1
---

# The Chromatophore Model

The simulator begins with a deliberately simple idea: treat each chromatophore as a small pigment organ with a fixed position and colour, but a changing visible size.

Thousands of these individual elements make up the simulated skin. Each one responds independently, but together they create the larger patterns seen elsewhere in the project.

The model is intentionally simplified. It is not intended as a detailed reconstruction of cephalopod skin physiology; instead, it provides a way to explore how changing the state of many small components can produce a coherent and dynamic surface.

## The Field and its Cells

The default field contains **2,500 chromatophores**, arranged in a 50 × 50 grid.

Each cell has:

- A fixed position
- A fixed pigment class
- A current expansion value
- A target expansion value

Even when many cells receive the same instruction, they remain independent objects and continue to update their own state.

Four pigment classes repeat across the field:

```text
Yellow  Red    Yellow  Red    ...
Brown   Black  Brown   Black  ...
Yellow  Red    Yellow  Red    ...
```

There are 625 cells of each class.

The colours occupy alternating positions rather than overlapping layers, and pigment identity does not change as the cell expands or contracts. The palette is chosen for visual clarity rather than exact biological accuracy.

This arrangement is therefore best thought of as a computational abstraction: enough structure to make coordinated pattern changes visible without attempting to reproduce the full complexity of real cephalopod skin.

## Current and Target Expansion

Each chromatophore has an expansion value between 0 and 1:

| Expansion | Meaning                                    |
| --------- | ------------------------------------------ |
| 0.0       | Fully contracted                           |
| 0.5       | Halfway through the available radius range |
| 1.0       | Fully expanded                             |

The distinction between **current expansion** and **target expansion** is important.

The current expansion is the cell's visible size now. The target expansion is the size it is moving towards.

Changing a pattern therefore does not instantly redraw the field. Instead, it changes the target values and allows the existing cells to move gradually towards them.

That transition is a central part of the model: the interest lies not only in the final pattern, but in watching the field reorganise itself.

The visible radius of each chromatophore grows steadily with expansion. Because the area of a circle increases with the square of its radius, visible pigment coverage grows more rapidly than the radius itself.

A fully contracted cell remains visible as a tiny dot in Chromatophore View so that its position can still be inspected.

## Expansion and Contraction

Expansion and contraction are controlled independently.

Both default to **0.25 expansion units per second**.

At that rate:

```text
0.0 → 1.0 = 4 seconds
0.2 → 0.8 = 2.4 seconds
```

The simulator updates each cell according to elapsed simulation time. If a movement would carry the cell beyond its target, it stops at the target rather than overshooting.

The interface allows expansion and contraction rates of:

```text
0.25
0.5
1
2
4
```

units per second.

Changing these rates alters how quickly the field responds to new patterns and makes it possible to compare slow, gradual transitions with much more rapid displays.

## Response Delay

A separate response delay can be introduced between receiving a new target and beginning movement.

For a fixed pattern, the cell holds its current size until the delay has expired.

If the target changes again, a new response countdown begins.

The available delays are:

```text
0
0.25
0.5
1
2
```

seconds.

This makes it possible to experiment with the effect of latency as well as speed.

For continuously changing displays, delay is handled differently. Instead of repeatedly starting a new countdown, the cell follows an earlier point in the signal's history. This allows the display to remain dynamic while still showing the effect of lag.

## Two Views of the Same State

One of the most useful aspects of the simulator is that the same underlying state can be viewed in two different ways.

### Chromatophore View

Chromatophore View draws the cells individually.

It makes it possible to inspect:

- pigment class;
- current size;
- transitions between states;
- the behaviour of individual cells.

This is the view of the mechanism.

### Skin View

Skin View instead estimates the combined appearance of neighbouring cells.

Pigment coverage is mixed with the pale background skin, neighbouring samples are averaged, and the result is enlarged and blended into a continuous surface.

For the default 50 × 50 field, this produces a 25 × 25 set of colour samples that are expanded to fill the skin area.

A modest contrast boost is applied to make differences easier to see.

This is the view of the emergent result.

The important point is that both views are showing the same simulation state:

> **Chromatophore View shows what the individual cells are doing; Skin View shows what their combined behaviour looks like.**

Switching between them does not alter the cells, their targets, their response settings or any movement already in progress.

The Skin View is an approximation of combined appearance, not a biological model of light passing through real cephalopod skin.

## Time and Simplifications

Movement is based on simulation time rather than frame count.

The amount of time that can advance in a single frame is limited, so returning to the application after a long interruption produces a small step rather than causing the simulation to jump directly to a later state.

The current model also deliberately omits many aspects of real chromatophore biology.

Cells do not currently include:

- Fatigue
- Damage
- Muscle mechanics
- Individual response-rate differences

The field shares one expansion rate and one contraction rate, although every cell still retains its own current size, target and response delay.

These limitations are deliberate.

The simulator is intended as an exploratory model of **coordination and pattern emergence**, not as a complete physiological reconstruction.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include chromatophore-simulator-invitation.html %}
