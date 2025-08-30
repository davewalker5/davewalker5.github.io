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
  {%- assign rows = site.data.reference_links | default: empty -%}
  {%- if rows and rows.size > 0 -%}
    {%- for r in rows -%}
      <tr>
        <td>{{ r.area }}</td>
        <td><a href="{{ r.url | relative_url }}">{{ r.title }}</a></td>
      </tr>
    {%- endfor -%}
  {%- else -%}
      <tr>
        <td colspan="2" class="muted">No reference data entries yet. Add some in <code>_data/reference_links.yml</code>.</td>
      </tr>
  {%- endif -%}
  </tbody>
</table>
