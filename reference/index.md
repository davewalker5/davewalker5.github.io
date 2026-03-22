---
layout: default
title: Reference Data
description: Reference datasets used by the Field Notes project, including aircraft airport data, wildlife species data, and supporting SQLite databases.
breadcrumb: Reference Data
---

# Reference Data

This page provides access to reference datasets used by the Field Notes project. These datasets support the wildlife, aircraft, and weather reports published elsewhere on the site.

Some entries provide tabulated reference data that can be explored online, while others provide downloadable SQLite databases used to generate reports and analyses.

<h2>Available Reference Data</h2>

<table class="data-table">
  <thead>
    <tr>
      <th>Area</th>
      <th>View Data</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
  {% assign rows = site.data.reference_links | default: empty %}
  {% if rows and rows.size > 0 %}
    {% for r in rows %}
      {% assign href = r.url %}
      {% assign url_out = nil %}
      {% assign is_download = r.download | default: false %}

      {% if href %}
        {% if href contains '://' %}
          {% assign url_out = href %}
        {% else %}
          {% assign url_out = href | relative_url %}
        {% endif %}

        {% assign ext = href | downcase | split: '.' | last %}
        {% if href contains '/_data/' or ext == 'csv' or ext == 'txt' or ext == 'json' or ext == 'xlsx' or ext == 'zip' or ext == 'pdf' or ext == 'db' %}
          {% assign is_download = true %}
        {% endif %}
      {% endif %}

      <tr>
        <td>{{ r.area }}</td>
        <td>
          {% if url_out %}
            <a href="{{ url_out }}"{% if is_download %} download{% endif %}>
              {{ r.title | default: 'View' }}
            </a>
          {% else %}
            <span class="muted">No link</span>
          {% endif %}
        </td>
        <td>
          {% if r.reference %}
            <code>{{ r.reference }}</code>
          {% else %}
            <span class="muted">&mdash;</span>
          {% endif %}
        </td>
      </tr>
    {% endfor %}
  {% else %}
      <tr>
        <td colspan="3" class="muted">No reference data entries yet. Add some in <code>_data/reference_links.yml</code>.</td>
      </tr>
  {% endif %}
  </tbody>
</table>

<p><em>These datasets form part of the underlying data used to generate the reports and visualisations published throughout the site.</em></p>

{% include dataset-multiple-citations.html title="Citing the Source Databases" intro="You are welcome to reuse or reproduce the downloadable SQLite databases listed on this page but please cite them using the references below. The other reference data listed here are supporting reference material and are not given separate dataset citations." datasets=site.data.reference_links %}