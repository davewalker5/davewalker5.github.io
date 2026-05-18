---
layout: default
title: Reference Data
description: Reference datasets used by the Field Notes project, including aircraft airport data, wildlife species data, and supporting SQLite databases.
breadcrumb: Reference Data
permalink: /reference/
body_class: reference
---

# Reference

## Booklets

Compiled reports presented as booklet-style publications, bringing together observations and analyses in a more structured, long-form format.

{% include reference-table.html category="Booklets" %}

## Tools

The tools used to collect, organise, and present these records are available as open source, and can be adapted for your own purposes.

{% include landing-section.html title_column_name="Tool" items=site.data.tools category="tools" %}

## Reference Data

These datasets support the wildlife, aircraft, and weather reports published elsewhere on the site. Some can be explored online, while others are available as downloadable SQLite databases used to generate the analyses.

{% assign categories = site.data.reference_links | map: "category" | uniq | sort %}
{% for category in categories %}
  {% if category != "Booklets" and category != "Simulation Files" %}
<h3>{{ category }}</h3>
{% include reference-table.html category=category %}
  {% endif %}
{% endfor %}

<p><em>These datasets form part of the underlying data used to generate the reports and visualisations published throughout the site.</em></p>

{% include dataset-multiple-citations.html title="Citing the Source Databases" intro="You are welcome to reuse or reproduce the downloadable SQLite databases listed on this page under the terms of the <a href='https://creativecommons.org/licenses/by/4.0/'>Creative Commons CC BY 4.0</a> licence. Please provide appropriate attribution, including a link to the licence, and indicate if changes were made. A suggested citation is provided below. The other reference data listed here are supporting reference material and are not given separate dataset citations." datasets=site.data.reference_links %}
