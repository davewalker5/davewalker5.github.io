---
layout: default
title: UK Bat Emergence Times and Call Frequency Reference
permalink: /reference/bats/
---

# UK Bat Emergence Times and Call Frequency Reference

A simple field reference for bat detectors: emergence timing, call ranges, likely heterodyne detector sweet spots, and broad habitat associations.

<table class="data-table">
  <thead>
    <tr>
      <th>Common Name</th>
      <th>Scientific Name</th>
      <th>Emergence</th>
      <th>Call Range</th>
      <th>Detector Range</th>
      <th>Habitat</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    {% for bat in site.data.bats %}
        <tr>
            <td>{{ bat.common_name}}</td>
            <td>{{ bat.scientific_name}}</td>
            <td>{% if bat.emergence.min > 0 %}+{% endif %}{{ bat.emergence.min }} to {% if bat.emergence.max > 0 %}+{% endif %}{{ bat.emergence.max }}</td>
            <td>{{ bat.frequency.min }} - {{ bat.frequency.max }}</td>
            <td>{{ bat.detection.min }} - {{ bat.detection.max }}</td>
            <td>{{ bat.habitat | join: ", " }}</td>
            <td>{{ bat.notes}}</td>
        </tr>
    {% endfor %}
  </tbody>
</table>

_Notes:_

1. Emergence is expressed as time in minutes relative to sunset, with negative numbers being before sunset and positive numbers after
2. Frequencies are expressed as KHz
3. The detector range relates to the optimal frequency range for a heterodyne detector

---

<p><em>The information presented here is a synthesis of widely available field knowledge on UK bats, drawn from general field guides and acoustic survey references. Frequency ranges, emergence timings, and habitat associations reflect general consensus values rather than original research. The structure, interpretation, and presentation are the author’s own.</em></p>
