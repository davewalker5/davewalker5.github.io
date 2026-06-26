---
layout: default
title: The Core Growth Model
breadcrumb: The Core Growth Model
description: Introducing the biological framework and coupled differential equations that drive stromatolite growth.
series: stromatolites
chapter: 1
assets: "/images/modelling/stromatolites/"
---

# The Core Growth Model

## One-minute overview

Stromatolites grow because photosynthetic microbial mats continually grow upward towards the light, trapping and binding sediment to form successive laminated layers. Sediment periodically buries the surface. Microbes recover where light is sufficient, producing new layers. The model treats these interacting processes as coupled differential equations, allowing complex laminated structures to emerge naturally from simple ecological feedbacks.

## The Growth Model

The stromatolite growth model is a computational simulation of laminated microbial structures formed through the interaction of biological growth and sediment deposition.

Rather than attempting to reproduce every microscopic biological process, the model represents the major mechanisms believed to control stromatolite development. These mechanisms are expressed mathematically as a set of coupled differential equations describing how the surface of the stromatolite changes through time.

The resulting framework provides a biologically interpretable model that can later be extended with environmental forcing such as seasonal light cycles, changing sediment supply and stochastic disturbance.

## The Basic Idea

At each position on the actively growing stromatolite surface, growth is influenced by two competing processes:

- microbial growth increases surface height
- sediment burial suppresses further growth

Growth therefore depends not only on the current biological activity but also on the existing thickness of the microbial mat and the amount of newly deposited sediment.

The model follows these quantities continuously through time.

## Model Variables

The model tracks three primary state variables.

### Surface Height

```
H(x, t)
```

The height of the stromatolite surface above its initial substrate. Growth of this surface represents the visible accumulation of laminated carbonate through time.

### Living Microbial Biomass

```
B(x, t)
```

The active microbial community responsible for trapping sediment and promoting carbonate precipitation. Biomass increases through growth but decreases naturally through mortality and burial.

### Sediment Layer Thickness

```
S(x, t)
```

The thickness of loose sediment covering the microbial surface. Sediment accumulates through deposition and is gradually stabilised or incorporated into the growing stromatolite.

### Surface Growth

Surface elevation changes according to

```
∂H/∂t = αB − βS
```

where:

- α represents biological growth efficiency
- β represents burial efficiency

The first term increases surface height as microbial activity produces new carbonate. The second term reduces effective growth because accumulated sediment inhibits further upward development.

This simple equation captures the central balance between construction and burial.

### Biomass Growth

Living biomass changes according to

```
∂B/∂t = μL(H(x,t))B − δB − γSB
```

where

- μ is the maximum biological growth rate
- L(H) describes the available light
- δ is natural mortality
- γ measures burial stress

The first term represents microbial reproduction, the second represents ordinary losses through death and the third represents biomass lost because of sediment burial.

### Light Availability

Photosynthetic growth depends upon the amount of light reaching the actively growing microbial surface. Rather than depending directly upon stromatolite height, light is calculated from the depth of water above the living mat.

The current implementation therefore computes:

```
water_depth = water_level − H
```

followed by:

```
L = exp(−k · water_depth)
```

where

- k is the attenuation coefficient of the water
- water_depth is the depth of water above the living microbial surface.

As the stromatolite grows upward, the living surface approaches the water surface and the depth of overlying water decreases. Consequently, less light is absorbed before reaching the microbial mat, increasing the potential rate of photosynthesis. Seasonal variation in incident light is applied separately before this attenuation calculation.

### Sediment Dynamics

Sediment thickness evolves according to

```
∂S/∂t = D − λB − εS
```

where

- D is the external sediment supply
- λ represents microbial sediment trapping
- ε represents natural erosion or redistribution

Sediment is continuously supplied from the surrounding environment. Microbial communities bind and stabilise some of this material while other sediment is gradually removed or redistributed.


## Coupled Behaviour

The equations are linked:

- Increasing biomass causes faster surface growth
- Reduced light slows biological growth
- Sediment suppresses biomass while simultaneously limiting vertical growth

Together these feedbacks generate the layered structures characteristic of stromatolites. Rather than prescribing the final shape directly, the morphology emerges naturally from the interaction of these competing processes.

## Solving the Equations

The model combines continuous biological growth equations with discrete ecological events such as sediment burial and microbial recolonisation. Continuous processes are integrated numerically, while discrete events modify the layered structure as thresholds are reached.

No analytical solution is expected for the full model, particularly once environmental forcing and stochastic events are introduced.

Instead, the equations are solved numerically.

This allows biological growth, sediment accumulation and environmental forcing to interact continuously through time while maintaining numerical stability.


## Extension to Higher Dimensions

The equations above describe the biological behaviour at an individual location on the stromatolite surface. They are therefore independent of the overall geometry used to represent the growing structure.

In the two-dimensional implementation, these equations are solved independently for every position along a horizontal transect. In the three-dimensional rectangular model, the same equations are evaluated across a two-dimensional grid representing the complete microbial surface.

Each surface location maintains its own biological state and environmental history while interacting with neighbouring locations through weak spatial smoothing and locally varying environmental conditions. The governing biological equations themselves remain unchanged.

This separation between biological processes and spatial representation is a central design principle of the project. Increasingly realistic stromatolite geometries are introduced by extending the spatial framework rather than by modifying the underlying ecological model.

## Extending the Model

The equations described here represent the core biological model.

Additional ecological processes are introduced as forcing functions that modify one or more of the model parameters without altering the underlying biological framework.

Examples include:

- Seasonal light cycles
- Annual temperature variation
- Stochastic storm deposition
- Variable sediment supply
- Water-depth-dependent light attenuation

These forcing functions allow the same biological model to reproduce a much wider range of environmental conditions while keeping the mathematical structure both modular and interpretable.

## Model Philosophy

The objective of the model is not to recreate every cellular process involved in stromatolite formation.

Instead, it seeks to capture the principal ecological interactions that govern long-term growth:

- Biological construction
- Sediment deposition
- Burial
- Light limitation
- Environmental variability

By combining these processes within a transparent mathematical framework, the model provides a computational tool for exploring how simple biological and environmental mechanisms may give rise to the remarkable laminated structures preserved throughout Earth’s history.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}