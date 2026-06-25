---
layout: default
title: Light Attentuation
breadcrumb: Light Attentuation
description: Simulating how the overlying water column regulates photosynthesis through depth-dependent light attenuation.
series: stromatolites
chapter: 4
assets: "/images/modelling/stromatolites/"
---

# Light Attentuation

Photosynthetic microbial mats depend upon the amount of light reaching their actively growing surface.

In the earliest versions of the model, light availability was reduced according to the total height of the stromatolite. While this provided a simple mechanism for limiting growth, it implied that the stromatolite itself was responsible for attenuating incoming light.

The model has since been refined to represent a more realistic ecological situation.

Rather than depending upon stromatolite thickness, light availability is now determined by the depth of water above the living microbial surface.

This change better reflects the physical processes occurring in shallow marine environments, where the overlying water column is the principal cause of light attenuation.

## The Ecological Motivation

The actively growing microbial community always occupies the uppermost surface of the stromatolite.

As the stromatolite grows upward:

- The living surface moves closer to the water surface
- The depth of overlying water decreases
- Less light is absorbed before reaching the microbial mat
- Photosynthetic activity can increase

Unless the water level also rises, upward growth therefore tends to improve light availability rather than reduce it.

This feedback emerges naturally when attenuation is calculated through the water column instead of through the stromatolite itself.

## Water Depth Above the Microbial Mat

The model first determines the depth of water covering the living surface.

```
water_depth = water_level − stromatolite_height
```

To prevent unrealistic situations in which the stromatolite emerges completely above the water surface, the calculated depth is constrained to a minimum value.

```
water_depth = max( minimum_water_cover, water_level − stromatolite_height )
```

This ensures that the microbial community always remains submerged while still allowing shallow-water growth.

The stromatolite height used in this calculation is the elevation of the actively growing surface measured from the original substrate. It therefore represents the total accumulated thickness of the stromatolite rather than the thickness of the current microbial mat.

## Light Attenuation

Incoming surface illumination is then attenuated according to the depth of overlying water.

```
light_at_mat = incident_light × exp( −k × water_depth )
```

where

- incident_light is the seasonally varying surface illumination
- k is the attenuation coefficient of the water
- water_depth is the depth of water above the microbial surface

This follows the familiar exponential attenuation relationship used throughout aquatic ecology.

Clear water produces relatively little attenuation, while turbid water reduces the amount of light reaching the microbial mat.

## Light-Limited Growth

The available light is converted into a biological growth factor using the existing light-limitation function.

```
light_factor = light_at_mat / ( light_at_mat + half_saturation_light )
```

This produces a smooth transition between strongly light-limited growth and conditions where additional illumination provides little further benefit.

The calculated light factor is then incorporated into the biological growth equations described in the core model.

## Daily Simulation Workflow

During each simulation step the model performs the following sequence.

1. Calculate the current seasonal surface illumination.
2. Determine the depth of water above the stromatolite.
3. Calculate light attenuation through the water column.
4. Compute the biological light-limitation factor.
5. Update microbial growth using the existing differential equations.

This allows changing stromatolite height to influence photosynthetic productivity without altering the underlying biological model.

## Relationship to Seasonality

Light attenuation operates alongside the seasonal forcing described elsewhere in the model.

- Seasonality determines the amount of light arriving at the water surface
- Water-column attenuation determines how much of that light reaches the microbial mat

Together they produce the effective illumination experienced by the living microbial community.

The two processes therefore represent different parts of the same physical system rather than alternative methods of calculating light availability.

## Buried Layers

Only the actively growing surface receives sufficient light for photosynthesis.

Once a layer becomes buried beneath sediment or younger stromatolite growth, it is no longer treated as photosynthetically active, regardless of the amount of light available above the water surface.

This distinction separates environmental illumination from biological activity and better reflects the ecology of living microbial mats.

## Future Extensions

The current implementation assumes a constant water level.

Future versions of the model may allow water depth itself to vary through time, for example through:

- Seasonal fluctuations in water level
- Tidal cycles
- Longer-term sea-level change
- Episodic flooding events

In these cases, the same attenuation model can be retained by simply allowing the water level to become another environmental forcing function.

## Design Philosophy

This refinement illustrates an important principle used throughout the stromatolite model. Where possible, environmental processes are represented by the physical mechanism that directly influences microbial growth.

In this case, photosynthesis is controlled not by the total thickness of the stromatolite, but by the depth of water through which sunlight must travel before reaching the living microbial surface.

The resulting model remains mathematically simple while providing a more faithful representation of the ecological conditions under which stromatolites develop.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}