---
layout: default
title: Glossary
description: Definitions and explanations of modelling terms, parameters, and ecological concepts as they are used throughout this section
series: modelling
chapter: 8
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Seasonal Modelling
    url: /wildlife/modelling/index.html
  - name: Glossary
    url: /wildlife/modelling/glossary.html
---

# Glossary

The following table provides definitions and explanations of modelling terms, parameters, and ecological concepts as they are used throughout this section:

| Term                         | Meaning                                                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activity Curve               | A curve describing how the relative observed activity or detectability of a species changes through the year.                                                   |
| Baseline                     | The persistent background level of activity or detectability present throughout the year.                                                                       |
| Circular Month Distance      | A measure of separation between two points in the annual cycle that treats the year as circular, so that December and January are adjacent rather than distant. |
| Circular Time                | A representation of the year in which December and January are treated as adjacent, allowing seasonal cycles to wrap continuously across the year boundary.     |
| Clustering                   | A method used to group species with similar seasonal ecological characteristics into broader neighbourhood structures.                                          |
| Consensus Derivation         | The process of combining multiple well-fitting parameter sets to produce a representative seasonal description for a species.                                   |
| Consensus Parameters         | A representative parameter set derived from multiple well-fitting model runs, intended to capture the broad seasonal structure of a species.                    |
| Cosine Forcing               | A smooth seasonal driver based on a cosine-shaped annual cycle, used to represent gradual environmental change through the year.                                |
| Detectability                | The likelihood of observing or recording a species, rather than a direct measure of absolute abundance.                                                         |
| Ecological Feature Space     | A shared mathematical representation in which species are positioned according to their seasonal ecological characteristics.                                    |
| Ecological Neighbourhood     | A group of species occupying nearby regions of seasonal ecological space and sharing broadly similar seasonal structure.                                        |
| Feature Matrix               | A table describing species using fitted parameters and derived seasonal characteristics, allowing comparison across model families.                             |
| Fitted Curve                 | The simulated seasonal curve produced by the model after parameter fitting.                                                                                     |
| Fitting Method               | The overall procedure used to compare model simulations against observed seasonal data and identify parameter sets producing the closest agreement.             |
| Model Family                 | One of the three broad seasonal model types: Seasonal presence, resident detectability, winter presence                                                         |
| Normalisation                | The process of scaling model outputs so that the peak value equals 1.0, allowing comparison of seasonal shape independent of magnitude.                         |
| Normalisation Method         | The procedure used to scale model outputs onto a common relative range, allowing seasonal patterns to be compared independent of absolute magnitude.            |
| Occupancy                    | The extent to which a species is present or observable across the annual cycle.                                                                                 |
| ODE Integration              | The numerical process used to simulate how model activity changes continuously through time according to the governing equations of the system.                 |
| Parameter Fitting            | The process of repeatedly running a model with different parameter combinations to identify those producing the closest agreement with observed data.           |
| Persistence                  | The tendency for activity or detectability to remain elevated after seasonal conditions begin to change.                                                        |
| Random Search                | A parameter fitting approach in which model parameters are repeatedly selected randomly from within a defined search space and evaluated against observed data. |
| Search Space                 | The range of allowable parameter values explored during the fitting process.                                                                                    |
| Seasonal Forcing             | A smooth annual driver representing seasonal environmental change within the model.                                                                             |
| Seasonal Forcing Function    | The mathematical function used to represent cyclical seasonal environmental influence within the model.                                                         |
| Seasonal Suppression         | A reduction in modelled activity outside the active seasonal period.                                                                                            |
| Seasonal Window              | The part of the year during which presence or activity is biologically possible within the model.                                                               |
| Similarity Matrix            | A pairwise comparison of species based on their fitted seasonal ecological characteristics.                                                                     |
| Synthesised Curve            | A reconstructed seasonal curve generated from the fitted model and scaled to match the observed data range for visual comparison.                               |
| Weighted Ecological Distance | A similarity measure in which some seasonal ecological characteristics contribute more strongly than others when comparing species.                             |
| Winter Visitor               | A species whose primary period of activity or presence occurs during the winter months, typically spanning the year boundary.                                   |

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>
