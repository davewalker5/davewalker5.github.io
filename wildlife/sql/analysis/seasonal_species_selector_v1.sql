WITH annual_counts AS (
    SELECT          sp.Name AS "Species",
                    strftime( '%Y', s.Date ) AS "Year",
                    COUNT( s.Id ) AS "Count"
    FROM            SIGHTINGS s
    INNER JOIN      SPECIES sp ON sp.Id = s.SpeciesId
    INNER JOIN      CATEGORIES c ON c.Id = sp.CategoryId
    INNER JOIN      LOCATIONS l ON l.Id = s.LocationId
    WHERE           s.Date >= '2020-01-01 00:00:00'
    AND             s.Date < '2025-12-31 23:59:59'
    AND             c.Name = 'Birds'
    AND             l.Name = 'Abingdon'
    GROUP BY        sp.Name, strftime( '%Y', s.Date )
)
SELECT      Species, AVG( Count ) AS "Average_Annual_Count"
FROM        annual_counts
GROUP BY    Species
HAVING      AVG( Count ) > 100
ORDER BY    Species;
