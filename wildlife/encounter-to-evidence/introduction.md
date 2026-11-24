---
layout: default
title: From Encounter to Evidence
breadcrumb: From Encounter to Evidence
description: The story of how recreational underwater footage became structured natural history evidence
series: from_encounter_to_evidence
chapter: 1
assets: "/images/encounter-to-evidence/"
pathway:
    name: "evidence-pathway.png"
    alt: "The Evidence Pathway"
    caption: "The Evidence Pathway"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# From Encounter to Evidence

In October 2026, a holiday at Constance Moofushi in the Maldives produced something unexpected: Not just memorable encounters with marine wildlife, but the beginnings of a natural history recording project.

Four occasions snorkelling with GoPro cameras resulted in approximately 50 Gb of underwater footage recording encounters with sharks, rays, reef fish and many extraordinary moments that deserved another look.

The material wasn't recorded with the intention of conducting an ecological survey, although the intention at the outset had been to record sightings of identified species in _Nature Recorder_, an application developed many years before the trip. This prompted the question:

> How much useful observational information could be recovered from them?

## From Raw Footage to Publication

When I boarded the seaplane for Moofushi, I certainly hadn't intended to return home and develop three new software applications!

The plan was simply to enjoy the Maldives, explore its reefs and record some of the extraordinary marine life we encountered. However, the GoPro footage presented an opportunity and prompted a question, and what began as an attempt to extract useful observations gradually evolved into something rather more ambitious.

Underwater footage can be hazy, low in contrast and difficult to inspect so to address these issues I developed a set of scripts for processing the recordings. These gradually became _ReefFrame_, a dedicated application for preparing footage and extracting representative still images in which species could subsequently be identified.

Looking at the marine wildlife moving across the reef prompted a further question:

> Could individual fish be found and followed through the video?

That became _FishTrack_, a separate experimental investigation using conventional computer vision and learned segmentation techniques.

Preparing data for input into _Nature Recorder_ presented a more immediate practical problem. The animals visible in selected frames needed to be recorded in an organised catalogue holding identifications, locations and dates, to enable subsequent transfer to _Nature Recorder_. _ReefTag_ provided a workspace for human identification and annotation, and transfer of the resulting observations.

Finally, _Nature Recorder's_ reporting facilities generated observation reports that were published on _Field Notes Journal_. The journey had reached publication.

## The Evidence Pathway

{% include fullwidth-image.html assets=page.assets img=page.pathway %}

As an experiment in computer vision, _FishTrack_ is not involved in the process of extracting structured observations from the footage and so is not included in the diagram.

### The Nature and Limits of the Evidence

The aim of this study is to examine how far opportunistic recreational recordings can become useful, traceable natural history observations, while remaining clear about what those observations can - and cannot - establish. The essential principle is that the conclusions drawn from the structured observations derived from the recordings must remain within the bounds of what the original recording method can support.

The original footage was not collected as part of a planned scientific study. The snorkelling excursions were recreational activities, with the GoPro cameras recording whatever happened to be encountered along the way, so there was no predetermined sampling strategy, no systematic coverage of habitats and no attempt to control the duration, location or frequency of observations to meet the requirements of an ecological survey.

This is fundamentally different from formal ecological survey techniques in which observation areas, sampling effort and recording methods are defined in advance. Such methods, when appropriately designed and analysed, can support estimates of abundance, density, distribution, population sizes and other ecological measures. The opportunistic recordings used here do not provide the sampling framework necessary to make those inferences reliably.

Nevertheless, these limitations do not make the observations valueless.

By preserving the connection between the original footage, identifiable images, species identifications and structured sighting records, the process creates a traceable body of evidence documenting which organisms were observed, where and when they were encountered, and how those identifications were made. The structured records can support species inventories, descriptions of _observed_ species composition, comparisons between recording occasions and the accumulation of natural history observations over time.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include reef-suite-invitation.html %}
