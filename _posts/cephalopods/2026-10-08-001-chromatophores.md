---
layout: post
title: "Other Minds, Changing Colours and Some Code"
date: 2026-10-08 00:00:01
categories: [field-notes]
tags: [cephalopods, octopus, cuttlefish, other-minds, chromatophores, simulation, computational-natural-history, coding, python, javascript, field-notes]
excerpt: "Reading about the extraordinary minds of cephalopods led from handwritten notes to 2,500 simulated chromatophores — and eventually to an interactive experiment anyone can explore"
assets: "/images/"
notes:
  name: "blog/chromatophore-notes.png"
  alt: "Handwritten working notes on octopus skin patterning, showing the relationship between chromatophores, iridophores and leucophores and the neural and chemical mechanisms controlling their appearance"
  caption: "Handwritten working notes on octopus skin patterning, showing the relationship between chromatophores, iridophores and leucophores and the neural and chemical mechanisms controlling their appearance"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
chromatophores:
  name: "modelling/chromatophores/chromatophore/spots.png"
  alt: "Chromatophore View showing a spotted pattern formed from individual coloured pigment cells"
  caption: "Chromatophore View — the individual simulated pigment organs remain clearly visible"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
skin:
  name: "modelling/chromatophores/skin/random-mottle.png"
  alt: "Skin View showing a blended random mottled pattern"
  caption: "Skin View — the same underlying kind of system viewed as a continuous surface"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

Over the last few weeks I seem to have acquired rather a lot of octopuses. Not actual ones, obviously. Books, notes, diagrams, papers, questions — and, increasingly, bits of computer code inspired by them.

A large part of the blame belongs to Peter Godfrey-Smith's *Other Minds*.

I recently put my reading project based on the book onto Field Notes. It isn't intended as a chapter-by-chapter summary or a conventional book review. Instead, I've tried to collect the ideas that stayed with me, together with the questions and connections that emerged while I was reading.

And there were rather a lot of them.

## Other Minds

*Other Minds* uses cephalopods — particularly octopuses — as a route into some very large questions:

- How did nervous systems evolve?
- What counts as intelligence?
- What can behaviour tell us about sentience?
- How centralised does a mind need to be?
- And what happens when complex cognition evolves along a route very different from our own?

One thought in particular became something of a theme for my notes. Instead of simply asking:

> **How intelligent is this animal?**

it may be more useful to ask:

> **What does this animal need to be intelligent about?**

That distinction matters. An octopus does not inhabit our world, possess our body, experience our senses or share our evolutionary history. Judging another animal entirely by how closely it resembles us risks missing precisely the things that make it interesting.

<p class="feature-invite-action">
  <a href="/wildlife/other-minds/">Explore the Other Minds reading project</a>
</p>

And once I had finished the first round of notes, I found myself wanting to do something else with the ideas. Not simply read about cephalopods. Not simply write about them.

I wanted to **make something**.

## From Reading to Experiment

One of the subjects that had caught my attention was cephalopod skin.

Octopuses, cuttlefish and other cephalopods can produce extraordinarily rapid changes in appearance using systems that include pigment-containing organs called chromatophores.

The biology is considerably more complicated than the model I eventually built.

{% include fullwidth-image.html assets=page.assets img=page.notes %}

But one very simple computational question suggested itself:

> What happens if I create a surface from thousands of small pigment elements whose visible sizes can change independently?

That seemed manageable and, potentially, rather entertaining. So I built 2,500 of them.

## 2,500 Little Pigment Organs

The model contains a 50 × 50 field of simulated chromatophores.

Each one has:

- A fixed position
- A fixed pigment
- A current size
- A target size
- An expansion rate
- A contraction rate
- And, optionally, a response delay

There are four pigment classes — yellow, red, brown and black — distributed regularly across the field. Each individual element is extremely simple but, collectively, rather more interesting things begin to happen.

{% include fullwidth-image.html assets=page.assets img=page.chromatophores %}

Patterns aren't simply drawn onto the screen.

- The cells themselves remain where they are
- To produce spots, some cells expand while others contract
- To produce bands, a different set of targets is assigned
- To produce a gradient, expansion varies according to distance from the centre

The important thing is:

> **Same population. Different instructions. Different appearance.**

That turned out to be the idea I liked most.

## Two Ways of Looking

Quite early on I added two views of exactly the same simulation.

- **Chromatophore View** exposes the mechanism - every pigment cell remains visible, making it possible to inspect what the individual components are actually doing
- **Skin View** blends those contributions into something more like a continuous surface

{% include fullwidth-image.html assets=page.assets img=page.skin %}

Nothing about the underlying simulation changes when I switch views, only the representation changes. And that produces a pleasing pair of questions:

> What are the individual components doing?

and:

> What does their collective behaviour look like?

That idea — moving between local mechanism and emergent appearance — has become one of the most interesting aspects of the project.

## Making the Patterns Move

Static patterns were entertaining but dynamic patterns were considerably more so. Instead of assigning one set of targets and waiting for the field to settle, the simulator can continuously change what the cells are being asked to do.

- There are travelling waves
- Expanding pulses
- Moving bands
- Flashes
- Spreading excitation
- Continually changing mottled patterns

