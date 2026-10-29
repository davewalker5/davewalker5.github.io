---
layout: default
title: The Chromatophore Model
breadcrumb: The Chromatophore Model
description: Exploring how individually controlled pigment organs, their responses and the interaction of pigment with light create a changing cephalopod-inspired skin surface
series: chromatophores
chapter: 1
---

# The Chromatophore Model

A cuttlefish can alter the appearance of its skin with astonishing speed. Much of this change comes from chromatophores: tiny pigment-containing organs that expand to reveal more colour and contract to reveal less. Across the skin, the combined activity of many such organs can produce bands, spots, mottles and rapidly changing displays.

The Chromatophore Simulator explores this principle by giving thousands of individual pigment organs a position, a colour and a changing visible size. It also considers something that is easy to overlook: the colour we see depends not only on pigment, but on the light reflected from structures beneath it.

This is a deliberately simplified, *cephalopod-inspired* model, rather than a reconstruction of a particular animal's physiology. Its purpose is to make the relationships between individual behaviour, coordinated patterns and visible appearance easier to explore.

## The Field and Its Cells

The default simulated skin contains **2,500 chromatophores**, drawn from four pigment groups: yellow, red, brown and very dark brown (labelled Black in the controls). There are 625 organs of each kind.

To give all those organs instructions, the simulator divides the field conceptually into **50 rows and 50 columns**. Think of this as a map of 2,500 locations at which a pattern can request a particular degree of expansion. A checkerboard, for example, assigns one instruction to some regions of the map and a different instruction to the neighbouring regions. A travelling wave sends changing instructions across it.

**The grid organises the instructions; it does not dictate an exact geometric arrangement of the visible organs.** Each chromatophore belongs to one location on that map, but its centre is placed a little to one side of the ideal grid point. Its maximum size also varies, and the four pigment types are distributed across the field rather than repeating in a neat sequence.

Consequently, even when every organ is asked to expand by the same amount, the visible surface has small variations in spacing, size and colour. These are intentional features of the model, not changes caused by the pattern itself.

Each organ remains in the same place, keeps the same pigment and retains its own maximum size throughout an experiment. Patterns form because the organs change how much pigment they expose, not because they move around the skin. The arrangement is reproducible, although it is not intended to reproduce the anatomy of an actual cuttlefish.

## Current and Target Expansion

Each organ has two related values: **its current expansion**, which describes how large it is at this moment, and **its target expansion**, which describes how large it has been asked to become.

Both are expressed on a scale from 0 to 1:

| Expansion | Meaning                                    |
| --------- | ------------------------------------------ |
| 0.0       | Fully contracted                           |
| 0.5       | Halfway through its available radius range |
| 1.0       | Fully expanded                             |

When a new pattern is selected, the simulator changes the target values. The chromatophores then expand or contract towards them. The surface is not instantly replaced with a new image: the transition is part of what we can observe.

As a chromatophore expands, its visible radius increases. The area it covers increases more quickly, since doubling a circle's radius quadruples its area. In Chromatophore View, even a fully contracted organ retains a tiny dot so that its position can be seen.

I find these transitions at least as interesting as the completed patterns. They reveal that a changing surface can emerge from the continuing activity of the same underlying population.

## Four Pigments, Different Contributions

The four pigment groups have independent controls, each allowing their target strength to be set between 0% and 100%.

These settings do not change an organ's colour or move it to another part of the field. Instead, they scale the expansion requested of organs belonging to that pigment group. The selected pattern determines the distribution of instructions across the skin; the group controls determine how strongly each pigment participates.

For example, a mottled pattern may look relatively dark when all four groups contribute fully. Reduce the brown and very dark brown targets, and the yellow and red contributions become more prominent. The pattern's arrangement has not been redesigned, but its colour balance can look quite different.

The same experiment works with moving displays. A travelling wave can pass across the field while one pigment group responds strongly and another remains comparatively subdued.

## Expansion, Contraction and Timing

A chromatophore's target and its actual size are not necessarily the same, because movement takes time. The simulator offers two ways of representing that movement.

**Natural timing**, the default in the applications, makes each organ approach its target smoothly: movement is faster at first and becomes gentler as it nears the requested size. At the default rates, a typical organ completes about 99% of a target change in a quarter of a second.

Nearby organs of the same pigment also share small, persistent differences in their expansion and contraction speeds. This creates a degree of local coordination without making every chromatophore move in perfect synchrony. Those differences belong to the field's fixed behaviour; they are not newly randomised each time an image is drawn.

