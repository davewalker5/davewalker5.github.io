---
layout: default
title: Wildlife Seasonal Modelling
description: Explorations of simple models that reproduce seasonal patterns, illustrating how presence and detectability can give rise to the observed variation
breadcrumb: Wildlife Seasonal Modelling
---

# Wildlife Seasonal Modelling

The Seasonal Analyses describe the year through observation — repeated encounters with species, recorded over time and examined for pattern.

The models take a different approach. Rather than describing what is seen, they explore what simple processes might give rise to those patterns. Each model begins with a small set of assumptions — about presence, detectability, and seasonal change — and asks whether these are sufficient to reproduce the curves observed in the data.

Across species, three distinct ways of occupying the year emerge.

Some species are present only for part of the year, appearing within a defined seasonal window before disappearing again. Others are present throughout the year, but vary in how readily they are observed, their detectability rising and falling with behaviour and conditions. A third group — winter visitors — spans the year boundary, arriving in autumn, peaking in winter, and departing in spring.

These differences suggest three complementary models:

- **Seasonal presence**, where activity is confined to a bounded window  
- **Resident detectability**, where presence is continuous but visibility varies  
- **Winter presence**, where activity wraps around the year boundary with a winter peak  

Each model is deliberately simple. They do not attempt to capture ecological processes in detail, nor are they intended to predict future observations. Instead, they act as a way of testing whether the broad patterns seen in the analyses can arise from straightforward mechanisms.

More recently, these models have been fitted to observed data. This allows each species to be described not only by its pattern, but by a small set of parameters — timing, duration, and shape — that together form a simple seasonal “signature”.

In this way, the models sit alongside the observations. The analyses describe how species occupy the year; the models ask how those patterns might come to be, and provide a consistent way of comparing them.

## Available Models

{% include landing-section.html title_column_name="Title" items=site.data.wildlife_models category="models" %}

## Interpretation

These models are deliberately simple and abstract — closer to minimal representations than detailed ecological mechanisms — and are intended to explore whether the observed patterns can arise from a small number of underlying processes, not to predict observations.

{% include ode-solver-invitation.html %}
