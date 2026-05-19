---
layout: default
title: Winter Visitor Model
description: A model representing species that are present only during the winter, with a winter peak, activity spanning the year boundary, and near-absence through spring and summer
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/index.html
  - name: Pocket Ecology
    url: /wildlife/pocket/index.html
  - name: Winter Visitor Model
    url: /wildlife/pocket/winter.html
---

# Winter Visitor Model

The Winter Visitor Model is designed for species whose observable seasonal presence spans the annual year boundary.

Typical examples include:

- Wintering thrushes
- Migratory waterfowl
- Overwintering flocks
- Other species whose seasonal occupancy begins during autumn and continues through winter into early spring

Unlike the standard Seasonal Presence Model, which assumes activity periods contained within a single annual window, the Winter Visitor Model is specifically designed to handle year-wrapping seasonal structure.

This proved necessary because many ecological systems do not align neatly with the January–December calendar boundary.

The model forms part of the wider Wildlife Seasonal Modelling work developed for Field Notes Journal, and has also been adapted for constrained handheld systems including the TI-84 Plus CE-T Python calculator as part of the Pocket Ecology project.

## Concept

The model explores whether winter visitor dynamics can be represented using a compact seasonal forcing system while preserving the characteristic shape of winter occupancy curves.

The resulting system produces behaviours such as:

- Autumn arrival
- Winter persistence
- Peak mid-winter occupancy
- Spring departure
- Prolonged summer absence

The model combines:

- Year-wrapping seasonal forcing
- Dynamic seasonal windows
- Persistence behaviour
- Enhanced seasonal suppression outside the active winter period

The resulting curves often resemble the broad annual structure observed in long-term field records surprisingly well.

### The Year Boundary Problem

One of the main motivations for the model was the difficulty of representing winter species using ordinary seasonal windows.

Species such as redwing or fieldfare do not occupy a simple March-to-August style seasonal interval. Instead, their active period begins late in one calendar year and continues into the next.

This creates awkward behaviour in many simple seasonal systems because:

- The active period crosses year-end
- Seasonal peaks may occur near mid-winter
- Arrival/departure dynamics become discontinuous if treated as ordinary bounded windows

The Winter Visitor Model instead treats the seasonal cycle as circular.

This allows:

- Autumn arrival
- Winter persistence
- Spring decline

to behave as a single continuous ecological structure rather than two disconnected seasonal fragments.

### Seasonal Components

The model builds its target seasonal behaviour from several interacting components.

#### Winter Component

Represents the primary winter occupancy structure.

This controls:

- Winter arrival
- Mid-winter persistence
- The broad seasonal shape of the main occupancy curve

#### Autumn Component

A secondary autumn-support component allows the model to represent:

- Early arrival behaviour
- Pre-winter build-up
- Asymmetry between autumn arrival and spring departure

This proved especially useful for species whose autumn arrival begins gradually long before peak winter occupancy develops.

#### Summer Suppression

Outside the winter period, the model applies strong suppression behaviour to maintain prolonged seasonal absence through spring and summer.

This helps prevent unrealistic residual occupancy outside the intended seasonal window.

### Sharpness Control

Additional sharpness controls allow the model to avoid unrealistically broad seasonal shoulders.

This became particularly important when modelling species whose:

- Autumn arrival is comparatively abrupt
- Winter peak is concentrated
- Spring departure occurs rapidly

### Ecological Interpretation

Although intentionally simple, the model often reproduces recognisable winter visitor structures surprisingly well.

Different parameter combinations can generate curves resembling:

- Broad winter occupancy
- Concentrated mid-winter peaks
- Gradual autumn arrival
- Sharply bounded departure periods

The system does not attempt detailed simulation of migration, mortality, or flock movement. Instead, it focuses on the larger seasonal occupancy structure visible within long-term observational datasets.

## Example: Redwing (_Turdus iliacus_)

The example below shows the Winter Visitor Model configured for redwing observations.

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/ti84-winter.png" alt="Winter Visitor Model for Redwing (_Turdus iliacus_)">
    <figcaption>Winter Visitor Model for Redwing (_Turdus iliacus_)</figcaption>
  </figure>
</div>

Redwings provide a particularly useful example for the winter visitor model because their seasonal appearance naturally wraps across the calendar year boundary.

In many long-term observation records, redwings begin appearing during late autumn and early winter, remain present throughout winter, and then decline rapidly through spring before becoming effectively absent during summer.

The model attempts to reproduce this structure using:

- Circular seasonal forcing
- Overlapping autumn and winter components
- Strong out-of-season suppression

Several characteristic features are visible in the resulting curve:

- Elevated winter occupancy
- Gradual autumn arrival
- Sustained mid-winter persistence
- Rapid spring decline
- Prolonged summer absence

One of the more interesting aspects of the winter visitor model is its treatment of the annual cycle as a continuous circular structure rather than a fixed January-to-December interval. This allows the autumn arrival and spring departure phases to behave as part of a single ecological season despite crossing the year boundary.

The shallow rise visible toward the far right of the curve represents the beginning of autumn return as the system transitions back toward the next winter occupancy phase.

Despite running on highly constrained hardware, the TI-84 implementation preserves much of the broader seasonal structure of the desktop model while performing all numerical integration and graphical rendering directly on-device.

## Pocket Ecology

The winter visitor model represents an experiment in portable ecological computation:

> How much ecological structure can survive when reduced to extremely small computational systems?

The resulting calculator implementation is necessarily simpler than the desktop system, but it preserves much of the seasonal behaviour and ecological interpretability of the original model while fitting inside a battery-powered handheld device originally designed for school mathematics.

{% include ti84-python-invitation.html %}
