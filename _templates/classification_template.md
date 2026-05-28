---
layout: species-classification
title: $NAME
classification: $CLASSIFICATION_FILE
location: $LOCATION
dataset: true
breadcrumb_items:
  - name: Home
    url: /
  - name: Wildlife
    url: /wildlife/
  - name: Seasonal Analyses
    url: /wildlife/seasonal
  - name: $NAME
    url: /wildlife/seasonal/$LOCATION/$SPECIES.html
charts:
  - title: $NAME Observed Presence, $LOCATION_NAME
    src: /wildlife/reports/Seasonal/$SEASONAL_FOLDER/$SPECIES_$LOCATION_presence.png
  - title: $NAME Observed Totals, $LOCATION_NAME
    src: /wildlife/reports/Seasonal/$SEASONAL_FOLDER/$SPECIES_$LOCATION_totals.png
  - title: $NAME Simulated Presence, $LOCATION_NAME
    src: /images/modelling/$LOCATION/$MODEL-$SPECIES_HYPHENATED.png
---
