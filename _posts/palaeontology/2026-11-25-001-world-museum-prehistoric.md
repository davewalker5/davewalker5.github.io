---
layout: post
title: "World Museum - Liverpool's Prehistoric Past"
date: 2026-11-25 00:00:01
categories: [field-notes]
tags: [liverpool, world-museum, palaeontology, fossils, geology, evolution, cephalopods, computational-modelling, natural-history, travel, reflection, passage-of-time, field-notes-practice]
excerpt: "Exploring the palaeontology displays at Liverpool's World Museum, from Triassic trace fossils and ancient marine life to vertebrate evolution, and discovering connections with computational models and geological time."
series: liverpool2026
series_order: 2
assets: "/images/liverpool/"
movies: "/movies/liverpool/"
orthocone:
    name: "orthocone.mp4"
    caption: "Reconstruction of an orthoconic cephalopod in a simulated prehistoric marine environment"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
orthocone_images:
  - name: "orthocone-opaque-aperture.png"
    alt: "Computational model of a straight, tapering orthocone shell viewed from the aperture"
    caption: "An orthocone shell generated using LogSpiral, exploring the geometry of straight, conical cephalopod shells"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "annulated-orthocone-opaque-iso.png"
    alt: "Computational model of an annulated orthocone shell with regularly spaced transverse ridges"
    caption: "An annulated orthocone generated using LogSpiral, incorporating regularly spaced surface ornamentation into the underlying conical shell geometry"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "orthocone-exhibit.png"
    alt: "Reconstruction of an orthoconic cephalopod with tentacles projecting from its shell in a simulated underwater environment"
    caption: "The orthoconic cephalopod reconstruction at Liverpool's World Museum"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
cephalaspis_lyellii:
    name: "cephalaspis-lyellii.jpg"
    alt: "Hand-drawn sketch of Cephalaspis lyellii showing its distinctive head shield and intricate surface patterning"
    caption: "My observational sketch of Cephalaspis lyellii, a Devonian jawless fish dating from approximately 390 million years ago, recording the intricate patterning of its head shield"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
crioceratite:
    name: "crioceratite-opaque-presentation.png"
    alt: "Computational model of an ornamented ammonite shell with open coiling"
    caption: "A crioceratite-inspired shell generated using LogSpiral, exploring the distinctive coiling geometry and surface ornamentation of heteromorph ammonites"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
images:
---

On 17 November 2026, during a short visit to Liverpool, I spent a day exploring the collections at the World Museum, an obvious destination given my interests in natural history, palaeontology, marine biology, ancient civilisations and science. Its collections are very varied and this is the first of a short series of articles about the experience, beginning with the palaeontology displays.

What I hadn't necessarily anticipated was how frequently the exhibits would connect with my own scientific and computational projects, with a reconstruction of a prehistoric cephalopod bringing to mind mathematical models of shell geometry and the ammonite displays prompting questions about evolutionary change and its relationship with geological time.

I took notes throughout the visit using a Kindle Scribe, recording facts, drawing diagrams and identifying questions for subsequent investigation and organising the information, finding relationships and connecting it with existing knowledge became an important part of the experience itself.

What follows is a selection of observations, reflections and connections — an exploration both of what the museum contained and the ideas its collections prompted.

## Triassic Liverpool

The palaeontology exhibits began with a particularly interesting local connection, in that much of Liverpool's underlying geology consists of red and yellow Triassic sandstone, deposited approximately 240 million years ago, when the region occupied a very different geographical position, considerably closer to the equator. Needless to say, the familiar landscape of modern Liverpool bears little resemblance to its Triassic environment!

At Storeton Quarry, on the Wirral, sandstone deposits have preserved evidence of prehistoric life, including trace fossils that are of particular interest because they record the _activity_ of organisms rather than necessarily preserving their bodies. Footprints, for example, can reveal information about an animal's movement and the surface over which it travelled, even when the animal itself has left no other remains.

The exhibits included examples of distinctive, hand-shaped fossil footprints classified as _Chirotherium_. These fall within the field of _ichnology_, the scientific study of traces left by organisms, including footprints, trackways, burrows and feeding marks. In palaeontology, such trace fossils provide evidence of the behaviour, locomotion and interactions of ancient organisms, even when physical remains of the animal have not been preserved.

_Chirotherium_ is what is termed an _ichnogenus_ — a classification based on the distinctive morphology of a trace fossil rather than the preserved anatomy of the organism that produced it and, importantly, the footprints themselves are _Chirotherium_, not the animal that made them.

The tracks are generally attributed to crocodile-line _archosaurs_, members of the group _Pseudosuchia_, and the footprints provide an independent line of evidence for the presence and locomotion of these reptiles within Triassic ecosystems, though the precise identity of the track-makers remains uncertain. Many of the prehistoric creatures we're used to learning about are on a large scale so I was struck by how surprisingly small the footprints appeared when compared with my own hand.

The quarry's fossils also include ripple marks preserved in sandstone, providing evidence of the movement of shallow water across surfaces that would eventually become rock and, together, the footprints and sedimentary structures offer glimpses of an environment that existed long before anything recognisable as modern Liverpool.

## The Silurian Seas

Moving further back through geological time, the museum's displays included fossils of trilobites, readily recognised from their characteristic segmented exoskeletons, crinoids and other marine organisms dating from the Silurian, approximately 420 million years ago, animals that inhabited seas that existed hundreds of millions of years before the appearance of modern human civilisation.

Crinoids, commonly known as sea lilies in their stalked forms, are echinoderms related to modern starfish and sea urchins and their fossils provide another reminder that many modern marine groups have ancient evolutionary origins.

