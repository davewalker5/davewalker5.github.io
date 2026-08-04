---
layout: default
title: "Travel"
permalink: /travel/
assets: "/images/aircraft/"
position_density_envelope:
    name: "live-position-density-envelope.png"
    alt: "Live ADS-B position-density plot showing an oval-shaped region filled by accumulated aircraft observations"
    caption: "After more than 10,000 recorded positions, the individual tracks have begun to merge into the operational footprint of the observation."
    credit: "David Walker, Field Notes Journal"
    license: "CC BY 4.0"
    license_link: "https://creativecommons.org/licenses/by/4.0"
---

## Travel

Travel, in this journal, is not a departure from Field Notes — it is an extension of it.

The focus remains the same: observation, place, movement, and the experience of being present in a landscape. Sometimes that means travelling through unfamiliar environments and recording what was encountered there. At other times, it means remaining in one place and observing the journeys taking place around and above it.

These are not intended as guides or itineraries. They are records of places, journeys, days, and patterns of movement: what was seen, what was noticed, and what it felt like to be there.

## Travel Journals

These entries are written from the field, often directly from a travel journal kept at the time, and retain that immediacy.

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

## Aviation and Airspace

Aircraft are most obviously associated with travelling elsewhere, but they can also be observed as part of the landscape of home.

Accumulated over an observing session, aircraft positions begin to reveal recurring routes, concentrations of traffic, and the effective shape of the airspace visible to the receiver.

{% include fullwidth-image.html assets=page.assets img=page.position_density_envelope %}

My aviation work combines direct observation with aircraft sightings records and an ADS-B observational workbench. The software receives and organises aircraft transmissions, but its purpose is not simply to accumulate data. It allows individual observing sessions to be examined, visualised, compared, and replayed so that questions can be asked of the movements taking place overhead.

This turns aircraft recording into another form of field practice: staying in one place, paying attention, and watching journeys unfold across the sky.

### Manually Recorded Aircraft Sightings

The reports below are derived from sightings recorded directly in FlightRecorder over time. They provide chart views, downloadable data, and summaries of the aircraft and manufacturers observed.

[Explore aircraft sightings and reports]({{ '/aircraft/' | relative_url }})

### Observing the Airspace Live

Alongside those manually recorded sightings, the [ADS-B BaseStation Reader](https://github.com/davewalker5/ADS-B-BaseStationReader) provides a live observational workbench for examining aircraft moving through the surrounding airspace.

Individual observing sessions can be tracked, visualised, stored, and replayed, allowing recurring routes, traffic concentrations, receiver coverage, and changes through time to emerge from the collected positions.

[Explore the ADS-B observational workbench on GitHub](https://github.com/davewalker5/ADS-B-BaseStationReader)

## Other Travel Writing

Alongside the journal entries published here, I maintain a longer-standing record of travel on TripAdvisor. These pieces are more conventional reviews, written over many years, and cover a wider range of destinations.

They sit slightly apart from the Field Notes approach, but reflect the same underlying interest in place and experience.

[View my Tripadvisor profile](https://www.tripadvisor.co.uk/Profile/DaveWalker5)
