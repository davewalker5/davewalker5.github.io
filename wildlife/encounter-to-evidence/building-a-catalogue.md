---
layout: default
title: Building a Catalogue
breadcrumb: Building a Catalogue
description: ReefTag, human identification and the construction of an annotated observation catalogue
series: from_encounter_to_evidence
chapter: 4
assets: "/images/encounter-to-evidence/"
reef_tag_main_window:
  name: "reef-tag-identification.png"
  alt: "ReefTag application displaying an underwater photograph with markers used to record individual marine wildlife identifications"
  caption: "From photographs to observations — ReefTag provides a workspace for identifying individual animals, recording species information and preserving links to the original underwater footage"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
reef_tag_unknown_marker:
  name: "reef-tag-unknown-marker.png"
  alt: "ReefTag application showing an unknown marker identifying an animal whose species has not yet been established"
  caption: "Preserving uncertainty — ReefTag allows unidentified animals to be marked for subsequent examination without assigning an unsupported species identification"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
reef_tag_catalogue_strucure:
  name: "reeftag-catalogue-structure.png"
  alt: "Diagram of the ReefTag catalogue structure, showing the relationships between folders, images, identification markers, unknown markers and the shared species catalogue"
  caption: "From images to structured observations — folders establish recording dates and locations, individual markers associate animals with their supporting images, and a shared species catalogue maintains consistent identifications"
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Building a Catalogue

The preceding chapters have described how the original underwater recordings were prepared for closer examination and the side-interest of how computer vision could be used to investigate the movement of individual animals. The first of these activities made the footage more accessible, but did not provide a structured natural history observation record. To arrive at that, the location and date of the footage needed to be brought together with the answer to a further question:

> What species has actually been recorded?

Arriving at the answer required examining the visible organisms, recognising their distinguishing characteristics, making identifications and retaining those judgements in an organised form.

The scale of the task was very apparent - a large number of representative images had been extracted from the GoPro footage using _ReefFrame_, each one containing one-to-many animals, often belonging to different species, with a single image of a mixed shoal require dozens of separate identifications.

Simply maintaining a list of species as the chain of evidence needed to be retained:

___Identification &rarr; Image &rarr; Processed Footage &rarr; Original Footage &rarr; Encounter___

The original encounter would provide the location and date while the identification would provide the details of the species encountered.

Maintaining the data using spreadsheets, pen and paper and an image viewer was certainly possible but hardly the most convenient solution so _ReefTag_ was born. It's a small, dedicated application for turning the detailed and repetitive work of wildlife identification from still images into an organised, persistent and reviewable dataset.

## ReefTag

The central design decision for _ReefTag_ was to retain human judgement as the basis of identification rather than attempting to implement an automated species identification system.

Starting from a well-organised folder structure containing the still images, _ReefTag_ provides a _workspace_ in which the observer can select and examine an image, with controls for zooming, panning and adjusting its apparent brightness, selecting individual animals and associating them with species identifications, without modifying the underlying photograph. This is important because the original image remains available as the supporting evidence, while the observer can adjust the presentation to examine particular features more closely.

Each identified animal receives a numbered marker with multiple individuals of the same species marked separately, while animals belonging to different species can be identified within the same image. The result is more than a species list. It is an annotated image in which individual identification decisions remain associated with particular positions in the original visual material.

{% include fullwidth-image.html assets=page.assets img=page.reef_tag_main_window %}

## Identification in Practice

Although the mechanics of creating an annotation are straightforward, the underlying identification work can be considerably more demanding. Some species have distinctive shapes, colour patterns or markings that make them relatively easy to recognise, for example the _Moorish idol, Zanclus cornutus_, that has a particularly recognisable appearance. However, other fish are less accommodating and closely related species may share similar body shapes and colouration, and differences in fin structure, markings or other anatomical features can be difficult to distinguish.

Even where _ReefFrame_ has improved the visibility of the footage, enhancement cannot recover anatomical detail that was never recorded and, further, the processing may alter apparent colours or contrast in ways that need to be considered when making an identification. The observer must therefore decide not simply which species an animal _resembles_, but whether the available evidence is sufficient to _justify_ that identification.

This may involve comparing several frames, examining published species directories and considering alternative species with similar appearances. Geographic distribution and habitat can provide useful context, although neither should substitute for the visual characteristics needed to distinguish one species from another.

> The identification is ultimately an interpretation of the recorded evidence

## Handling Uncertainty

Not every animal visible in the footage can be identified confidently. Some may be too distant or indistinct while others may be partially hidden by coral or neighbouring fish, especially in crowded scenes.

