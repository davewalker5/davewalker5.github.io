SELECT DISTINCT 'Composition', l.Name, l.Country, c.Name, 2022, 2022
FROM SIGHTINGS s
INNER JOIN LOCATIONS l ON l.Id = s.LocationId
INNER JOIN SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN CATEGORIES c ON c.Id = sp.CategoryId
WHERE Country = 'Tanzania';