**Uniform timing** provides a useful comparison. Here, organs move towards their targets at a constant rate, without local differences. At the default rate of 4 expansion units per second, a full movement from 0 to 1 takes a quarter of a second. The two modes therefore describe different kinds of motion, even when the control shows the same rate.

Expansion and contraction rates can be adjusted independently in either mode. Slower settings make it easier to see cells falling behind a rapidly changing display; faster settings allow the surface to follow changing instructions more closely. Neither mode lets an organ overshoot its target.

These behaviours are illustrative approximations, not measured muscle responses from a particular species.

## Response Delay

Response delay adds another distinction between an instruction and the movement that follows it.

For a fixed pattern, the idea is straightforward: when an organ receives a new target, it can remain at its current size for a chosen period before beginning to move.

A moving display needs a different treatment. Consider a travelling wave whose target values are changing continuously. If every new value restarted the waiting period, the cells might never begin to respond. Instead, the display can be followed **as it was a little earlier**, using its signal history.

This gives us three separate things to investigate: how quickly the pattern changes, how quickly the organs can move, and how long the response is delayed. Each affects the final appearance, sometimes in quite unexpected ways.

## Two Views of the Same State

The simulator offers two views of exactly the same population of chromatophores. They answer different questions.

### Chromatophore View

Chromatophore View draws the individual pigment organs as separate coloured discs. We can see where each organ sits, which pigment it contains and how far it has expanded. It is particularly helpful when following a transition or comparing the response of different pigment groups.

This is the view of the individual mechanism.

### Skin View

Skin View asks a broader question: *what might these thousands of changing pigment organs look like together as a patch of skin?*

The simulated skin has a pale underlying backing, inspired by the diffuse reflection associated with **leucophores**, and a blue-green reflective contribution inspired by **iridophores**. These structures sit beneath the pigment organs in the model.

The pigment does not simply paint an opaque colour over everything below it. Light returning from the reflective layer is filtered by the pigment covering it. Yellow and red pigments allow relatively more warm-coloured light to contribute, while the darker pigments greatly reduce the reflection beneath them. How much pigment is expanded determines how much of the backing remains exposed and how much is seen through colour-filtering pigment.

The simulator combines these effects across the field to create an impression of a continuous surface. It is a visual approximation rather than a measurement of light travelling through real skin.

> **Chromatophore View shows what the individual organs are doing. Skin View explores the appearance they create together.**

Switching between the views does not change the state of a single organ or interrupt a display. Only the way we observe the field changes.

## When the Light Changes

Colour in cephalopod skin is not solely a matter of pigment. Some of its appearance comes from microscopic structures that reflect light selectively. Their contribution may vary with the direction from which light arrives and the direction from which we observe it.

In Skin View, the **light direction** and **viewing direction** can be adjusted independently. Both are expressed relative to a line perpendicular to the flat skin patch: 0° means straight on, while positive and negative angles move to opposite sides of that direction.

The reflective contribution is spread across the simulated skin, with different regions favouring slightly different directions. Changing the angles can therefore brighten some areas, weaken others or shift an illustrative blue-green reflection towards blue or violet. The chromatophore pigments continue to filter the reflected light.

A particularly revealing experiment is to press **Hold**, freezing the chromatophores at their current sizes, and then adjust the light and viewing directions. The organs do nothing at all, yet the apparent colour of the skin can change.

The patch itself remains flat: the simulation is not rotating an animal or reconstructing the complete optical properties of its skin. Nevertheless, it illustrates an important principle: **a surface can appear to change colour without any change in its pigment organs.**

## Time and Simplifications

The simulation measures movement in elapsed simulation time rather than simply counting the frames drawn on screen. If the application is interrupted, it limits the next advance rather than jumping abruptly through a long stretch of activity.

Many aspects of living cephalopod skin lie beyond this model. It does not simulate the detailed muscle mechanics of individual chromatophores, fatigue, tissue damage, a complete optical spectrum, polarisation or the raised skin structures called **papillae**. The organ layout, coordinated timing and reflective behaviour are designed to illustrate biological ideas, not to reproduce measurements from a particular animal.

Those limitations are important, but the simplification is also what makes the model useful. We can separate the instructions that organise a pattern from the responses of individual organs, and both from the way light interacts with the resulting surface.

What emerges is not just an image, but a way of exploring **how behaviour, structure and observation combine to produce appearance**.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include chromatophore-simulator-invitation.html %}
