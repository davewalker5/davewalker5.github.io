---
layout: post
title: "Seeing the Model: Building an Interactive Stromatolite Explorer"
date: 2026-07-02 00:00:01
categories: [field-notes]
tags: [stromatolites, computational-natural-history, visualisation, three-dimensional, simulation, plotly]
excerpt: "After developing the biological model through five successive geometries, the final step was not more science, but a better way of exploring it."
assets: "/images/"
series: stromatolites
series_order: 6
interactive_render_001:
  name: "modelling/stromatolites/3d-interactive-render-001.png"
  alt: "3-D Circular Domed Model Interactive Explorer"
  caption: "Interactive Explorer of the 3-D Circular Domed Stromatolite Model"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
interactive_render_002:
  name: "modelling/stromatolites/3d-interactive-render-002.png"
  alt: "3-D Circular Domed Model Interactive Explorer"
  caption: "Browsing Representative Growth Layers"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
montage:
  name: "blog/stromatolite-montage.png"
  alt: "Development of the Stromatolite Growth Model"
  caption: "Development of the Stromatolite Growth Model"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

There comes a point in every modelling project where another question presents itself. Not:

> How can the model become more realistic?

But, rather:

> How can the model become easier to understand?

By the time the domed stromatolite model was complete, I felt the scientific side of the project had reached a natural stopping point.

- The biological model had remained remarkably stable throughout.
- The geometry had evolved from a single vertical column into a fully three-dimensional domed structure.
- The project had answered the questions I had originally set out to investigate.

That made it possible to indulge in something rather less scientific.

## A Better Way of Seeing

Throughout the project I had resisted spending time on visualisation. There is always a danger that attractive graphics become mistaken for scientific progress whereas the mathematics remains exactly the same whether the results are displayed as numbers, static figures or interactive three-dimensional models.

Only once the modelling itself felt complete did I allow myself to build something whose primary purpose was communication: an interactive explorer.

As often happens with software projects, it quietly became something a little more useful than I had expected. Rather than displaying only the final stromatolite surface, it became possible to browse through representative stages of growth, turning the visualisation into another way of exploring the model.

{% include fullwidth-image.html assets=page.assets img=page.interactive_render_001 %}

## Looking Rather Than Reading

Static figures are excellent for publications because they capture carefully chosen moments. Interactive visualisations offer something different as they allow the reader to decide what is interesting:

- Rotate the model
- Zoom in
- Look underneath
- Browse through representative growth layers
- Replay the development of the stromatolite through time

The underlying simulation never changes, but the viewer can now explore both the stromatolite from different viewpoints and its development through representative stages of growth.

Understanding a three-dimensional object often becomes much easier when the reader is free to investigate it for themselves.

## The Explorer Isn't the Achievement

Perhaps the most important thing to say about the interactive explorer is that it isn't the achievement.

The achievement is the ecological growth model developed over the previous stages of the project.

The explorer introduces no new biology, ecology or mathematics. It performs no simulation and adds no new assumptions. Everything it displays has already been produced by the underlying model.

Its purpose is simply to make those results easier to understand so in many ways it occupies the same role as a museum reconstruction. A carefully prepared fossil specimen is already scientifically valuable, but a reconstruction often makes it much easier to appreciate.

Neither replaces the other.

{% include fullwidth-image.html assets=page.assets img=page.interactive_render_002 %}

## Communication Has Its Own Challenges

Building the explorer was enjoyable precisely because it carried no scientific pressure.

- There were no new equations to derive
- No ecological assumptions to justify
- No numerical behaviour to validate

Instead, the questions became those of communication:

- How should the lighting work?
- Should the axes be visible?
- Which colour palette best communicates layered growth?
- How should the viewer move through the stored growth history?
- What camera angle provides the clearest first impression?

Those questions matter, but they are different questions. They belong to communication rather than modelling.

## Looking Back

Reflecting on the project as a whole, what strikes me most is not the interactive explorer itself.

It is the path that led there.

- The project began with a sketch made while reading about stromatolites over breakfast
- That sketch became a one-dimensional biological model
- The model expanded into two dimensions
- Then three
- Artificial boundaries gradually disappeared
- The computational framework matured
- The geometry became progressively more realistic

Only then came the visualisation.

In retrospect, the interactive explorer feels less like the destination than a celebration of the journey.

{% include fullwidth-image.html assets=page.assets img=page.montage %}

## Simplicity Is Often Underrated

This project has reinforced something I found repeatedly throughout my professional career:

> Simplicity is often underrated.

Computational modelling is frequently portrayed as an exercise in building ever more complicated simulations but my own experience has been almost the opposite: The greatest progress came not from adding complexity, but from introducing it only after the previous stage had become properly understood.

- The one-dimensional model established the biology
- The two-dimensional model established spatial behaviour
- The three-dimensional models progressively removed geometric simplifications

Only once all of that felt complete did it become worthwhile investing time in presentation.

Perhaps that is the real outcome of the project.

Not simply a model of stromatolite growth, but a reminder that careful, incremental development remains one of the most satisfying ways to explore the natural world.

## Where Next?

For now, nowhere.

That might sound like an unusual conclusion to a modelling project, but it feels like the right one.

The current framework provides a solid foundation should new scientific questions arise in the future.

There are many possible directions for further work.

- More sophisticated sediment dynamics
- Changing water depths
- Hydrodynamic forcing
- Multiple microbial communities

Each would be interesting, but none feels necessary today.

Instead, I intend to spend some time simply enjoying what has been built.

There is value in finishing a piece of work, reflecting on it, and allowing it to stand on its own before deciding where curiosity leads next.

{% include stromatolite-modelling-invitation.html %}