---
layout: default
title: Catalogue Style Analysis
description: Exploring the character of a music collection by mapping artist styles, moods and similarities.
breadcrumb: Catalogue Style Analysis
assets: "/images/music/catalogue-style-analysis/"
style_map:
  name: "catalogue-style-with-clustering.png"
  alt: "Artist style map with coloured cluster dots, labelled groups and hexagonal density shading"
  caption: "The final catalogue map: group membership and artist density shown together."
  credit: "David Walker, Field Notes Journal"
  license: "CC BY 4.0"
  license_link: "https://creativecommons.org/licenses/by/4.0"
---

# Catalogue Style Analysis

A record collection is not assembled according to a neat classification scheme. It grows through listening, discoveries, enthusiasms and the occasional unexpected purchase. Over time, though, it acquires a character of its own.

My Music Catalogue application records more than titles, pressings and artists. It also holds descriptions of the musical character I associate with each artist: energy, intimacy, warmth, vocal presence, ensemble type and moods. This project asks what happens when those observations are considered together rather than one at a time.

The aim is to **explore similarities among artists in my catalogue**, and to see whether recognisable stylistic groupings emerge from the information I have assigned to them. It is not an attempt to declare an artist's definitive genre, to judge the quality of a recording, or to have software listen to the music. The classification is based on my catalogue's *recorded descriptions* of artists, not on audio analysis or on individual albums or tracks.

{% include fullwidth-image.html assets=page.assets img=page.style_map %}

## From descriptions to a style map

An artist's energy, intimacy and warmth can be drawn on a simple chart, but three coordinates are not the whole story. A vocal soloist and an instrumental trio might occupy the same position on that chart while having quite different musical characters. Assigned moods can add another kind of distinction.

To compare all these characteristics, the analysis builds a **feature matrix**: one row for each artist and one numeric column for each characteristic. It makes the columns comparable, applies deliberate weights to different types of description, and uses **K-Means clustering** to group artists with similar feature profiles.

The resulting groups are then described in familiar terms, using their average style scores, common moods and prevalent vocal or ensemble categories. A final map puts those groups back onto the more readable energy-and-intimacy chart. It gives me a way to explore the collection rather than a new set of fixed musical genres.

The underlying process is reproducible, but the outcome is necessarily specific to this catalogue: the artists it contains, the descriptions I have recorded, the relative influence of the features, and the number of groups selected.

## What the results can and cannot tell me

This is a form of computational fieldwork on the collection. It can reveal concentrations, contrasts and relationships that are hard to see by browsing artist records individually. It can also give me new questions to take back to the records themselves.

A cluster is a group of artists close to one another **under the chosen description and weighting scheme**. Its name is a summary written *after* grouping, not a pre-existing category that the algorithm has discovered in the music. Likewise, a two-dimensional map is an invitation to explore, not a complete picture of the multidimensional comparison.

The following pages explain the approach, from assigning musical descriptions to interpreting the map, before looking at what happened when I applied it to my own collection.

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
        {% for chapter in site.data.style_analysis.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>{{ chapter.description }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

{% include music-catalogue-invitation.html %}
