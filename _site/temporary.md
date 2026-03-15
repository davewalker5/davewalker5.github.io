Can we do the weather reports next? This is the last section of the site :) The landing page is currently sparse:

---
layout: default
title: Weather Reports
---

# Weather Reports

- [Analysis Reports]({{ '/weather/analysis/' | relative_url }})
- [Daily Reports]({{ '/weather/daily/' | relative_url }})
- [Diurnal Pattern Reports]({{ '/weather/diurnal/' | relative_url }})
- [Management Reports]({{ '/weather/management/' | relative_url }})
- [Sensor Health Reports]({{ '/weather/health/' | relative_url }})

For each of the categories, the link goes to a catalogue page showing a table that includes a link to view the report and another to download the data. In all cases, the report link just opens the chart in a new window so all that's needed is to do the overall landing page and the landing page for each section.