In such cases, there is a temptation, particularly when working through a large collection of images, to assign the most plausible species and move on. Although doing so would produce a more complete-looking catalogue it would also introduce identifications that the evidence does not adequately support.

_ReefTag_ provides a way to avoid this by allowing species that cannot be identified to be marked as _unknown_ whereupon the image is automatically flagged for further examination, allowing the unresolved observation to be revisited later. An unknown marker can subsequently be replaced with a species identification if sufficient evidence becomes available, or removed if there is insufficient evidence, on review, to arrive at a certain identification.

Importantly, an image containing unknown markers remains flagged until those markers have been resolved or removed so the application does not allow unresolved animals to disappear from the review process. Uncertainty is retained as part of the observational record rather than concealed by an apparently complete catalogue.

{% include fullwidth-image.html assets=page.assets img=page.reef_tag_unknown_marker %}

### Catalogue Structure and the Chain of Evidence

At the highest level, images are organised into folders with each folder associated with a recording date and a geographical location and every image in that folder inherits this information. This avoids having to record this context separately, for each image, while ensuring that subsequent identifications retain their association with the original observation. The user is responsible for ensuring that each folder contains images originating from a single recording date and geographical location.

Individual images can contain multiple identification markers, each representing an animal identified within the photograph and having an _(X, Y)_ pixel position, locating the animal within the image, together with a reference to the identified species.

Species information is maintained separately in a shared catalogue with each species record containing its common name, scientific name and an association to a category, such as _fish_, _mammals_ or _reptiles_. Individual identifications reference these catalogue entries rather than duplicating the species information for each identification. Consequently, the same species can be identified across many different images while retaining a single, consistent catalogue definition.

_ReefTag_ also supports unknown markers for animals that cannot yet be identified. Like identification markers, these are associated with a particular image and an X,Y pixel position, but they do not have an association with a species. This allows unresolved observations to be retained and revisited without assigning an identification that the available evidence cannot support.

The resulting structure connects species, individual identifications, images, dates and locations while preserving the distinction between an identified animal and one whose identity remains unresolved. It also maintains a direct relationship between each recorded identification and the photographic evidence on which it is based.

{% include fullwidth-image.html assets=page.assets img=page.reef_tag_catalogue_strucure %}

Images extracted by _ReefFrame_ retain filenames that identify their source footage and the timestamp within that recording and, together with the original GoPro files, these conventions provide a route from an individual identification back to the original video sequence. Properly maintained, this approach establishes a practical and traceable chain of evidence without requiring a separate movie, image and evidence-management system.

## The Completed Catalogue

The completed _ReefTag_ identification exercise produced a structured catalogue of species identifications and unresolved markers across four snorkelling excursions around Moofushi. The overall statistics provide a summary of the scale of the cataloguing work.

| Metric                                  |  Count |
| --------------------------------------- | -----: |
| Excursions                              |      4 |
| Images                                  |    319 |
| Identifications                         |  1,703 |
| Unknown markers                         |     59 |
| Species                                 |     58 |
| Identifications per excursion           | 425.75 |
| Identifications per image               |   5.34 |
| Unknown markers per 100 identifications |   3.47 |

The same statistics can also be examined separately for each excursion, using the original recording dates:

| Date       | Images | Identifications | Unknown | Species | Per image | Unknown per 100 identifications |
| ---------- | -----: | --------------: | ------: | ------: | --------: | ------------------------------: |
| 2026-10-13 |     79 |             446 |      23 |      18 |      5.65 |                            5.16 |
| 2026-10-15 |    108 |             779 |       9 |      30 |      7.21 |                            1.16 |
| 2026-10-19 |     21 |             185 |       1 |       7 |      8.81 |                            0.54 |
| 2026-10-22 |    111 |             293 |      26 |      33 |      2.64 |                            8.87 |

These figures describe the contents of the catalogue rather than the abundance or distribution of wildlife around Moofushi. In particular, an identification marker represents an annotation associated with an animal visible in an image, not necessarily a distinct individual organism as the same animal may appear in several extracted images, while a single image containing a mixed shoal may generate numerous identifications. Similarly, the species counts represent species identified within the selected photographic material, rather than comprehensive inventories of the locations visited.

The figures are presented here primarily to document the outcome of the _ReefTag_ exercise and although differences between excursions are apparent their interpretation requires consideration of how the individual identifications are consolidated into natural history observations.

That is the role of _Nature Recorder_, where the accumulated identifications can be organised into sightings associated with particular species, dates and locations, and examined through appropriate descriptive analysis. The distinction is between cataloguing what can be identified in the images and analysing what those identifications establish about the wildlife encountered.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include reef-suite-invitation.html %}
