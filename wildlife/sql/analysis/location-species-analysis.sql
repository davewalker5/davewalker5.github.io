SELECT      l.Name AS "Location",
            l.Country AS "Country",
            c.Name AS "Category",
            s.Name AS "Species",
            COUNT( s.Id ) AS "Sightings"
FROM        SIGHTINGS s
INNER JOIN  LOCATIONS l ON l.Id = s.LocationId
INNER JOIN  SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN  CATEGORIES c ON c.Id = sp.CategoryId
GROUP BY    l.Name, l.Country, c.Name, s.Name
HAVING      l.Name = '';
