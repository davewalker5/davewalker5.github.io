SELECT l.Name AS 'Location', sp.Name AS 'Species', c.Name AS 'Category', DATE( s.Date ) AS 'Date', IFNULL( s.Number, 1 ) AS 'Count'
FROM SIGHTINGS s
INNER JOIN SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN CATEGORIES c ON c.Id = sp.CategoryId
INNER JOIN LOCATIONS l ON l.Id = s.LocationId
WHERE l.Name = '$LOCATION'
AND CAST( STRFTIME( "%Y", s.Date ) AS INT ) BETWEEN $START_YEAR AND $END_YEAR
AND sp.Name = '$SPECIES';
