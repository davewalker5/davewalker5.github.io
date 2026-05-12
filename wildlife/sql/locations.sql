SELECT l.Name, IFNULL( l.Address, 'None' ) AS "Address", l.City, l.County, l.Country, l.Latitude, l.Longitude
FROM LOCATIONS l
ORDER BY l.Name ASC;
