---
layout: post
title: "Removing the Corners: Towards More Realistic Stromatolite Geometry"
date: 2026-06-30 00:00:01
categories: [field-notes]
tags: [stromatolites, computational-natural-history, modelling, simulation, palaeontology, three-dimensional]
excerpt: "Having demonstrated that the model could operate across a three-dimensional surface, the next challenge was to replace the artificial rectangular domain with something closer to the geometry of natural stromatolites"
assets: "/images/modelling/stromatolites/"
series: stromatolites
series_order: 4
surface_render:
  name: "3d-circular-final-surface-render.png"
  alt: "3-D Circular Masked Model Final Surface Render"
  caption: "3-D Circular Masked Model Final Surface Render"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

The first three-dimensional version of the stromatolite model achieved its primary objective.

It demonstrated that the ecological model developed in one dimension could be extended successfully across an entire three-dimensional surface without altering the underlying biology.

There was, however, one obvious problem - nature rarely grows in rectangles.

## From Engineering Prototype to Geological Model

The rectangular geometry had served exactly the purpose for which it was designed.

- It was computationally straightforward
- It was easy to visualise
- It provided confidence that the numerical framework scaled correctly into three dimensions

But it was never intended to represent a real stromatolite.

The next step therefore wasn’t to improve the biology, it was to improve the geometry.

## Removing the Artificial Boundary

Rather than allowing growth across a square computational grid, the model now restricts active growth to a circular domain.

This may sound like a relatively modest change, but it alters the character of the simulation surprisingly strongly.

Instead of producing a flat-topped square surface, growth now occurs within a footprint much closer to that of many natural stromatolites.

The simulation immediately begins to look less like a numerical experiment and more like a geological structure.

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

## The Biology Doesn’t Notice

One of the most satisfying aspects of this stage is that, from the perspective of the microorganisms, nothing has changed.

- The microbial communities continue to respond to light, temperature and sediment burial exactly as they always have
- The governing equations are identical
- The environmental forcing is identical

Only the region in which growth is permitted has changed.

That separation between ecological process and computational geometry continues to prove remarkably useful.

Each stage of the project refines the environment in which the biology operates while leaving the biology itself largely untouched.

## A Better Approximation

Although the circular model remains an idealisation, it represents an important conceptual step. 

The simulation is no longer merely solving equations across an arbitrary computational grid. Instead, it begins to approximate the footprint of an individual stromatolite. Viewed from above, the model now possesses a coherent overall form that is recognisably biological rather than computational.

Looking back, the circular model feels like the point at which the project began to move beyond demonstrating computational techniques.

The earlier stages established confidence in the biology and the numerical implementation. This stage begins asking a different question:

> Does the model now look like the thing it is trying to represent?

The answer, for the first time, feels encouragingly close to "yes."

## Learning from Simplicity

One of the recurring lessons of this project has been that relatively small geometric changes can have surprisingly large effects on how a model is interpreted.

Scientifically, the circular implementation differs very little from the rectangular version. Visually, however, it crosses an important threshold.

It becomes much easier to imagine how successive layers might accumulate into the structures preserved in the geological record.

That shift in perception is valuable because it helps distinguish which aspects of the simulation arise from the ecological model and which arise from the geometry chosen to represent it.

## Still Not the End

Despite representing a considerable improvement, the circular model still contains an obvious simplification.

Real stromatolites rarely grow as flat-topped cylinders. Instead, many develop gently domed morphologies as successive generations of microbial growth build upward over time.

The footprint was now becoming realistic but the topography still was not.

## Looking Ahead

The next stage of the project therefore asks perhaps the most satisfying geometric question so far.

> What happens if the computational domain itself is allowed to become domed?

Unlike the transition from rectangular to circular geometry, this change does not simply alter the outline of the model.

It changes the shape of the growing surface itself, bringing the simulation another step closer to the morphology of natural stromatolites.

{% include stromatolite-modelling-invitation.html %}