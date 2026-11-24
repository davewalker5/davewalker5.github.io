---
layout: journal
title: From Encounter to Evidence
breadcrumb: From Encounter to Evidence
description: A natural history case study exploring how recreational underwater footage from the Maldives became structured, traceable wildlife observations
permalink: /wildlife/from-encounter-to-evidence/
assets: "/images/encounter-to-evidence/"
images:
  - name: "nurse-shark.jpg"
    alt: "A shark sweeps past and, beneath it, a little gathering of yellow and black sergeant majors adds a wonderful splash of colour"
    caption: "A shark sweeps past and, beneath it, a little gathering of yellow and black sergeant majors adds a wonderful splash of colour"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "reef-manta-fishtrack.jpg"
    alt: "Reef Manta Ray swimming underwater in the Maldives, with a FishTrack segmentation or tracking overlay"
    caption: "The sweeping wingbeats of a Reef Manta Ray (Mobula alfredi) produce dramatic changes in silhouette, providing a particularly revealing comparison between tracking algorithms."
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "reef-cliff.jpg"
    alt: "Underwater view along the steep coral reef slope at Moofushi, with fish swimming above the reef as it disappears into deep blue water"
    caption: "The edge of the reef at Moofushi, where the coral-covered slope falls away into the blue"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "reef-tag-identification.png"
    alt: "ReefTag application displaying an underwater photograph with markers used to record individual marine wildlife identifications"
    caption: "From photographs to observations — ReefTag provides a workspace for identifying individual animals, recording species information and preserving links to the original underwater footage"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "maldives-fish-composition.png"
    alt: "Chart showing the species composition of fish identifications recorded from the Maldives snorkelling footage"
    caption: "Observational composition — the distribution of fish identifications reflects both the animals appearing in the footage and the character of the recorded encounters, including large mixed shoals and smaller groups"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
  - name: "maldives-richness-chart.png"
    alt: "Nature Recorder species-richness map showing recorded wildlife observations from the October 2026 visit to Constance Moofushi in the Maldives"
    caption: "Eighty-three species! Nature Recorder's species-richness map brings together the wildlife observations from our two-week visit, including marine life, birds and other animals recorded on and around Moofushi"
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

# From Encounter to Evidence

What happens to a wildlife encounter after the moment has passed?

Sometimes it becomes a photograph, a video, a memory or an entry in a travel journal. But what if those recordings contain information that can be recovered, identified and organised into something more enduring?

In October 2026, four snorkelling excursions around Constance Moofushi in the Maldives produced approximately 50 GB of underwater video, capturing extraordinary encounters with sharks, rays, reef fish and other marine life. They were made for the pleasure of observing wildlife, rather than as part of a planned scientific investigation.

Back home, however, the footage raised an interesting question:

> How far could these recreational recordings be transformed into useful, traceable natural history observations?

_From Encounter to Evidence_ is the story of exploring that question.

## An Unexpected Project

What began as an exercise in examining underwater footage developed into a much wider undertaking, combining wildlife observation, software development, species identification and natural history recording.

Three new applications emerged along the way:

- _ReefFrame_, for preparing and examining underwater footage
- _FishTrack_, for experimenting with the detection and tracking of individual animals
- _ReefTag_, for identifying and cataloguing wildlife in still images

These complemented _Nature Recorder_, an existing application for maintaining and analysing natural history observations. Needless to say, none of this was planned when I boarded the seaplane for Moofushi!

The applications developed in response to questions and practical problems encountered along the way and, together, they provided the means to examine the recordings systematically, preserve the relationship between observations and their supporting evidence, and build a structured record of the wildlife encountered.

## The Value of an Observation

An important theme running through the project is the distinction between recording something and establishing what that recording tells us. The original footage was collected opportunistically, without the standardised methods needed to estimate wildlife populations or measure ecological change and processing and cataloguing the material cannot remove those limitations.

Nevertheless, an observation associated with a species, a place, a date and supporting visual evidence has value and can be examined, reconsidered, compared with other observations and potentially contribute to a wider understanding of the natural world.

The purpose of this project is not to claim more for the recordings than they can support, but to explore how much can be learned from them while respecting those boundaries, developing practical tools, learning from the limitations of the evidence and discovering what can emerge from looking more closely at something originally recorded simply because it was wonderful to see.


## Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.from_encounter_to_evidence.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

{% include reef-suite-invitation.html %}
