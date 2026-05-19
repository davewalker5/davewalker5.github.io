---
layout: default
title: Resident Detectability Model
description: A simple model describing species that are present throughout the year, with seasonal variation in detectability arising from behaviour and activity
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Pocket Ecology
    url: /wildlife/pocket/index.html
  - name: Resident Detectability Model
    url: /wildlife/modelling/resident.html
---

# Resident Detectability Model

The Resident Detectability Model is a seasonal wildlife observation model designed for species that remain present throughout the year but whose detectability changes seasonally.

Unlike strict seasonal-presence models, the resident model does not attempt to describe annual arrival and departure. Instead, it represents a continuously present population whose observed abundance varies because detectability rises and falls through the year.

This provides a compact explanation for many seasonal observation patterns in long-term field records:

- Behavioural change
- Variation in vocal activity
- Seasonal visibility
- Foliage cover
- Territorial behaviour
- Flocking
- Post-breeding suppression

The model forms part of the wider Wildlife Seasonal Modelling work developed for Field Notes Journal, but has also been adapted for constrained handheld systems including the TI-84 Plus CE-T Python calculator as part of the Pocket Ecology project.

## Concept

The model treats observed detectability as a state variable which gradually relaxes toward a changing seasonal target.

Rather than switching a species “on” and “off” seasonally, the system assumes that the species remains continuously present while detectability moves through:

- Winter support
- Spring persistence
- Summer suppression
- Autumn recovery
- Year-end reinforcement

The resulting curves often resemble the observed annual structure of resident species surprisingly well while remaining biologically interpretable.

### Seasonal Components

The handheld implementation retains most of the structure of the desktop model.

The target detectability curve is constructed from several overlapping seasonal components:

### Winter Support

Represents elevated winter detectability associated with factors such as:

- Reduced foliage
- Increased vocalisation
- Territorial activity
- Flocking
- Improved visibility

### Summer Suppression

Represents reduced detectability during summer periods such as:

- Moult
- Dense vegetation
- Reduced territorial behaviour
- Quieter vocal activity
- Behavioural shifts

### Autumn Recovery

Allows detectability to rise again following the summer trough.

A separate onset gate delays the autumn rise so the model can avoid unrealistically early late-year recovery caused by broad seasonal shoulders.

### Spring Carry-Over

Some resident species retain elevated detectability well into spring and early summer before collapsing rapidly into the summer trough.

The carry-over component provides additional support for these prolonged high-detectability periods.

### Year-End Reinforcement

An additional late-year component allowing certain species to regain or maintain elevated detectability near the end of the annual cycle without forcing the main winter component to become unrealistically broad.

### Asymmetric Seasonal Structure

A central feature of the model is the use of asymmetric seasonal components.

Each annual seasonal bump can have independent rise and fall widths, allowing the system to represent:

- Slow build-up with rapid collapse
- Sharp arrival with gradual decline
- Asymmetric seasonal persistence
- Delayed seasonal suppression

This proved particularly important for modelling resident species whose seasonal behaviour is strongly unbalanced across the year.

## Example: Blackbird (_Turdus merula_)

The handheld implementation below shows the resident detectability model configured for blackbird observations.

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/ti84-resident.png" alt="Resident Detectability Model for Blackbird (Turdus merula)">
    <figcaption>Resident Detectability Model for Blackbird (_Turdus merula_)</figcaption>
  </figure>
</div>

Although blackbirds remain present throughout the year, long-term observation records often show strong seasonal variation in apparent abundance and detectability.

The model attempts to reproduce this structure not through migration or seasonal absence, but through changing observational visibility across the annual cycle.

Several characteristic features emerge in the resulting curve:

- Relatively elevated winter detectability
- Persistence through spring
- Strong summer suppression
- Gradual autumn recovery

The deep summer trough reflects the combined effects of dense foliage, reduced vocal activity, post-breeding behaviour, and general seasonal suppression of visibility despite continuous year-round presence.

One of the more interesting aspects of the resident model is that the decline into the summer minimum is substantially sharper than the later recovery. The resulting asymmetry proved difficult to reproduce using simpler seasonal forcing systems and ultimately led to the introduction of delayed suppression and carry-over components within the model structure.

Despite running on extremely constrained hardware, the TI-84 implementation preserves much of this broader seasonal behaviour while performing all numerical integration and rendering directly on-device.

## Pocket Ecology

The resident model represents an experiment in portable ecological computation:

> How much ecological structure can survive when reduced to extremely small computational systems?

The resulting calculator implementation is necessarily simpler than the desktop system, but it preserves much of the seasonal behaviour and ecological interpretability of the original model while fitting inside a battery-powered handheld device originally designed for school mathematics.

{% include ti84-python-invitation.html %}
