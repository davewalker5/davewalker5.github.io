---
layout: post
title: "Building in Three Dimensions: Extending the Stromatolite Model into 3D"
date: 2026-06-29 00:00:01
categories: [field-notes]
tags: [stromatolites, computational-natural-history, modelling, simulation, ecology, three-dimensional, mathematics]
excerpt: "Before attempting realistic stromatolite forms, the model first needed to answer a simpler question: could the same ecological processes be extended successfully into three dimensions?"
assets: "/images/modelling/stromatolites/"
series: stromatolites
series_order: 3
surface_render:
   name: "3d-final-surface-render.png"
   alt: "3-D Rectangular Model Final Surface Render"
   caption: "3-D Rectangular Model Final Surface Render"
   credit: "David Walker, Field Notes Journal"
   license: "CC BY 4.0"
   license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

By the time the two-dimensional stromatolite model was complete, the biological side of the project had become remarkably stable:

- Photosynthetic growth
- Seasonal forcing
- Sediment burial
- Recovery after burial

These same ecological processes had now been shown to work both in a single vertical column and across an entire cross-section.

The next challenge was obvious.

> Could exactly the same model be extended into three dimensions?

## Keeping One Thing Constant

One of the recurring themes throughout this project has been resisting the temptation to change everything at once.

It would have been easy to introduce more sophisticated biology, more complicated sediment transport or increasingly realistic environmental interactions.

Instead, I deliberately left all of those alone. The equations governing microbial growth and environmental forcing remained unchanged and only the geometry would evolve.

That design philosophy has become one of the defining characteristics of the project.

- The science stays the same
- The space in which it operates becomes richer

## Why a Rectangular World?

The first three-dimensional implementation was never intended to resemble a natural stromatolite. Instead, it answered a computational question.

> Could thousands of independent growth columns be solved simultaneously across an entire surface while preserving the behaviour already demonstrated in one and two dimensions?

A rectangular domain provided the simplest possible environment in which to answer that question.

- Every location behaves identically
- The numerical implementation is straightforward
- Any unexpected behaviour becomes much easier to diagnose

In other words, the rectangular model is less a geological reconstruction than an engineering prototype.

{% include fullwidth-image.html assets=page.assets img=page.surface_render %}

## From Profiles to Landscapes

Moving into three dimensions changes how the simulation is perceived. The two-dimensional model showed how a slice through the stromatolite evolved over time. The three-dimensional model allows the entire living surface to develop simultaneously.

Patterns that appeared linear in cross-section now become continuous across an area.

Local variations in sedimentation produce subtle differences across the surface while remaining governed by exactly the same ecological rules.

The result is not a collection of separate one-dimensional simulations - it is a coherent growing landscape.


## Separating Biology from Geometry

Perhaps the most encouraging outcome of this stage was how little of the scientific model required revision. Almost all of the work involved extending the computational framework rather than redesigning the biology.

Looking back, this feels like confirmation that beginning with the one-dimensional model was the right decision. The biological assumptions were developed and tested before the additional complexity of higher-dimensional geometry was introduced. Each successive implementation therefore became an exercise in extending a well-understood model rather than continually rewriting it.

That has made the entire project both easier to develop and easier to understand:

- The biology explains how stromatolites grow
- The geometry determines where that growth takes place

Keeping those two ideas separate has made it possible to explore successively more sophisticated geometries without continually reinventing the scientific model underneath.

## A Useful Artificiality

There is something rather satisfying about deliberately building something unrealistic! The rectangular geometry is obviously not how stromatolites grow in nature. Yet it performs an important role in providing confidence that the computational framework scales correctly before introducing more realistic geometries with curved boundaries and changing morphology.

In that sense, it occupies much the same place as a wind tunnel model or an engineering prototype. Its value lies not in faithfully reproducing nature but in demonstrating that the underlying ideas work.

## Looking Ahead

With the numerical framework now operating across a complete three-dimensional surface, attention could finally turn towards the shape of the stromatolite itself.

Natural stromatolites are rarely square.

The next stage of the project therefore replaces the artificial rectangular domain with a circular growth surface, moving one step closer to the geometries found in the geological record while leaving the biological model untouched.

{% include stromatolite-modelling-invitation.html %}
