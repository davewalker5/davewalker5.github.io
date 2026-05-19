---
layout: default
title: Winter Visitor Model
description: A model representing species that are present only during the winter, with a winter peak, activity spanning the year boundary, and near-absence through spring and summer
series: modelling
chapter: 3
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Seasonal Modelling
    url: /wildlife/modelling/index.html
  - name: Winter Visitor Model
    url: /wildlife/modelling/winter.html
---

# Winter Visitor Model

This model represents species that are **present only during the winter period**, with a winter peak, activity spanning the year boundary, and near-absence through spring and summer.

It provides a minimal explanation for patterns seen in the seasonal analysis of observations, showing that a small number of simple processes can produce:

- Winter-centred presence  
- Distinct arrival phases  
- Extended absence through summer  

The model does not attempt to describe detailed ecological mechanisms. Instead, it offers a way of understanding how seasonal structure and timing combine to produce the observed patterns.

## Concept

This model describes species that are present during the winter months, with activity spanning the end and beginning of the year.

It answers the question:

> When is the species present?

Like the seasonal model, presence is limited to part of the year. Unlike it, the active period crosses the year boundary.

The model defines a **seasonal target**, representing expected activity through the year. The observed signal then adjusts towards this target over time.

The target combines:

- A **winter component**, representing peak presence  
- An optional **autumn component**, representing arrival  
- A **summer suppression**, reducing activity during the off-season  

Together, these produce a cycle that rises through autumn, peaks in winter, and falls away into spring.

## Model Parameters

A small number of parameters control the behaviour of the model:

| Parameter     | Purpose                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| INITIAL_Y     | Sets the starting value of the modelled signal                                 |
| BASELINE      | Sets any persistent background level (typically near zero for winter visitors) |
| WINTER_WEIGHT | Controls the strength of the winter peak                                       |
| AUTUMN_WEIGHT | Controls the strength of the autumn arrival phase                              |
| SUMMER_DIP    | Controls the strength of the summer suppression                                |
| WINTER_PEAK   | Sets the timing of peak winter presence                                        |
| AUTUMN_PEAK   | Sets the timing of autumn arrival                                              |
| SUMMER_LOW    | Sets the timing of lowest summer activity                                      |
| WINTER_WIDTH  | Controls how concentrated the winter peak is                                   |
| AUTUMN_WIDTH  | Controls the breadth of the arrival phase                                      |
| SUMMER_WIDTH  | Controls the breadth of the summer low                                         |
| GROWTH_RATE   | Controls how quickly activity rises towards the seasonal target                |
| DECAY_RATE    | Controls how quickly activity declines                                         |

Together, these parameters define:

- **When** the species arrives and peaks  
- **How concentrated** the winter period is  
- **How gradually or abruptly** the species appears and disappears  
- **How strongly** the species is absent through summer  

All timing parameters are expressed in months on a circular 12-month scale.

## Mathematical Form

The model is a first-order system:

> dy/dt = rate × (target(t) - y)

Where:

- y(t) is a relative, dimensionless measure of observable activity  
- target(t) is the seasonal activity target  
- rate is selected using GROWTH_RATE or DECAY_RATE depending on whether the signal is rising or falling  

The target function is constructed from smooth periodic components:

> target(t) = winter(t) + autumn(t) - summer(t) + BASELINE

Each component is a smooth function over a 12-month cycle, allowing continuous variation without discontinuities.

## Model Behaviour

When applied over a full year, the model produces a winter-centred cycle:

- Activity rises through autumn as the species arrives  
- Peaks in mid-winter  
- Declines through late winter and early spring  
- Remains close to zero through summer  

The shape depends on:

- The timing and strength of the winter and autumn components  
- The breadth of the winter peak  
- The strength of summer suppression  
- The rate at which the system responds to change  

Unlike the seasonal presence model, the season is not bounded within a single part of the calendar year. Instead, it wraps across the year boundary.

## Normalisation

Model outputs are expressed as a relative measure of activity.

To allow comparison across species, results are normalised so that:

- 1.0 &rarr; peak activity  
- 0.5 &rarr; half of peak activity  
- 0.0 &rarr; effectively zero  

This focuses attention on the timing and shape of seasonal variation.

## Parameter Interpretation

After parameter fitting, the parameters are broadly interpretable as follows:

- **WINTER_PEAK** &rarr; timing of peak presence  
- **AUTUMN_PEAK** &rarr; timing of arrival  
- **WINTER_WIDTH** &rarr; concentration of winter activity  
- **AUTUMN_WIDTH** &rarr; spread of the arrival phase  
- **SUMMER_DIP / SUMMER_LOW** &rarr; strength and timing of absence  

As with all simple models:

- Parameters should be treated as estimates rather than exact dates
- Different combinations may produce similar curves
- Interpretation is most reliable when considered alongside the fitted curve itself

In practice, each species can be described by both:

- Its fitted parameters
- The shape of its simulated seasonal curve

Together, these form a compact description of seasonal presence.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include ode-solver-invitation.html %}
