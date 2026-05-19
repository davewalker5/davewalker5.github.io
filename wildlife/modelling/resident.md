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

This model represents species that are **always present but variably detectable**, describing a continuous presence in which detectability rises and falls through the year without ever reaching zero.

It provides a minimal explanation for patterns seen in the seasonal analysis of observations, showing that variation in observation does not necessarily imply absence, but can arise from:

- Behavioural change
- Seasonal activity patterns
- Variation in visibility

The model is deliberately simple in structure, while still allowing a range of realistic seasonal behaviours to emerge from a relatively small number of interacting processes. It does not attempt to describe detailed ecological mechanisms, but tests whether the observed patterns can arise from a small number of underlying processes.

## Concept

This model describes species that are present throughout the year but vary in how readily they are observed.

It answers the question:

> How detectable is the species through the year?

Unlike the seasonal and winter visitor models, presence is continuous. What changes is not whether the species is present, but how visible, active, or detectable it is.

The model defines a seasonal target, representing the expected detectability at each point in the year. The observed signal then adjusts towards this target over time, but not instantaneously. Detectability may persist, lag behind seasonal conditions, or decline at different rates through the year.

The target combines:

- A baseline level, representing continuous presence
- A winter peak, reflecting increased visibility or activity
- An optional autumn component
- A summer dip, representing reduced detectability
- Optional spring carry-over behaviour, allowing detectability to remain elevated into late spring and early summer before entering the summer decline

Additional mechanisms allow the model to represent:

- Delayed onset of summer decline
- Prolonged spring persistence
- Asymmetric seasonal rise and fall
- Sharper late-summer reductions in detectability

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

### Extended Seasonal Dynamics

Some species require additional seasonal persistence behaviour.

Optional parameters allow the model to represent:

| Behaviour                | Purpose                                                     |
| ------------------------ | ----------------------------------------------------------- |
| Spring carry-over        | Retains elevated detectability into spring and early summer |
| Delayed summer decline   | Prevents summer suppression from beginning too early        |
| Summer decay boost       | Allows sharper late-summer reduction                        |
| Reduced pre-summer decay | Slows spring decline before the summer low                  |

These mechanisms are mainly important for species with broad spring plateaus or delayed seasonal decline.

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

## Seasonal Persistence

Some resident species do not simply track seasonal conditions directly. Instead, detectability may persist for some time before declining.

For example:

- Some species retain high visibility through spring before entering a relatively abrupt late-summer reduction
- Others follow the seasonal cycle more closely, with a smoother decline into summer

The model allows these behaviours through mechanisms controlling:

- Delayed summer suppression
- Retained spring detectability
- Asymmetric decay rates

This allows the same general framework to describe both:

- Broad, persistent annual patterns
- More rapidly responding resident species

without introducing seasonal absence.

## Normalisation

Model outputs are expressed as a relative measure of activity.

To allow comparison across species, results are normalised so that:

- 1.0 &rarr; peak activity
- 0.5 &rarr; half of peak activity
- 0.0 &rarr; effectively zero

This focuses attention on the timing and shape of seasonal variation rather than absolute magnitude.

## Parameter Interpretation

After parameter fitting, the parameters are broadly interpretable as follows:

- **WINTER_PEAK** &rarr; timing of highest detectability
- **SUMMER_LOW** &rarr; timing of lowest detectability
- **WIDTH parameters** &rarr; how concentrated or diffuse seasonal features are
- **WEIGHTS** &rarr; relative strength of seasonal effects

Together, they describe the _shape_ of the species’ seasonal behaviour.

As with all simple models:

- Parameters should be treated as estimates rather than exact dates
- Different combinations may produce similar curves
- Interpretation is most reliable when considered alongside the fitted curve itself

In practice, each species can be described by both:

- Its fitted parameters
- The shape of its simulated seasonal curve

Together, these form a compact description of seasonal presence.

{% include ode-solver-invitation.html %}
