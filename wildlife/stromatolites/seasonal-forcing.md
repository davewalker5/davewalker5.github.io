---
layout: default
title: Seasonal Environmental Forcing
breadcrumb: Seasonal Environmental Forcing
description: Exploring how annual cycles of light and temperature influence stromatolite development without altering the underlying biological model.
series: stromatolites
chapter: 2
assets: "/images/modelling/stromatolites/"
---

# Seasonal Environmental Forcing

The core stromatolite model describes the biological interaction between microbial growth, sediment deposition and burial.

Natural environments, however, are rarely constant. Throughout the year, changing daylight and temperature alter the conditions experienced by microbial communities, influencing their rate of growth without changing the underlying biological processes.

Rather than introducing additional state variables, the model represents these seasonal effects as external forcing functions that modify existing biological rates. This approach keeps the core model unchanged while allowing environmental conditions to vary naturally through time.

## Why Use Forcing Functions?

Seasonality does not create new biological processes. Instead, it changes the conditions under which existing processes occur.

For example:

- longer summer days provide more light for photosynthesis
- warmer temperatures increase microbial activity
- winter conditions slow biological growth

The mathematical structure of the model therefore remains unchanged. Only the values of selected parameters vary with time.

This separation between biological processes and environmental forcing makes the model easier to understand, extend and interpret.

# Annual Light Cycle

Surface illumination is represented by a simple sinusoidal function that repeats once per year.

```
seasonal_light = mean_light × (1 + light_amplitude × cos( 2π(day − peak_day) / 365.25))
```

where

- mean_light is the average annual surface illumination
- light_amplitude controls the strength of seasonal variation
- peak_day specifies the day of maximum illumination

For a temperate Northern Hemisphere environment, the peak typically occurs close to the summer solstice.

Because real environments never become completely dark during daylight hours, the calculated value is limited to a user-defined minimum.

```
seasonal_light = max(min_light, seasonal_light)
```

This prevents unrealistic zero-growth conditions while still allowing substantial seasonal variation.

## Light Availability Within the Water Column

The seasonal surface illumination is then combined with the existing depth-dependent attenuation model.

```
effective_light = seasonal_light × exp(−attenuation × depth)
```

This means that biological productivity depends upon two separate effects:

- Seasonal changes in incoming sunlight
- Attenuation of light with water depth

The resulting light availability is converted into a biological growth factor using the existing light-limitation function.

```
growth_light_factor = effective_light / ( effective_light + half_saturation_light )
```

This produces a smooth transition from light-limited growth to light-saturated growth.

## Annual Temperature Cycle

Temperature is modelled using a second sinusoidal forcing function.

```
seasonal_temperature = mean_temperature + temperature_amplitude × cos( 2π(day − peak_day) / 365.25 )
```

Typical parameters place the annual maximum during late July or early August, slightly later than the peak in daylight.

This phase lag reflects the thermal inertia of land and water, where temperatures continue to rise after the longest day of the year.

## Biological Temperature Response

Microbial growth does not increase indefinitely with temperature. Instead, each microbial community has an optimum temperature at which biological activity is greatest.

The model represents this using a bell-shaped response function.

```
temperature_factor = exp( −( ( seasonal_temperature − optimal_temperature ) / temperature_width )² )
```

where

- optimal_temperature specifies the preferred growth temperature
- temperature_width controls how rapidly growth declines away from this optimum

This produces reduced growth during both unusually cold and unusually warm conditions.

## Combining Light and Temperature

The effective biological growth rate becomes

```
effective_growth_rate = maximum_growth_rate × light_factor × temperature_factor
```

Similarly, extracellular polymeric substance (EPS) production is scaled by the same temperature response.

```
effective_eps_rate = base_eps_rate × temperature_factor
```

No other parts of the biological model require modification.

The environmental forcing simply adjusts the rates at which existing biological processes occur.

## Daily Simulation Workflow

During each simulation step the model performs the following sequence.

1. Calculate the current day of the year.
2. Determine seasonal surface illumination.
3. Determine seasonal temperature.
4. Calculate light availability after depth attenuation.
5. Calculate the temperature response.
6. Modify biological growth rates.
7. Update the core stromatolite model using the existing differential equations.

This keeps the environmental calculations separate from the biological dynamics while allowing both to interact naturally.

## Ecological Consequences

Without seasonal forcing, stromatolite growth proceeds under constant environmental conditions, producing relatively uniform laminae. Introducing seasonal variation produces a more realistic growth history.

Periods of favourable light and temperature lead to:

- Faster microbial growth
- Increased EPS production
- More rapid vertical accretion

Less favourable seasons produce slower biological activity and thinner layers. The resulting lamination becomes less uniform, reflecting the changing environmental conditions experienced throughout the year.

## Design Philosophy

Seasonal forcing represents one of several environmental processes that can influence stromatolite development.

The model deliberately treats these processes as independent modules rather than embedding them directly within the biological equations.

This modular approach provides several advantages:

- The core biological model remains simple and interpretable
- Additional forcing functions can be introduced without restructuring the mathematics
- Individual environmental effects can be enabled, disabled or studied independently

As the project develops, further environmental forcing—including stochastic storm events, changing sediment supply and variable water depth—can be incorporated using the same framework.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include stromatolite-growth-invitation.html %}
