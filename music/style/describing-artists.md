---
layout: default
title: Describing the Artists
description: The artist-level style descriptions and mood associations that provide the raw material for the analysis
breadcrumb: Describing the Artists
assets: "/images/music/catalogue-style-analysis/"
series: style_analysis
chapter: 1
---

# Describing the Artists

The starting point is not a waveform or a recording. It is an **artist record** in Music Catalogue, with a small collection of descriptions I have assigned to that artist.

That choice matters: in this analysis, each artist appears once. Their albums and individual tracks are not separately classified, and artists are not given extra weight because I own more records by them. The analysis reads the artists held in the catalogue's artist table; it does not first restrict them by the number of records I own.

## Three continuous style dimensions

The three style scores are recorded on a 0–5 scale:

| Dimension    | Question it helps me ask                                                       |
| ------------ | ------------------------------------------------------------------------------ |
| **Energy**   | Where does this artist sit between restrained and energetic musical character? |
| **Intimacy** | How close or intimate does the musical presentation feel?                      |
| **Warmth**   | How cool or warm is the character I associate with the artist?                 |

These are descriptive judgements, not objective measurements extracted from a signal. They offer a consistent vocabulary for comparing artists, while leaving room for the fact that an artist's work may vary considerably.

## Vocal presence and ensemble type

Two further fields describe the form of the music: **vocal presence** and **ensemble type**. The stored category codes are mapped to readable category names for the analysis. A category that cannot be mapped is labelled `Unknown` rather than silently assigned a musical interpretation.

These fields are categorical, not scores. An ensemble labelled `Trio`, for example, is a kind of ensemble; it is not a quantity that should be treated as larger or smaller than another ensemble type.

## Assigned moods

My catalogue also lets me associate artists with named moods or stylistic descriptors. These supply a second vocabulary alongside energy, intimacy and warmth. Examples visible in the project's output include **Cool**, **Warm**, **Artful**, **Rocky** and **Energetic**; the mood table itself includes terms such as **Ambient**, **Bittersweet**, **Bebop** and **Contemplative**.

An artist can have more than one mood. The analysis asks whether a mood has been assigned, not how strongly a particular recording expresses it. The mood catalogue also contains morning, afternoon, evening and late-listening weights, but **those time-of-day weights do not enter this classification**.

<!-- OPTIONAL IMAGE PLACEHOLDER: A screenshot of Music Catalogue's artist style and mood fields. -->

## Why this is a classification of descriptions

The groupings can only be as informative as the descriptions from which they are built. A zero in a later mood column will mean *no recorded association*; it will not demonstrate that a quality is absent from an artist's music.

That distinction is part of the point of the experiment. I am exploring the character of the collection **as I have catalogued it**, and asking whether those descriptions form interesting patterns when viewed together.

<footer class="notebook-entry-footer">
  {% include journal-nav.html %}
</footer>

{% include music-catalogue-invitation.html %}
