---
layout: default
title: UK Bat Emergence Time Calculator
permalink: /reference/bats/emergence/
---

# UK Bat Emergence Time Calculator

## Emergence Times and Hibernation Periods

Hibernation in UK bats does not follow a fixed calendar. It is influenced by temperature, weather, and food availability, and some species may still show activity on mild winter nights.

Even so, there are well-established typical seasonal windows that are useful when planning observations. The table below summarises typical emergence times relative to sunset, together with broad hibernation periods, for a selection of UK bat species.

<table class="data-table">
  <thead>
    <tr>
      <th>Common Name</th>
      <th>Scientific Name</th>
      <th>Emergence</th>
      <th>Hibernation Starts</th>
      <th>Hibernation Ends</th>
    </tr>
  </thead>
  <tbody>
    {% for bat in site.data.bats %}
      <tr>
        <td>{{ bat.common_name }}</td>
        <td><em>{{ bat.scientific_name }}</em></td>
        <td>
          {% if bat.emergence.min > 0 %}+{% endif %}{{ bat.emergence.min }}
          to
          {% if bat.emergence.max > 0 %}+{% endif %}{{ bat.emergence.max }}
          min
        </td>
        <td>
          {% if bat.hibernation.start.min == bat.hibernation.start.max %}
            {{ bat.hibernation.start.min }}
          {% else %}
            {{ bat.hibernation.start.min }} – {{ bat.hibernation.start.max }}
          {% endif %}
        </td>
        <td>
          {% if bat.hibernation.end.min == bat.hibernation.end.max %}
            {{ bat.hibernation.end.min }}
          {% else %}
            {{ bat.hibernation.end.min }} – {{ bat.hibernation.end.max }}
          {% endif %}
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

_Notes_

1. Emergence is expressed as minutes relative to sunset. Negative values indicate times before sunset; positive values indicate times after sunset.
2. Hibernation periods are approximate seasonal windows rather than fixed calendar dates.
3. Winter activity may still occur during mild spells, particularly in some species.

## Using the Calculator

This calculator builds on the annual NOAA Solar Calculations spreadsheet, adding species emergence times and hibernation periods to estimate likely emergence windows for each day of a selected year.

- [Download the Bat Emergence Calculator](/assets/downloads/bat-emergence-calculator.xlsx)
- The workbook contains three tabs:

| Tab Name                        | Contents |
| ------------------------------- | -------- |
| NOAA Sunset Calculator          | The original NOAA solar calculation sheet |
| Species Emergence - Field Notes | Species definitions, including common name, scientific name, emergence timing, and hibernation period |
| Emergence Times - Field Notes   | The annual emergence-time view for 1 January to 31 December for the selected year |

### Steps

1. On the _NOAA Sunset Calculator_ sheet, enter latitude, longitude, time zone [^1], and year.
2. Copy the species name from the _Species Emergence - Field Notes_ sheet.
3. Paste the species name into cell `A2` of the _Emergence Times - Field Notes_ sheet.
4. The annual emergence table will recalculate for that species, with hibernation periods indicated.

## Attribution and Provenance

The solar calculations in this workbook are based on the NOAA Solar Calculations spreadsheet provided by the National Oceanic and Atmospheric Administration (NOAA). The NOAA sheet is included in unmodified form as the workbook’s first tab.

Species emergence times and hibernation periods are drawn from a synthesis of widely available UK bat field guides and acoustic survey references.

The selection, structuring, and interpretation of this information, together with the design of the calculator and its presentation, are original to Field Notes Journal.

This workbook is not an official NOAA product and is provided here as a field-planning aid for recreational and observational use.

For the original NOAA calculator, see:
[NOAA Solar Calculation Details](https://gml.noaa.gov/grad/solcalc/calcdetails.html)

---

<p><em>Emergence times and hibernation periods presented here are a practical synthesis of widely available UK bat field knowledge. They should be treated as indicative planning guidance rather than fixed biological rules.</em></p>

---

[^1]: The time zone should account for daylight saving time (DST) so, for example, in the UK BST is 1 and GMT is 0
