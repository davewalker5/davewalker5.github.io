---
layout: post
title: "From Flat Surfaces to Living Domes: Completing the Stromatolite Model"
date: 2026-07-01 00:00:01
categories: [field-notes]
tags: [stromatolites, computational-natural-history, modelling, palaeontology, simulation, three-dimensional]
excerpt: "With the biology established and the footprint now resembling a natural stromatolite, the final step was to allow the surface itself to become domed"
assets: "/images/modelling/stromatolites/"
series: stromatolites
series_order: 5
surface_render:
  name: "3d-circular-domed-final-surface-render.png"
  alt: "3-D Circular Domed Model Final Surface Render"
  caption: "3-D Circular Domed Model Final Surface Render"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

By the time the circular three-dimensional model was complete, the project had reached an interesting point:

- The biology was behaving as intended
- The computational framework had been demonstrated in three dimensions
- The footprint now resembled that of a natural stromatolite

Yet the model still had another step to go to reach completion. Viewed from the side, the model remained essentially flat but natural stromatolites are not.

## The Final Geometric Step

Looking back over the project, each stage has addressed one specific question:

- Can the biology explain laminated growth?
- Can it be extended across a surface?
- Can it operate within a three-dimensional volume?
- Can the artificial computational boundary be removed?

The domed model asks one final question.

> Can the surface itself resemble the organisms preserved in the geological record?

## Introducing Curvature

Unlike the previous geometric changes, this stage alters the shape of the growing environment itself.

Instead of beginning from a flat horizontal surface, the simulation now operates on a gently curved dome.

Once again, the underlying ecological processes remain exactly the same, microbial communities still respond to light,  sediment is still deposited, burial still interrupts growth and recovery still produces new generations of microbial mats.

Only the geometry has changed, yet the consequences are surprisingly striking.

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

## When Geometry Matters

One of the most satisfying aspects of this stage is seeing how strongly geometry influences interpretation.

Rather than continually making the biological model more complicated, each stage has explored how far a relatively simple ecological description can be taken by placing it within progressively richer geometries.

The mathematical model has changed very little since the earlier implementations and the ecological assumptions have remained almost identical. Yet simply allowing growth to occur across a domed surface transforms the character of the simulation.

With the domed model, the resulting structure evokes the fossil stromatolites that inspired the project in the first place.

That resemblance does not arise because the model has been instructed to produce a recognisable stromatolite. Rather, it emerges because the biological processes are now operating within a geometry that better reflects nature.

## A Project Built in Layers

There is a pleasing parallel between the subject being modelled and the way the project itself has developed:

> Stromatolites grow by accumulating successive layers

This model has evolved in much the same way:

- The one-dimensional implementation established the ecological processes
- The two-dimensional model demonstrated that those processes scaled across a surface
- The rectangular three-dimensional model proved the numerical framework
- The circular model removed the artificial boundary
- The domed implementation removes the final major geometric simplification

Each stage builds directly upon the previous one. Nothing has been discarded. Everything has been extended.

That progression — from equations describing a single microbial mat to a recognisably stromatolitic form — has been one of the most rewarding aspects of the project.

## Not an End, but a Foundation

Although the domed model represents the most realistic geometry developed so far, it is not intended as the definitive description of stromatolite growth.

Many important processes remain beyond the scope of the current work:

- Hydrodynamics
- Changing sediment transport
- Variable water depth
- Species interactions
- Chemical gradients

Those are all interesting questions for another day.

What the project now possesses is something equally valuable: A computational framework in which those ideas can be explored without redesigning the biological foundations each time.

## Looking Beyond the Science

Reaching this stage also offered an unexpected opportunity.

Once the scientific model was complete, I finally allowed myself something that had been sitting on my “one day” list throughout the project.

> An interactive three-dimensional visualisation

Importantly, this would not change the science. It would simply provide a more engaging way of exploring the results already produced by the model.

That, however, is a story for the next post.

{% include stromatolite-modelling-invitation.html %}