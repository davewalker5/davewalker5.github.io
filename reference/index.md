---
layout: default
title: Reference Data
---

<div class="breadcrumb">
  <a href="{{ '/' | relative_url }}">Home</a> › Reference Data
</div>

# Reference Data

<table class="data-table">
  <thead>
    <tr>
      <th>Area</th>
      <th>View Data</th>
    </tr>
  </thead>
  <tbody>
  {% assign rows = site.data.reference_links | default: empty %}
  {% if rows and rows.size > 0 %}
    {% for r in rows %}
      {% assign href = r.url %}
      {% if href %}
        {% assign href_is_abs = href | slice: 0 | append: '' %}
        {% comment %} Normalize to a site-relative URL if it starts with '/' {% endcomment %}
        {% if href contains '://' %}
          {% assign url_out = href %}
        {% else %}
          {% assign url_out = href | relative_url %}
        {% endif %}
        {% assign ext = href | downcase | split: '.' | last %}
        {% assign is_download = r.download | default: false %}
        {% if href contains '/_data/' or ext == 'csv' or ext == 'txt' or ext == 'json' or ext == 'xlsx' or ext == 'zip' or ext == 'pdf' %}
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
      </tr>
    {% endfor %}
  {% else %}
      <tr>
        <td colspan="2" class="muted">No reference data entries yet. Add some in <code>_data/reference_links.yml</code>.</td>
      </tr>
  {% endif %}
  </tbody>
</table>
