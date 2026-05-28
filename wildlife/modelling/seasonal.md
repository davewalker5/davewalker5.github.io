---
layout: default
title: Seasonal Presence Model
description: A model representing species whose presence is seasonally constrained, rising into activity, reaching a seasonal peak, and then collapsing back toward absence
series: modelling
chapter: 2
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Seasonal Modelling
    url: /wildlife/modelling/index.html
  - name: Seasonal Presence Model
    url: /wildlife/modelling/seasonal.html
---

# Seasonal Presence Model

This model is intended to represent species whose presence is **seasonally constrained** — those that are only observable during a particular phase of their life cycle or migration - and describes their rise into activity, the peak of the season, and the eventual collapse back toward absence.

It is therefore intended for species whose observable presence is strongly constrained in time, such as:

- Spring flowers
- Migratory birds
- Butterflies with constrained annual flight periods

The model is deliberately simple in structure - closer to a minimal representation than a description of detailed ecological mechanisms — and is intended to explore whether the observed patterns can arise from a small number of underlying processes, not to predict observations.

It provides a minimal explanation for patterns seen in the seasonal analysis of observations, showing that a small number of simple processes are sufficient to produce:

- Sharply bounded flowering periods
- Migration-driven appearances
- Other forms of seasonal presence

The model does not attempt to describe the underlying biological mechanisms in detail. Instead, it offers a way of understanding how the observed patterns might arise from the interaction of seasonal forcing, constrained availability, persistence, and active seasonal suppression.

## Concept

This model describes species that are only present for part of the year.

It answers the question:

> When is the species present?

Unlike the resident model, presence is not continuous. Instead, activity is confined to a defined seasonal window.

The model combines four simple elements:

- A **seasonal driver**, representing environmental change through the year
- A **seasonal window**, constraining when presence is biologically possible
- A **baseline decay process**, limiting persistence over time
- A **post-season suppression phase**, accelerating decline once the active season has passed

Together, these produce a dominant seasonal pulse with realistic asymmetry — allowing activity to rise gradually, peak, and then decline more abruptly after the season ends.

## Model Parameters

A small number of parameters control the behaviour of the model:

| Parameter           | Purpose                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| GROWTH              | Controls how strongly seasonal conditions drive the appearance of the species |
| DECAY               | Controls how quickly activity declines during the active period               |
| OOS_DECAY           | Increases the rate of decline outside the seasonal window                     |
| POST_PEAK_DECAY     | Controls how strongly activity is suppressed after the season                 |
| POST_PEAK_SHARPNESS | Controls how abruptly post-season suppression activates                       |
| SEASON_START        | Sets the onset of the active period                                           |
| SEASON_END          | Sets the end of the active period                                             |
| SHARPNESS           | Controls how abruptly the season begins and ends                              |
| FORCING_PEAK        | Sets the timing of the seasonal driver peak                                   |

Together, these parameters define:

- **When** the species appears (SEASON_START / END)
- **How sharply** it appears and disappears (SHARPNESS, OOS_DECAY)
- **How strongly** it responds to seasonal conditions (GROWTH, FORCING_PEAK)
- **How long it persists** once present (DECAY)

The start and end parameters are expressed in months on a continuous scale, allowing the season to be positioned precisely within the year.

## Mathematical form

The governing equation combines:

- Seasonal growth
- Seasonal availability
- Time-dependent decline

The effective decay rate increases:

- Outside the seasonal window
- After the active season has passed

This allows the model to reproduce species that decline rapidly after peak activity, reducing unrealistically persistent late-season tails.

## Model behaviour

When applied over a full year, the model produces a characteristic seasonal pulse:

- Activity begins as environmental conditions become favourable
- Presence increases within the active window
- Activity reaches a peak during the core season
- Once seasonal conditions deteriorate, activity collapses more rapidly toward absence

The resulting curves are often asymmetric, with relatively sharp post-peak decline. This better reflects many biological systems, where activity does not merely fade gradually, but undergoes active seasonal shutdown through senescence, migration, mortality, or behavioural change.

- **SEASON_START / END** → timing of arrival and departure
- **FORCING_PEAK** → timing of peak activity
- **SHARPNESS** → how abruptly the season begins and ends
- **OOS_DECAY** → how quickly activity falls away outside the season

## Normalisation

The model outputs are expressed as a relative, dimensionless measure of activity. As a result, different models — and different parameter choices — can produce values on different scales.

To allow comparison, the outputs are normalised so that the maximum value of y is set to 1, with all other values scaled proportionally.

This produces a simple index:

- 1.0 &rarr; peak modelled activity
- 0.5 &rarr; half of peak activity
- 0.0 &rarr; absence (or effectively zero)

Normalisation is applied after simulation, and does not affect the underlying model behaviour. It allows comparison of the *shape* and timing of seasonal patterns, rather than absolute magnitude.

## Parameter Interpretation

After parameter fitting, the parameters are broadly interpretable as follows:

- **SEASON_START / END** &rarr; approximate timing of arrival and disappearance
- **FORCING_PEAK** &rarr; timing of strongest seasonal forcing
- **SHARPNESS** &rarr; abruptness of seasonal onset and termination
- **GROWTH / DECAY** &rarr; persistence and responsiveness during the active season
- **OOS_DECAY** &rarr; suppression strength outside the seasonal window
- **POST_PEAK_DECAY** &rarr; strength of late-season collapse
- **POST_PEAK_SHARPNESS** &rarr; abruptness of post-season shutdown

Together, they describe the _shape_ of the species’ seasonal behaviour.

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
