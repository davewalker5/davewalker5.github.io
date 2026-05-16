SELECT      strftime('%Y', s.Date) AS "Year",
            COUNT( s.Id ) AS "Count"
FROM        SIGHTINGS s
GROUP BY    Year;