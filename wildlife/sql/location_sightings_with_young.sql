SELECT DISTINCT s.Date,
                sp.Scientific_Name AS "Scientific_Name",
                sp.Name AS "Common_Name",
                CASE
                    WHEN sp.Name IS NOT NULL AND sp.Scientific_Name IS NOT NULL
                        THEN sp.Name || ' (' || sp.Scientific_Name || ')'
                    ELSE COALESCE(sp.Name, sp.Scientific_Name)
                END AS "Species_Label",
                c.Name AS "Category",
                l.Name AS "Location",
                IFNULL( s.Number, 1 ) AS "Count"
FROM            SIGHTINGS s
INNER JOIN      SPECIES sp ON sp.Id = s.SpeciesId
INNER JOIN      CATEGORIES c ON c.Id = sp.CategoryId
INNER JOIN      LOCATIONS l ON l.Id = s.LocationId
WHERE           s.Date >= '$START_DATE'
AND             l.Name = '$LOCATION'
AND             sp.Name COLLATE NOCASE = '$SPECIES'
AND             s.WithYoung = 1;
