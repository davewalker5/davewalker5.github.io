SELECT DISTINCT sp.Name AS 'Species', c.Name AS 'Category'
FROM SIGHTINGS s
INNER JOIN SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN CATEGORIES c ON c.Id = sp.CategoryId
ORDER BY sp.Name ASC;