<figure class="report-figure no-print">
  <div class="report-image-wrap">
    <video class="responsive" controls preload="metadata">
      <source src="{{ site.assets_url }}/movies/modelling/chromatophores/changing-mottle.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption>
    Changing Mottle — the same population continually moving towards new mottled target patterns
  </figcaption>
</figure>

I particularly like _Changing Mottle_. A new target arrangement is generated periodically, but the existing field isn't replaced by a finished image. Instead, the chromatophores move towards the new targets.

- Some expand
- Some contract
- Some barely change
- And if another target arrives before they have finished, they change direction again

The result looks surprisingly organic despite the deliberate simplicity of the model.

## The Signal Isn't the Response

This led to something else I hadn't appreciated quite so clearly when I started. The simulator contains two separate timescales.

- The **display speed** controls how quickly the requested pattern changes
- The **response speed** controls how quickly the cells themselves can actually respond

Those aren't necessarily the same thing. Ask for a slow-changing pattern and even sluggish cells can follow it quite closely.Speed the instructions up while leaving the chromatophores slow and they begin to fall behind.

- Edges soften
- Movements become incomplete
- Patterns smear into one another

The control system can request a perfectly sharp wave. The simulated tissue is under no obligation to produce one. That gives the model a distinction I find rather appealing:

> **What the system is being told to do is not necessarily what it is physically capable of doing.**

## A Diamond I Never Drew

Local Excitation is probably my favourite example of how a very simple rule can produce something larger.

The signal begins at a central cell and then spreads to the immediate neighbours above, below, left and right. Those cells pass it onwards but diagonal transmission isn't allowed.

<figure class="report-figure no-print">
  <div class="report-image-wrap">
    <video class="responsive" controls preload="metadata">
      <source src="{{ site.assets_url }}/movies/modelling/chromatophores/local-excitation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption>
    Local Excitation — a larger-scale shape emerging from a very simple neighbour rule
  </figcaption>
</figure>

The spreading front forms a diamond. I never instruct the simulator to draw a diamond. It appears because of the geometry of the connections between neighbouring cells.

That is exactly the sort of result I enjoy in computational modelling: something entirely understandable once you know the rules, but which exists at a level above the rules themselves.

## This Is Not an Octopus

A necessary qualification: This isn't a physiological simulation of cephalopod skin. The real system is considerably richer and more complicated.

- The colours in my model are partly chosen for clarity
- The pigment cells occupy fixed positions
- Skin View is an approximation of a combined visual surface, not a model of optical processes in real tissue
- There are no muscles, fatigue, damage or biochemical mechanisms

That is deliberate - the project is **cephalopod-inspired** rather than biologically exact and the point is not to recreate an octopus but to use a deliberately simplified model to explore ideas such as:

- Local components and global patterns
- Changing signals
- Finite response
- Delay
- Spatial organisation
- Propagation
- Emergence

It is, in other words, another experiment in what I have increasingly come to think of as **computational natural history**.

## Publishing Completes the Loop

The original simulator was written in Python using _Pygame_, a choice that made sense for developing and experimenting with it. But once it worked, another question appeared:

> What was I going to do with it?

I put the source code on GitHub. I published screenshots. I recorded and published videos. But on their owne none of those really captured the thing I found interesting about it.

> The point was to **interact with the model**

- Change the pattern
- Speed it up
- Slow the cells down
- Add response delay
- Switch between the individual chromatophores and the combined surface while everything is still moving

And this connects to something I have been thinking about more generally with Field Notes:

> **Publishing completes the loop**

For me, the process increasingly looks something like:

```text
Observe
   ↓
Read
   ↓
Think
   ↓
Make
   ↓
Experiment
   ↓
Explain
   ↓
Publish
   ↓
Let somebody else explore
```

That last part matters. The Other Minds reading project shares my notes and interpretations. The Chromatophore Simulator takes one small strand of that wider curiosity and turns it into something manipulable. And the web-based explorer means somebody else can engage with the experiment without needing to install Python, clone a repository or know anything about how the code works.

So, inevitably, I rewrote the explorer in HTML, CSS and JavaScript.

<p class="feature-invite-action">
  <a href="/wildlife/chromatophores/explorer/">Launch the Chromatophore Explorer</a>
</p>

## From Reading to Something Shareable

I think this is the part of the whole exercise I find most satisfying. The chain now runs from a book about the evolution of minds, through handwritten notes and questions, into a computational model, then into explanatory writing, and finally into something interactive that another person can explore.

- The reading wasn't simply consumed
- The notes weren't simply filed away
- The code wasn't simply written

Each stage produced the next one and putting the result onto Field Notes turns what began as a private act of curiosity into something shareable.

That feels important.

## What Next?

There is certainly no shortage of possibilities.

- Neighbour interactions could become more sophisticated
- Patterns might emerge through reaction-diffusion rather than being prescribed
- The field might attempt to match a visual background
- Individual chromatophores could vary in response speed
- Some could fail
- A simplified predator visual system might even be used to judge the effectiveness of different patterns

But there is no particular urgency because the current version already does something I value. It began with reading about an animal whose mind and body are profoundly different from ours. That prompted questions. The questions prompted an experiment. And the experiment became something that other people can now play with.

Which seems a rather good outcome for a few days spent thinking about octopuses.

The next step will probably arrive in the usual fashion:

> Hang on. What happens if...?

{% include chromatophore-simulator-invitation.html %}
