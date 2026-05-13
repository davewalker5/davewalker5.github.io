SELECT      strftime('%Y', s.Date) AS "Year",
            c.Name AS "Category",
            COUNT( s.Id ) AS "Count"
FROM        SIGHTINGS s
INNER JOIN  SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN  CATEGORIES c ON c.Id = sp.CategoryId
GROUP BY    Year;