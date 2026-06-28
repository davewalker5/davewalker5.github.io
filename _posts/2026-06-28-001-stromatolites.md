---
layout: post
title: "From Columns to Landscapes: Extending the Stromatolite Model into Two Dimensions"
date: 2026-06-28 00:00:01
categories: [field-notes]
tags: [stromatolites, computational-natural-history, modelling, ecology, simulation, palaeontology]
excerpt: The first stromatolite model explained vertical growth. The next step was to ask what happens when that same biology is allowed to operate across an entire surface
assets: "/images/modelling/stromatolites/"
series: stromatolites
series_order: 2
final_cross_section:
   name: "2d-final-cross-section.png"
   alt: "2-D Cross-Sectional Model Final Cross Section"
   caption: "2-D Cross-Sectional Model Final Cross Section"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
surface_snapshots:
   name: "2d-surface-snapshots.png"
   alt: "2-D Cross-Sectional Model Surface Snapshots"
   caption: "2-D Cross-Sectional Model Surface Snapshots"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

The first version of the stromatolite model answered a very specific question.

> Could a relatively simple ecological model reproduce the repeated cycle of microbial growth, sediment burial and renewed colonisation responsible for producing laminated stromatolites?

The answer appeared to be yes.

The one-dimensional model produced layered growth naturally, with each lamina emerging from the interaction between biology and environmental forcing rather than being explicitly programmed.

But it also highlighted an obvious limitation: Real stromatolites are not columns, they are surfaces.

## The Next Question

One of the principles I’ve tried to follow throughout this project is to change only one thing at a time.

The biological model was behaving well. Seasonality, light attenuation and sediment burial were all producing believable behaviour, and extensive diagnostic plots made it possible to understand why the model behaved as it did.

So rather than making the biology more complicated, I asked a different question.

> What happens if exactly the same biological model is applied simultaneously across an entire cross-section?

Nothing about the ecology changes. Only the geometry.

{% include fullwidth-image.html assets=page.assets img=page.final_cross_section %}

## Preserving the Biology

One of the more satisfying aspects of this stage was how little of the underlying mathematics required modification.

Each point across the growing surface still behaves like the original one-dimensional model.

Every location experiences its own cycle of growth, burial and recovery using exactly the same equations developed previously.

The difference is that hundreds of these individual columns are now solved simultaneously, producing an evolving surface rather than a single vertical profile.

That separation between biological process and computational geometry has become one of the guiding ideas of the project:

- Improve the geometry
- Leave the biology alone unless there is a compelling scientific reason to change it

## Seeing Growth Become Shape

Moving into two dimensions transforms what the model can reveal. Instead of watching one location accumulate sediment through time, it becomes possible to observe how different parts of the stromatolite experience subtly different environmental histories.

- Burial events affect the whole surface
- Seasonal forcing influences every location simultaneously

Yet the cumulative effect is an evolving structure whose morphology emerges naturally from the interaction of these simple processes.

{% include fullwidth-image.html assets=page.assets img=page.surface_snapshots %}

## Why Stop at Two Dimensions?

Interestingly, two dimensions were never intended to be the final goal. Instead, they served as a bridge.

By demonstrating that the biological model scaled naturally from a single column to an entire cross-section, the project gained confidence that the same approach could be extended further.

The question was no longer whether the equations worked, it was whether they could describe an entire three-dimensional stromatolite.

## Looking Ahead

The next stage does not introduce new biology. Instead, it asks another geometric question.

> If the same ecological processes can be applied across a two-dimensional surface, can they also be extended across a complete three-dimensional volume?

That would become the first genuinely three-dimensional version of the model. As before, the aim is not realism for its own sake. It is to understand how far a simple ecological model can be taken before additional biological complexity becomes necessary.

One thing has become increasingly clear as this project has developed. The interesting part is not producing increasingly elaborate simulations, rather it is discovering how much complexity can emerge from relatively simple ecological rules when those rules are allowed to operate in progressively richer geometries.

That, perhaps more than anything else, is what this project is exploring.

{% include stromatolite-modelling-invitation.html %}