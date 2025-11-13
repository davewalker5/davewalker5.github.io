SELECT a.Code AS "IATA_Code", a.Name as "Name", c.Name AS "Country"
FROM AIRPORT a
INNER JOIN COUNTRY c ON c.Id = a.Country_Id;
