---
layout: default
title: "Travel"
permalink: /travel/
---

## Travel

Travel, in this journal, is not a departure from Field Notes — it is an extension of it.

The focus remains the same: observation, place, and the experience of being present in a landscape. The difference is simply one of geography. These entries are written from the field, often directly from a travel journal kept at the time, and retain that immediacy.

They are not guides, nor itineraries. They are accounts of days: what was seen, what was noticed, and what it felt like to move through unfamiliar environments.

## Travel Journals

<table class="data-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {% for journal in site.data.travel.journals %}
            <tr>
                <td><a href="{{ journal.url }}">{{ journal.title }}</a></td>
                <td>
                    {% if journal.date %}
                        {% assign day = journal.date | date: "%-d" %}
                        {% assign day = journal.date | date: "%-d" %}

                        {% case day %}
                            {% when '1' or '21' or '31' %}{% assign suffix = "st" %}
                            {% when '2' or '22' %}{% assign suffix = "nd" %}
                            {% when '3' or '23' %}{% assign suffix = "rd" %}
                            {% else %}{% assign suffix = "th" %}
                        {% endcase %}

                        {{ day }}{{ suffix }} {{ journal.date | date: "%B %Y" }}
                    {% endif %}
                </td>
            </tr>
        {% endfor %}
    </tbody>
</table>

## Other Travel Writing

Alongside the journal entries published here, I maintain a longer-standing record of travel on TripAdvisor. These pieces are more conventional reviews, written over many years, and cover a wider range of destinations.

They sit slightly apart from the Field Notes approach, but reflect the same underlying interest in place and experience.

[View my Tripadvisor profile](https://www.tripadvisor.co.uk/Profile/DaveWalker5)￼