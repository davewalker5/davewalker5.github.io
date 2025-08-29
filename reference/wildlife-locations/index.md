---
layout: default
title: Wildlife Location Details
---

<div class="breadcrumb">
  <a href="{{ '/' | relative_url }}">Home</a> ›
  <a href="{{ '/reference/' | relative_url }}">Reference Data</a> ›
  Wildlife Location Details
</div>

# Wildlife Location Details

<p class="muted">
  This table is built automatically from <code>_data/locations.csv</code>.
</p>

<table class="data-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Address</th>
      <th>City</th>
      <th>County</th>
      <th>Country</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    {% assign rows = site.data.locations %}
    {% if rows and rows.size > 0 %}
      {% for row in rows %}
        <tr>
          <td>{{ row.Name }}</td>
          <td>{{ row.Address }}</td>
          <td>{{ row.City }}</td>
          <td>{{ row.County }}</td>
          <td>{{ row.Country }}</td>
          <td>{{ row.Latitude }}</td>
          <td>{{ row.Longitude }}</td>
        </tr>
      {% endfor %}
    {% else %}
      <tr><td colspan="7" class="muted">No data found in _data/locations.csv</td></tr>
    {% endif %}
  </tbody>
</table>
