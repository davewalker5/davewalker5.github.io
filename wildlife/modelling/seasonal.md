---
layout: default
title: Seasonal Presence Model
description: A simple model describing species that appear and disappear through the year, using seasonal forcing, constrained presence, and decline to reproduce observed patterns
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

Some species are only visible for a short part of the year. They emerge, flower, migrate, breed, or pass through — then disappear again, often surprisingly quickly.

This model describes those seasonal appearances: the rise into activity, the peak of the season, and the eventual collapse back toward absence.

It is intended for species whose observable presence is strongly constrained in time, such as:

- Spring flowers
- Migratory birds
- Butterflies with a single annual flight period

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

Together, these produce a single dominant seasonal pulse — a rise into the season, a peak, and a decline.

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

## Fitting to Observations

The model can be fitted to observed monthly data.

A parameter fitting process:

- Infers a plausible seasonal window from the data
- Generates candidate parameter sets within that range
- Runs the model
- Compares the simulated curve to observations
- Scores the match
- Repeats to identify good solutions

This produces a set of parameters that describe the species’ seasonal behaviour.

These parameters are broadly interpretable:

- **SEASON_START / END** → timing of arrival and departure
- **FORCING_PEAK** → timing of peak activity
- **SHARPNESS** → how abruptly the season begins and ends
- **OOS_DECAY** → how quickly activity falls away outside the season

As with all simple models:

- Parameters should be treated as estimates rather than exact dates
- Different combinations may produce similar curves
- Interpretation is most reliable when considered alongside the fitted curve itself

In practice, each species can be described by both:

- Its fitted parameters
- The shape of its simulated seasonal curve

Together, these form a compact description of seasonal presence.

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

## Examples

### Bluebell

<div class="blog-image-grid blog-image-grid--1-col">
    <figure>
        <img src="/assets/images/modelling/seasonal-bluebell.png" alt="Modelled Bluebell Seasonal Presence">
    </figure>
</div>

Observed data show:

- A narrow window of occurrence in spring
- A rapid rise into flowering
- A short peak followed by a swift decline

The fitted model describes this pattern using:

- An early-season start and well-defined end point
- A relatively high sharpness, producing a rapid onset and decline
- Strong out-of-season decay, preventing activity from persisting beyond the flowering period

The resulting curve captures:

- A brief, tightly bounded seasonal pulse
- A rapid transition from absence to peak activity and back again

**Seasonal signature (modelled):**

- Presence: April–May
- Peak: mid-late April 
- Width: very narrow
- Decline / absence: rapid, with near-zero activity outside the flowering period

The post-season suppression component prevents activity from lingering unrealistically beyond the observed seasonal period.

### Swift

<div class="blog-image-grid blog-image-grid--1-col">
    <figure>
        <img src="/assets/images/modelling/seasonal-swift.png" alt="Modelled Swift Seasonal Presence">
    </figure>
</div>

Observed data show:

- A rapid arrival in late spring
- A concentrated period of activity through summer
- A swift departure

The fitted model describes this pattern using:

- A narrow seasonal window aligned with the summer months
- A forcing peak centred within the period of highest activity
- Strong out-of-season decay, ensuring a rapid disappearance once the season ends

The resulting curve captures:

- A short, well-defined seasonal pulse
- A rapid transition from absence to presence and back again

**Seasonal signature (modelled):**

- Presence: May–August
- Peak: June–July
- Width: narrow
- Decline / absence: rapid, with near-zero activity outside the season

The post-season suppression component prevents activity from lingering unrealistically beyond the observed seasonal period.

## Interpretation

This model is intended to represent species whose presence is **seasonally constrained** — those that are only observable during a particular phase of their life cycle or migration.

It is deliberately simple and abstract — closer to a minimal representation than a description of detailed ecological mechanisms — and is intended to explore whether the observed patterns can arise from a small number of underlying processes, not to predict observations.

It provides a minimal explanation for patterns seen in the Seasonal Analyses, showing that a small number of simple processes are sufficient to produce:

- Sharply bounded flowering periods
- Migration-driven appearances
- Other forms of seasonal presence

The model does not attempt to describe the underlying biological mechanisms in detail. Instead, it offers a way of understanding how the observed patterns might arise from the interaction of seasonal forcing, constrained availability, persistence, and active seasonal suppression.

## In Context

Within the broader set of observations, this model corresponds to species that are:

- Absent for part of the year
- Present within a defined seasonal window
- Often sharply bounded in time

These contrast with species that are always present but vary in detectability — a pattern described by the Resident Detectability Model.

{% include ode-solver-invitation.html %}
