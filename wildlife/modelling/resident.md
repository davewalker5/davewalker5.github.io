---
layout: default
title: Resident Detectability Model
description: A simple model describing species that are present throughout the year, with seasonal variation in detectability arising from behaviour and activity
breadcrumb: Resident Detectability Model
---

# Resident Detectability Model

Some species are present throughout the year. They do not appear and disappear, but remain a constant part of the landscape — their visibility changing with season, behaviour, and context.

This model describes that pattern: a continuous presence in which detectability rises and falls through the year without ever reaching zero.

## Concept

The model assumes that a species is always present, and that what changes over time is not presence, but how readily it is observed.

Rather than generating activity within a seasonal window, the model defines a **seasonal target**, representing expected detectability at a given point in the year. The observed signal then adjusts towards this target over time.

The target itself combines several simple elements:

- A **baseline level**, representing persistent year-round presence
- A **winter / early-spring peak**, reflecting increased visibility or activity
- An **autumn / early-winter recovery**, as detectability rises again
- A **summer dip**, when activity or visibility is reduced

Together, these produce a continuous annual cycle with characteristic peaks and troughs, but no enforced absence.

### Model Parameters

A small number of parameters control the behaviour of the model:

| Parameter                                | Purpose                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| BASELINE                                 | Sets the minimum year-round detectability, representing continuous presence                        |
| WINTER_WEIGHT, AUTUMN_WEIGHT, SUMMER_DIP | Control the relative strength of seasonal features, shaping the prominence of peaks and troughs    |
| *_PEAK                                   | Determine the timing of seasonal features within the year                                          |
| *_WIDTH                                  | Control the breadth of peaks and dips, from gradual variation to more concentrated periods         |
| RESPONSE_RATE                            | Controls how quickly the observed signal adjusts to changes in the seasonal target                 |
| GROWTH_RATE / DECAY_RATE (if used)       | Allow asymmetric dynamics, for example faster decline in summer and slower recovery towards winter |

Together, these parameters define the balance between persistence and variation, shaping the timing and form of the annual cycle.

## Mathematical form

The model can be written as:

> dy/dt = RESPONSE_RATE × (target(t) - y)

Where:

- y(t) is a relative, dimensionless measure of observable activity 
- target(t) is the seasonal detectability target
- RESPONSE_RATE controls how quickly the system responds

The target function is constructed from smooth annual components:

> target(t) = BASELINE + winter(t) + autumn(t) - summer(t)

Each component is represented as a raised cosine function:

> component(t) = (1 + cos(2π(t - peak)/12)) / 2

with an exponent controlling its width.

Together, these components produce a continuous, periodic function describing expected detectability across the year.

## Model behaviour

When applied over a full year, the model produces a smooth, continuous cycle:

- Detectability rises into a winter or early-spring peak
- Declines through the summer months
- Recovers again towards autumn and winter

Unlike the seasonal presence model, the signal does not collapse to zero. Instead, it fluctuates around a persistent baseline, reflecting continuous presence.

The shape of the curve depends on:

- The timing and strength of seasonal components
- The relative depth of the summer dip
- The rate at which the system responds to change

By adjusting these, the model can represent a range of resident behaviours, from relatively stable presence to strongly varying detectability.

## Normalisation

The model outputs are expressed as a relative, dimensionless measure of activity. As a result, different models — and different parameter choices — can produce values on different scales.

To allow comparison, the outputs are normalised so that the maximum value of y is set to 1, with all other values scaled proportionally.

This produces a simple index:

- 1.0 &rarr; peak modelled activity
- 0.5 &rarr; half of peak activity
- 0.0 &rarr; absence (or effectively zero)

Normalisation is applied after simulation, and does not affect the underlying model behaviour. It allows comparison of the *shape* and timing of seasonal patterns, rather than absolute magnitude.

The normalisation script is available as a download from the reference section and should be run as follows on the output exported from the ODE Solver application:

> python normalise_output.py --input input.csv --output output.csv

The ODE Solver can export CSV, JSON and XML format files and all three formats are accepted as input and output to the normaliser. The input and output file can be the same, if the input is to be overwritten with the normalised output.

## Charting the Normalised Output

A charting script is available in the reference section and can be used to chart the normalised output from a simulation as follows, exporting the results to a PNG file:

> python plot_normalised.py --input input.csv --output output.png --title "Chart Title"

As with the normaliser, CSV, JSON and XML inputs are accepted.

## Example

### Robin

<div class="blog-image-grid blog-image-grid--1-col">
    <figure>
        <img src="/assets/images/modelling/resident-robin.png" alt="Modelled Robin Resident Detectability">
    </figure>
</div>

The robin provides a clear example of a resident species with seasonal variation in detectability.

Observed data show:

- High visibility in winter and early spring
- A reduction through summer
- A gradual recovery towards the end of the year

The model reproduces this pattern using:

- A persistent baseline
- A winter / early-spring peak
- A summer dip
- An autumn recovery

The resulting curve captures the continuous presence of the species, while reflecting changes in behaviour and visibility through the year.

## Interpretation

This model is intended to represent species that are **always present but variably detectable**.

It is deliberately simple and abstract — closer to a minimal representation than a description of detailed ecological mechanisms — and is intended to explore whether the observed patterns can arise from a small number of underlying processes, not to predict observations.

It provides a minimal explanation for patterns seen in the Seasonal Analyses, showing that variation in observation does not necessarily imply absence, but can arise from:

- Behavioural change
- Seasonal activity patterns
- Variation in visibility

The model does not attempt to describe the underlying biological mechanisms in detail. Instead, it offers a way of understanding how continuous presence combined with seasonal variation can produce the observed patterns.

## In Context

Within the broader set of observations, this model corresponds to species that are:

- Present throughout the year
- Never fully absent
- Varying primarily in detectability rather than occurrence

These contrast with species that are only present for part of the year — a pattern described by the Seasonal Presence Model.

## Reference

The JSON-format ODE Solver simulation files used to generate these models — including parameter values and the defining equations — are available for download in the reference section.

These provide the exact configurations used to produce the example curves shown here.
