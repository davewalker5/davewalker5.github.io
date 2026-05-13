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

These models have been fitted to observed data:

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/parameter-fitting.png" alt="Wildlife Seasonal Model Parameter Fitting Workflow">
    <figcaption>Wildlife Seasonal Model Parameter Fitting Workflow</figcaption>
  </figure>
</div>

This allows each species to be described not only by its pattern, but by a small set of parameters — timing, duration, and shape — that together form a simple seasonal “signature”.

In this way, the models sit alongside the observations. The analyses describe how species occupy the year; the models ask how those patterns might come to be, and provide a consistent way of comparing them.

## Available Models

{% include landing-section.html title_column_name="Title" items=site.data.wildlife_models category="models" %}

## From Species to Seasonal Structure

Once species have been fitted, the resulting parameter sets and observed seasonal characteristics can be converted into a common ecological feature space.

These features describe aspects of seasonal behaviour such as:

- Peak timing  
- Seasonal width  
- Detectability persistence  
- Seasonal symmetry and asymmetry  
- Occupancy characteristics  
- Derived ecological traits  

This allows species from different model families to be compared using a shared representation of seasonal ecological structure.

Rather than focusing solely on individual species, the modelling workflow increasingly becomes a way of exploring how the wider ecological community occupies the year.

## Ecological Similarity

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/similarity-analysis.png" alt="Feature Extraction, Species Similarity and Clustering Workflow">
    <figcaption>Feature Extraction, Species Similarity and Clustering Workflow</figcaption>
  </figure>
</div>

Using the extracted features, species can be compared using weighted ecological similarity metrics.

The aim is not to identify taxonomic similarity, but similarity of seasonal ecological signal:

- Shared timing structure  
- Similar persistence behaviour  
- Overlapping flowering or migration periods  
- Comparable detectability dynamics  
- Broad phenological synchrony  

This allows relationships to emerge not only within groups, but also across the ecosystem as a whole. Butterfly flight periods, flowering seasons, migratory arrival windows, and resident detectability patterns may all align within the same seasonal structure.

In this sense, the system becomes less a species comparison tool and more an exploration of the seasonal organisation of ecological activity.

## Ecological Neighbourhoods

Once pairwise similarities have been calculated, the resulting structures can be explored using clustering, dendrograms, and similarity heatmaps.

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/cluster-dendrogram.png" alt="Species Clustering Dendrogram">
    <figcaption>Species Clustering Dendrogram</figcaption>
  </figure>
</div>

These analyses attempt to identify seasonal ecological neighbourhoods — groups of species occupying similar regions of seasonal ecological space.

The neighbourhoods are not intended to represent rigid biological categories. Instead, they reveal broader seasonal assemblages and transitional structures, including:

- Resident bird neighbourhoods  
- Spring flowering communities  
- Butterfly emergence groupings  
- Winter visitor structures  
- Transitional seasonal assemblages  

Importantly, the structure is hierarchical rather than absolute. Some neighbourhoods remain tightly coherent, while others overlap, bridge, or dissolve gradually into neighbouring seasonal structures.

The resulting hierarchy increasingly resembles a seasonal ecological landscape rather than a fixed classification system.

## Seasonal Ecological Calendars

The neighbourhood structures can also be aggregated temporally to produce seasonal ecological calendars.

<div class="blog-image-grid blog-image-grid--1-col">
  <figure>
    <img src="/assets/images/modelling/cluster-activity-heatmap.png" alt="Cluster Seasonal Activity Heatmap">
    <figcaption>Cluster Seasonal Activity Heatmap</figcaption>
  </figure>
</div>

These calendars summarise the mean normalised activity of ecological neighbourhoods through the year, allowing broader community-scale seasonal structure to be visualised directly.

Rather than focusing on individual taxa, the calendars attempt to expose larger seasonal ecological modes, including:

- Winter visitor activity  
- Spring flowering and emergence periods  
- Resident detectability dynamics  
- Extended summer assemblages  
- Autumn transitional structure  

The resulting heatmaps provide a view of how different regions of seasonal ecological space become active, overlap, and decline through the ecological year.

## Interpretation

These models are deliberately simple and abstract — closer to minimal representations than detailed ecological mechanisms — and are intended to explore whether the observed patterns can arise from a small number of underlying processes, not to predict observations.

The broader analytical workflow follows the same philosophy. The emphasis throughout remains on interpretability, transparency, and ecological meaning rather than highly optimised black-box modelling approaches.

The aim is not simply to generate predictions, but to build an interpretable computational natural history framework capable of exploring the seasonal structure of ecological communities.

{% include ode-solver-invitation.html %}