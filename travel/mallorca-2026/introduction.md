---
layout: journal
title: "Mallorca, 2026"
breadcrumb: "Mallorca, 2026"
date: 2026-06-13
categories: ["travel", "mallorca", "field-notes"]
tags: ["travel-journal", "mallorca", "natural-history", "field-notes"]
excerpt: "Field Notes from a return to a familiar island"
permalink: "/travel/mallorca-2026/"
assets: "/images/mallorca/"
images:
---

Some places become part of a person’s life not through a single extraordinary visit, but through repeated returns.

Mallorca is one of those places for us.

Twelve years had passed since our last visit. In that time much had changed elsewhere, yet the island remained recognisably itself: pine-covered hills above sheltered bays, old harbours, mountain roads, small cafés, familiar flavours, and the constant presence of the Mediterranean.

What follows is a series of notes gathered during a week in and around Puerto de Pollensa in June 2026.

## What This Is

These entries are not a guidebook, itinerary, or comprehensive account of the island.

Instead, they are records of attention.

Some focus on wildlife: butterflies feeding high in the branches of a Tipuana tree, hawk-moths and palm moths, gulls, finches, and the occasional unexpected visitor overhead.

Others explore food, language, local history, landscape, music, and the small observations that accumulate during travel.

Together they form a personal record of place, assembled one day at a time.

## Observation Beyond Home

Much of the Field Notes Journal is rooted in long familiarity: local wildlife, seasonal change, and places observed repeatedly over many years.

Travel offers something different.

In an unfamiliar setting, attention sharpens. Common species become noteworthy. Everyday customs become interesting. Questions arise more frequently. The simple act of noticing becomes more deliberate.

Many of the observations in these pages began as small curiosities: the name of a tree, the identity of a bird, the origin of a local dish, the purpose of an unusual aircraft, or the source of a familiar holiday scent.

Following those threads proved as rewarding as the observations themselves.

## A Mediterranean Notebook

Looking back over these notes, what stands out is their variety.

There are butterflies feeding in flowering trees, wildfire aircraft skimming the surface of Pollensa Bay, old trams rattling along the harbour at Sóller, conversations about food and language, evenings of flamenco, and reflections prompted simply by the act of packing a suitcase on the final morning.

None of these observations is especially grand in isolation.

Together, however, they capture something of the character of the journey and of the island itself.

## Closing Line

What follows is simply a week in Mallorca, recorded through observation, curiosity, and the habit of keeping notes.

## Contents

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.mallorca2026.chapters %}
            <tr>
                <td>{{ forloop.index }}</td>
                <td><a href="{{ chapter.url }}">{{ chapter.title }}</a></td>
                <td>
                    {% if chapter.date %}
                        {% assign day = chapter.date | date: "%-d" %}
                        {% assign day = chapter.date | date: "%-d" %}

                        {% case day %}
                            {% when '1' or '21' or '31' %}{% assign suffix = "st" %}
                            {% when '2' or '22' %}{% assign suffix = "nd" %}
                            {% when '3' or '23' %}{% assign suffix = "rd" %}
                            {% else %}{% assign suffix = "th" %}
                        {% endcase %}

                        {{ day }}{{ suffix }} {{ chapter.date | date: "%B %Y" }}
                    {% endif %}
                </td>
            </tr>
        {% endfor %}
    </tbody>
</table>

