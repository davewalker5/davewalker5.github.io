---
layout: default
title: "Travel"
permalink: /travel/
---

## Travel

Travel, in this journal, is not a departure from Field Notes — it is an extension of it.

The focus remains the same: observation, place, and the experience of being present in a landscape. The difference is simply one of geography. These entries are written from the field, often directly from a travel journal kept at the time, and retain that immediacy.

They are not guides, nor itineraries. They are accounts of days: what was seen, what was noticed, and what it felt like to move through unfamiliar environments.

## Tanzania Safari Journal

A multi-day account of a journey through northern Tanzania, moving from the foothills of Mount Meru through Tarangire, Lake Eyasi, and beyond.

The journal follows the progression of the landscape and the experience: from first impressions and adjustment, through immersion in the savannah, to encounters with wildlife and place.

<table class="data-table">
    <thead>
        <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {% for chapter in site.data.tanzania2022.chapters %}
            <tr>
                {% if forloop.index0 > 0 %}
                    <td>{{ forloop.index0 }}</td>
                {% else %}
                    <td></td>
                {% endif %}
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

{% if site.data.tanzania2022.is_complete == false %}
<p>
    <em>The journal is currently being published in stages, following the original sequence of the journey.</em>
</p>
{% endif %}

## Other Travel Writing

Alongside the journal entries published here, I maintain a longer-standing record of travel on TripAdvisor. These pieces are more conventional reviews, written over many years, and cover a wider range of destinations.

They sit slightly apart from the Field Notes approach, but reflect the same underlying interest in place and experience.

[View my Tripadvisor profile](https://www.tripadvisor.co.uk/Profile/DaveWalker5)￼