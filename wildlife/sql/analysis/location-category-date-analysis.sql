SELECT      l.Name AS "Location",
            l.Country AS "Country",
            c.Name AS "Category",
            MIN( STRFTIME('%Y', s.Date ) ) AS "From",
            MAX( STRFTIME('%Y', s.Date ) ) AS "To",
            COUNT( s.Id ) AS "Sightings"
FROM        SIGHTINGS s
INNER JOIN  LOCATIONS l ON l.Id = s.LocationId
INNER JOIN  SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN  CATEGORIES c ON c.Id = sp.CategoryId
GROUP BY    l.Name, c.Name
HAVING      l.Country IN ( 'Tanzania', 'Mauritius' ) OR COUNT( s.Id ) >= 100;
