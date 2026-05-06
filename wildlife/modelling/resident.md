---
layout: default
title: Resident Detectability Model
description: A simple model describing species that are present throughout the year, with seasonal variation in detectability arising from behaviour and activity
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Seasonal Modelling
    url: /wildlife/modelling/index.html
  - name: Resident Detectability Model
    url: /wildlife/modelling/resident.html
---

# Resident Detectability Model

Some species are present throughout the year. They do not appear and disappear, but remain a constant part of the landscape — their visibility changing with season, behaviour, and context.

This model describes that pattern: a continuous presence in which detectability rises and falls through the year without ever reaching zero.

## Concept

This model describes species that are present throughout the year but vary in how readily they are observed.

It answers the question:

> How detectable is the species through the year?

Unlike the seasonal and winter visitor models, presence is continuous. What changes is not whether the species is present, but how visible or active it is.

The model defines a **seasonal target**, representing expected detectability at each point in the year. The observed signal then adjusts towards this target over time.

The target combines:

- A **baseline level**, representing year-round presence  
- A **winter peak**, reflecting increased visibility or activity  
- An optional **autumn component**  
- A **summer dip**, representing reduced detectability  

Together, these produce a continuous annual cycle with no enforced absence.

## Model Parameters

A small number of parameters control the behaviour of the model:

| Parameter     | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| INITIAL_Y     | Sets the starting value of the modelled detectability signal         |
| BASELINE      | Sets the persistent year-round level of detectability                |
| WINTER_WEIGHT | Controls the strength of the winter / early-spring peak              |
| AUTUMN_WEIGHT | Controls the strength of the autumn / early-winter recovery          |
| SUMMER_DIP    | Controls the strength of the summer reduction in detectability       |
| WINTER_PEAK   | Sets the timing of the winter / early-spring peak                    |
| AUTUMN_PEAK   | Sets the timing of the autumn / early-winter recovery                |
| SUMMER_LOW    | Sets the timing of the lowest summer detectability                   |
| WINTER_WIDTH  | Controls the breadth of the winter / early-spring peak               |
| AUTUMN_WIDTH  | Controls the breadth of the autumn / early-winter recovery           |
| SUMMER_WIDTH  | Controls the breadth of the summer dip                               |
| GROWTH_RATE   | Controls how quickly detectability rises towards the seasonal target |
| DECAY_RATE    | Controls how quickly detectability falls towards the seasonal target |

Together, these parameters define the level, timing, strength, breadth, and responsiveness of the annual detectability cycle.

The peak and low-point parameters are expressed in months on a circular 12-month scale. Width parameters control how broad or concentrated each seasonal feature is. The growth and decay rates allow the model to respond asymmetrically, so that detectability can rise and fall at different speeds.

## Mathematical Form

The model is a first-order system:

> dy/dt = rate × (target(t) - y)

Where:

- y(t) is a relative, dimensionless measure of observable activity  
- target(t) is the seasonal detectability target  
- rate controls how quickly the system responds  

The target function is constructed from smooth annual components:

> target(t) = BASELINE + winter(t) + autumn(t) - summer(t)

Each component is a smooth periodic function over a 12-month cycle. Time is treated as circular, allowing continuous seasonal variation without a defined start or end.

## Model Behaviour

When applied over a full year, the model produces a smooth, continuous cycle:

- Detectability rises into a winter or early-spring peak  
- Declines through the summer months  
- Recovers again towards autumn and winter  

Unlike seasonal presence models, the signal does not collapse to zero. Instead, it fluctuates around a persistent baseline, reflecting continuous presence.

The exact shape depends on:

- The timing and strength of seasonal components  
- The depth and duration of the summer dip  
- The rate at which the system responds to change  

## Fitting to Observations

The model can be fitted to observed monthly data.

A parameter fitting process:

- generates candidate parameter sets  
- runs the model  
- compares the simulated curve to observations  
- scores the match  
- repeats to identify good solutions  

Rather than producing a single exact answer, this yields a set of plausible parameter values that reproduce the observed pattern.

These parameters are broadly interpretable:

- **WINTER_PEAK** &rarr; timing of highest detectability  
- **SUMMER_LOW** &rarr; timing of lowest detectability  
- **WIDTH parameters** &rarr; how concentrated or diffuse seasonal features are  
- **WEIGHTS** &rarr; relative strength of seasonal effects  

Together, they describe the *shape* of the species’ seasonal behaviour.

## Normalisation

Model outputs are expressed as a relative measure of activity.

To allow comparison across species, results are normalised so that:

- 1.0 &rarr; peak activity  
- 0.5 &rarr; half of peak activity  
- 0.0 &rarr; effectively zero  

This focuses attention on the timing and shape of seasonal variation rather than absolute magnitude.

## Example

### Robin

<div class="blog-image-grid blog-image-grid--1-col">
    <figure>
        <img src="/assets/images/modelling/resident-robin.png" alt="Modelled Robin Resident Detectability">
    </figure>
</div>

Observed data show:

- High visibility in winter and early spring  
- A reduction through summer  
- A gradual recovery towards the end of the year  

The fitted model describes this pattern using:

- A persistent baseline, representing continuous presence  
- A winter peak in detectability  
- A summer dip, reducing visibility rather than removing presence  
- A gradual autumn recovery  

The resulting curve captures:

- Continuous presence throughout the year  
- A smooth seasonal cycle in detectability  

**Seasonal signature (modelled):**

- Presence: year-round  
- Peak: winter / early spring  
- Width: broad  
- Decline / absence: reduced detectability in summer, but no true absence  

## Interpretation

This model represents species that are **always present but variably detectable**.

It provides a minimal explanation for patterns seen in the Seasonal Analyses, showing that variation in observation does not necessarily imply absence, but can arise from:

- Behavioural change  
- Seasonal activity patterns  
- Variation in visibility  

The model is deliberately simple. It does not attempt to describe detailed ecological mechanisms, but tests whether the observed patterns can arise from a small number of underlying processes.

## In Context

Within the broader modelling framework, this model corresponds to species that are:

- Present throughout the year  
- Never fully absent  
- Varying primarily in detectability  

These contrast with:

- **Seasonal presence species**, active within a bounded window  
- **Winter visitors**, whose presence spans the year boundary  

Together, these models provide a simple way of describing different ways species occupy the year.

{% include ode-solver-invitation.html %}