Then there was an exhibit that proved particularly memorable ...

## An Encounter with an Orthocone

The museum featured a reconstruction of an orthoconic cephalopod suspended in a simulated underwater environment. Rather than presenting the animal simply as a fossil, the exhibit placed it among reconstructed rocks and marine organisms, with lighting suggesting movement beneath the surface of the sea and the result was an evocative glimpse of prehistoric marine life.

Orthocones possessed long, approximately straight shells tapering towards one end and, like other externally shelled cephalopods, their shells could contain internal chambers involved in regulating buoyancy. The reconstructed animal had its head and tentacles projecting from the opening of the shell and I was sufficiently taken with the exhibit that I recorded a short video.

{% include fullwidth-movie.html assets=page.movies img=page.orthocone %}

There was an additional reason for my interest, of course: I had already built computational models of orthocone shells.

_LogSpiral_ is a computational modelling project exploring the mathematics of shell geometry and related forms. The logarithmic spiral is particularly interesting because its growth preserves the overall geometry of a structure while increasing its dimensions and although coiled shells are an obvious application the project also includes models of straight, conical shells, amongst which are an orthocone and an annulated orthocone, the latter incorporating regularly spaced surface features.

{% assign assets_path = site.assets_url | append: page.assets %}
{% include image-block.html images=page.orthocone_images assets=assets_path %}

This was one of the most satisfying connections of the visit, an exhibit encountered unexpectedly in a Liverpool museum relating directly to computational work undertaken independently some time earlier prompted by a display at another museum, the Oxford University Museum of Natural History!

## Ancient Fish and the Evolution of Vertebrates

The museum also featured a model of the coelacanth, _Latimeria chalumnae_. Coelacanths _are_ – a tense that isn't often associated with creatures featuring in paleontological exhibitions – lobe-finned fishes belonging to an evolutionary lineage that extends back to the Devonian.

Although modern coelacanths retain many anatomical characteristics of their ancient relatives, the fossil record reveals a considerably greater diversity of forms than is represented by the two surviving species. The Triassic coelacanth _Rebellatrix divaricerca_, for example, possessed a distinctive forked tail, suggesting a different swimming strategy, while _Foreyia maxkuhni_, from the same geological period, possessed an unusually domed skull and relatively short body.

Coelacanths are frequently described as "living fossils", and it's true to say that after a period of relatively rapid diversification in the Devonion their subsequent evolutionary history has been characterised by very slow-moving changes in morphology. However, this doesn't imply an absence of evolutionary change and their continued existence provides a fascinating example of how some anatomical characteristics can persist over geological timescales without evolution itself having ceased.

Another specimen that caught my eye was _Cephalaspis lyellii_, a Devonian jawless fish dating from approximately 390 million years ago. Its distinctive head shield carried an intricate pattern, which I sketched in my notes:

{% include fullwidth-image.html assets=page.assets img=page.cephalaspis_lyellii %}

The contrast between these ancient fishes and modern vertebrates illustrates how extensively the vertebrate body plan has changed over time, while also preserving features inherited from distant evolutionary ancestors.

## Ammonites and Evolutionary Change

The ammonite displays were another highlight, with examples of Jurassic ammonites, approximately 150–200 million years old, and a variety of shell forms, including smooth external surfaces and distinct internal structures visible in sectioned specimens. Some of the forms reminded me of crioceratitid ammonites, with their conspicuous shell ornamentation and changes in coiling, another form modelled in the _LogSpiral_ project.

{% include fullwidth-image.html assets=page.assets img=page.crioceratite %}

One aspect of the display that particularly caught my attention was the rapid evolutionary change evident in many ammonite lineages, with many individual ammonite species existing for relatively short spans of geological time. This is in marked contrast to the morphological conservatism of coelacanths and serves as a reminder that evolution does not proceed at a uniform rate.
 
This makes them especially useful as _index fossils_ in the discipline of _biostratigraphy_. If an identifiable species was once geographically widespread, its occurrence in different rock sequences can help establish the relative ages of those rocks and correlate strata from different locations.

This brought to mind another computational project dealing with deep time, the _Molecular Clock Simulation_. While biostratigraphy establishes the relative age of fossil-containing rock strata, molecular clocks use genetic differences, together with estimates of evolutionary rates and appropriate calibration, often from dated fossil evidence, to estimate the times at which evolutionary lineages diverged.

The two techniques are completely different, asking different questions, but share the principle that evolutionary change can provide information about the passage of time.

## Other Inhabitants of Prehistoric Earth

The marine reptiles were represented by a model of an ichthyosaur dating from approximately 200 million years ago, a time when shallow seas covered substantial parts of what is now Britain. Its streamlined body illustrated just how extensively a reptilian body plan could become adapted to life in the water. There is an interesting example of convergent evolution here, in that the overall form of ichthyosaurs bears a resemblance to that of modern dolphins, despite their very different evolutionary origins.

Amongst the dinosaur exhibits was _Protoceratops_, a herbivorous dinosaur from the Late Cretaceous and an animal that I remember vividly from my dinosaur books as a child, a reminder, if I needed one, of an interest in prehistoric life that has persisted since childhood.

Taken together, the palaeontology displays provided a journey across geological time, from the marine ecosystems of the Palaeozoic to the relatively recent emergence of humans in the displays of early hominins. What made the experience particularly rewarding, though, was the variety of connections that emerged along the way between fossils and computational models, between the geological record and evolutionary processes and between interests developed in childhood and those I'm pursuing today.

{% include logspiral-invitation.html %}
{% include molecular-clock-invitation.html %}

