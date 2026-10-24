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

The default field contains **2,500 chromatophores**, each belonging to one of four pigment groups: yellow, red, brown or very dark brown (labelled Black in the controls).

A 50 × 50 grid still provides the underlying arrangement of instructions. But the visible organs are no longer identical circles lined up with mathematical precision. Their centres are slightly displaced, their maximum sizes differ, and their pigment identities are mixed throughout the field. There are still 625 organs of each pigment class.

This makes a surprising difference to the appearance. Even when every organ receives the same instruction, the field has some of the small irregularities we associate with a natural surface.

The layout is fixed. An organ does not travel across the skin or change its pigment to help form a pattern; it stays where it is and changes its visible size. The same arrangement is used by both views and throughout every experiment.

It is a *cephalopod-inspired* arrangement, rather than a map taken from real cuttlefish tissue.

## Current and Target Expansion

Each chromatophore has an expansion value between 0 and 1:

| Expansion | Meaning |
| --- | --- |
| 0.0 | Fully contracted |
| 0.5 | Halfway through its available radius range |
| 1.0 | Fully expanded |

The distinction between **current expansion** and **target expansion** remains central to the model.

The current value describes the size of an organ now. The target describes the size it is being asked to reach. Selecting a new pattern changes the instructions, not the state of the whole skin in an instant.

A growing chromatophore increases its visible radius, but its area changes more quickly: doubling the radius quadruples the area. A fully contracted organ remains as a tiny dot in Chromatophore View so its position can still be seen.

This is why I find the transitions at least as interesting as the finished patterns. We are watching the same organs respond to different instructions, rather than looking at one image dissolve into another.

## Four Pigments, Different Contributions

The four pigment groups can now be controlled independently. Each has a target-strength setting from 0% to 100%.

This does not recolour an organ or remove it from the field. It changes how far members of that pigment group are asked to expand. The original pattern still determines *where* expansion is requested; the pigment control determines *how strongly* that group responds to the request.

For instance, reducing the dark pigments while leaving yellow and red at full strength can turn a subdued pattern into a much warmer one. Restore the dark groups and the overall colour balance changes again, even though the basic pattern has not been redesigned.

The controls also work during moving displays. They offer a simple way to explore how changing the balance of pigment contributions can alter the whole surface.

## Expansion, Contraction and Timing

The first model moved every chromatophore at the same constant rate. That behaviour is still available as **Uniform timing**.

The applications now start in **Natural timing**. Here, an organ approaches its target smoothly — rapidly at first, then increasingly gently as it gets closer. At the default setting, a typical organ completes about 99% of a target change in a quarter of a second.

Neighbouring organs of the same pigment also share small, fixed differences in how quickly they expand and contract. This creates a little local coordination without making every organ move in perfect step. The variation is established when the field is created; it is not fresh randomness added on every frame.

The two modes make an interesting comparison. Uniform timing is useful for seeing the underlying rule clearly. Natural timing gives the same instructions a less mechanical response.

Expansion and contraction rates remain adjustable separately, so the field can be made to respond quickly or slowly. Neither mode allows a chromatophore to overshoot its requested size.

## Response Delay

A separate delay can be introduced between a new instruction and the response.

For a fixed pattern, this is straightforward: an organ holds its present size briefly before beginning to move towards the new target.

Moving displays need a different approach. A travelling wave, for example, is continually changing its instructions. Restarting the wait each time would leave the cells perpetually behind. Instead, they follow an earlier point in the moving signal's history.

This makes it possible to distinguish the speed of the pattern, the speed of the cells, and the delay between instruction and response. Each can change what we see.

## Two Views of the Same State

The simulator provides two ways of looking at precisely the same population of chromatophores.

### Chromatophore View

Chromatophore View shows the individual pigment discs. It makes the fixed, slightly irregular arrangement clear and lets us follow particular organs as they expand or contract.

This is the view of the mechanism.

### Skin View

Skin View asks a different question: *what might this collection of organs look like as a patch of skin?*

The model begins with a pale backing inspired by reflective structures in cuttlefish skin. Across it lies a gentle blue-green reflection, representing an underlying iridophore contribution. The chromatophores sit above this reflective layer.

An expanded pigment organ does not simply replace whatever lies beneath with a solid colour. Some reflected light is filtered as it passes through the pigment. Yellow and red let through more of the warmer colours; the darker pigments obscure much more of the reflection. The mixture depends on how much of the surface the organs cover.

The simulator combines the contributions of many neighbouring organs to give the impression of a continuous surface rather than thousands of separate discs.

> **Chromatophore View lets us watch the organs changing. Skin View lets us explore the appearance they create together.**

Crucially, switching views changes neither the organs nor their instructions. It only changes how we look at them.

## When the Light Changes

Real cephalopod skin is interesting partly because colour does not come from pigment alone. Reflective structures also contribute, and their appearance can depend on the direction of illumination and observation.

Skin View now allows the **light direction** and **viewing direction** to be adjusted independently. Both are measured relative to looking straight at the flat skin patch.

The simulated reflective layer extends across the skin, but different regions favour slightly different directions. Tilting the light or moving the viewpoint can therefore brighten some areas, quieten others, or shift their blue-green reflection towards blue or violet. The pigment layer continues to filter what comes back through it.

An especially revealing experiment is to press **Hold** and then change the angles. Every chromatophore retains exactly the same expansion, yet the apparent skin colour can still change.

This is not a three-dimensional rendering of a rotating animal, and the angle-dependent colours are illustrative rather than measured. It is a way of exploring an important distinction: **an animal's apparent colour can change even when its pigment organs do not**.

## Time and Simplifications

Movement is measured in simulation time, not simply in frames drawn on the screen. After a long interruption the application advances by a limited step rather than jumping abruptly through a transition.

There is much the model deliberately leaves out. It does not simulate the muscles surrounding individual chromatophores, fatigue, tissue damage, a complete optical spectrum, polarisation or the raised skin structures known as papillae. Its irregular organ layout, coordinated timing and reflective properties are approximations inspired by biology, not measurements of an individual animal.

Those omissions matter, but they are also part of the point. By keeping the system understandable, it becomes possible to ask which visible effects come from the instructions, which come from the organs' responses, and which come from the way light meets the surface.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include chromatophore-simulator-invitation.html %}
