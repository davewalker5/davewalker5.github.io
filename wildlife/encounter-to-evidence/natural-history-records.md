---
layout: default
title: Creating Natural History Records
breadcrumb: Creating Natural History Records
description: How ReefTag identifications become consolidated Nature Recorder sightings, addressing repeated observations, avoiding unsupported counts of individual animals and enabling descriptive analysis within the limits of the evidence.
series: from_encounter_to_evidence
chapter: 5
assets: "/images/encounter-to-evidence/"
maldives_fish_composition:
  name: "maldives-fish-composition.png"
  alt: "Pie chart showing the final species composition of the Fish category in Nature Recorder, following four snorkelling excursions at Moofushi"
  caption: "The final composition of recorded fish species following four snorkelling excursions. Each segment represents a species' share of consolidated natural history sightings, rather than a count of individual animals."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Creating Natural History Records

_ReefTag_ and _Nature Recorder_ serve different, complementary purposes within the observation workflow:

- _ReefTag_ provides the means to examine individual images, identify the animals they contain and retain the relationship between those identifications and their supporting photographic evidence
- _Nature Recorder_, which predates the Maldives project, provides an established system for storing, organising and analysing natural history observations

The transfer between them represents a change in how the information is organised and, importantly, what the resulting records can reasonably be taken to represent.

## The Problem of Repeated Observations

One of the fundamental difficulties with identifying wildlife from video footage is that an identification does not necessarily represent a distinct animal.

A fish may remain visible for several seconds, appearing in dozens or hundreds of video frames, and consequently several still images extracted from that sequence might contain the same individual and each image could produce a separate identification in _ReefTag_. The same fish might also reappear later in the recording, or in another video captured during the same excursion. As a result, ten identification markers do not necessarily represent ten fish but may represent ten different individuals, repeated observations of a single individual, or some combination of the two.

The number of identifications recorded in _ReefTag_ is influenced by the character of the footage, the selection of representative images and the number of animals visible within them and identification counts describe the annotation activity and its results but cannot be interpreted directly as counts of distinct animals or as measures of population abundance.

## Consolidation by Species, Location and Date

The transfer to _Nature Recorder_ addresses this problem by consolidating identifications, retaining only the information needed to establish a basic natural history sighting. For each distinct combination of species, location and date, the transfer creates a single _Nature Recorder_ sighting, unless an equivalent record already exists.

Consider a hypothetical example involving a _Moorish Idol, Zanclus cornutus_:

- Suppose the same fish appears in several extracted images
- This produces eight identification markers in _ReefTag_
- If all eight identifications relate to the same location and recording date, they produce just one _Nature Recorder_ sighting

The same consolidation occurs if the eight markers actually represent several different Moorish Idols and the resulting record establishes that the species was documented at that location on that date, without attempting to establish how many individual animals were present.

If Moorish Idols were also recorded at another location, a separate sighting would be created for that location. Likewise, an observation made on another date would produce a separate record.

This approach deliberately changes the unit of recording from an individual photographic identification to a documented occurrence of a species at a particular place and time. It is a practical response to the limitations of the source material.

## Avoiding False Precision

An important consequence of this approach is that the transfer does not populate _Nature Recorder's_ numerical abundance field, that is left empty on account of the fact that the identification markers do not provide a defensible count of distinct individuals.

Once again, recording that a species was present is not equivalent to establishing how many individuals were present and nor does consolidating repeated identifications establish that all the source images depict the same animal.

The resulting records are therefore suitable for describing documented species occurrence, but not for estimating animal populations.

## Analysing the Results

Once transferred, the sightings become available to _Nature Recorder's_ existing analytical and reporting facilities where the dataset can support questions such as which species were documented, at which locations, on which dates, and how the recorded species inventory developed as further excursions were incorporated.

It also provides the basis for examining species composition and producing the maps, charts and reports subsequently published through _Field Notes_.

The final composition of the *Fish* category, following the transfer of observations from all four snorkelling excursions, provides one example of the descriptive analysis made possible by this process.

{% include fullwidth-image.html assets=page.assets img=page.maldives_fish_composition %}

The chart illustrates both the diversity of species documented and the varying proportions of the resulting sighting records. Crucially, those proportions reflect the observations accumulated through the recording and consolidation process. They do not establish the relative abundance of the species within the reef ecosystem. A species appearing in a larger segment was more frequently represented in the consolidated records, not necessarily more abundant in the water.

It does not, however, remove the underlying biases of recreational recording. The footage was collected opportunistically, without standardised survey effort, transects, quadrats or a controlled sampling design. The presence of a species can be documented, but its absence from the recordings cannot establish its absence from the reef and nor can the data be used as a reliable measure of population abundance or density.

> The transfer does not make the original observations more scientifically precise than they were - it makes their interpretation more disciplined

By consolidating repeated identifications, avoiding unsupported individual counts and retaining the distinction between photographic evidence and natural history sightings, the workflow produces a dataset whose analytical meaning is more clearly defined.

That is a substantial achievement in itself: A collection of recreational wildlife recordings has become an organised body of documented species occurrences, suitable for descriptive analysis within the limits of the evidence from which it was derived.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include reef-suite-invitation.html %}
