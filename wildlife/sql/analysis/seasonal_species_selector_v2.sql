/*
Purpose
-------
Compute per-species annual metrics over a fixed study window (2020–2025),
treating missing years as zero-count years.

This query is used for PANEL SELECTION, not final ecological analysis.
It identifies species with sufficient volume and consistency to support
downstream "Year in the Life" analysis.

Approach
--------
1. Define the study window explicitly as a set of calendar years.
   This ensures that all species are evaluated against the same
   fixed temporal frame (including years with no records).

2. Build a list of candidate species observed within the study window
   (filtered to:
       - Category = 'Birds'
       - Location = 'Abingdon'
   ).

3. Compute per-species, per-year counts of sightings.

4. Generate a complete species × year grid (CROSS JOIN).
   This creates one row per species per year, regardless of whether
   the species was recorded in that year.

5. LEFT JOIN the observed yearly counts onto this grid and use
   COALESCE(..., 0) to treat missing records as zero counts.

6. Aggregate to per-species metrics:
   - total_count: total sightings across all years
   - avg_annual_count: mean sightings per year across the FULL window
       (i.e. includes zero years)
   - years_present: number of years with at least one record

Key Concept
-----------
avg_annual_count is calculated over ALL years in the study window,
not just years in which the species was observed.

That is:
    avg_annual_count = total_count / number_of_years_in_window

This differs from an "average when present", which would exclude
zero-count years and produce higher values for irregular species.

Rationale
---------
Including zero years penalises species that are:
   - sporadic
   - irregular
   - poorly recorded

This produces a more stable and representative measure of
"typical annual signal strength", which is more appropriate for
selecting species suitable for time-series / seasonal analysis.

Interpretation
--------------
- High avg_annual_count + high years_present:
    > strong, consistent species (ideal panel candidates)

- High total_count but low avg_annual_count:
    > bursty or irregular species

- Low avg_annual_count:
    > weak signal, likely unsuitable for detailed analysis

Notes
-----
- The study window is fixed (2020–2025 inclusive).
  If changed, the years CTE must be updated accordingly.

- This query is intended for ranking / filtering species,
  not for publication-level ecological inference.
*/
WITH years AS (
    SELECT 2020 AS year
    UNION ALL SELECT 2021
    UNION ALL SELECT 2022
    UNION ALL SELECT 2023
    UNION ALL SELECT 2024
    UNION ALL SELECT 2025
    UNION ALL SELECT 2026
),
species_list AS (
    SELECT DISTINCT
        sp.Id AS species_id,
        sp.Name AS species
    FROM SIGHTINGS s
    INNER JOIN SPECIES sp ON sp.Id = s.SpeciesId
    INNER JOIN CATEGORIES c ON c.Id = sp.CategoryId
    INNER JOIN LOCATIONS l ON l.Id = s.LocationId
    WHERE s.Date >= '2020-01-01 00:00:00'
      AND c.Name = 'Birds'
      AND l.Name = 'Abingdon'
),
yearly_counts AS (
    SELECT
        sp.Id AS species_id,
        CAST(strftime('%Y', s.Date) AS INTEGER) AS year,
        COUNT(s.Id) AS yearly_count
    FROM SIGHTINGS s
    INNER JOIN SPECIES sp ON sp.Id = s.SpeciesId
    INNER JOIN CATEGORIES c ON c.Id = sp.CategoryId
    INNER JOIN LOCATIONS l ON l.Id = s.LocationId
    WHERE s.Date >= '2020-01-01 00:00:00'
      AND c.Name = 'Birds'
      AND l.Name = 'Abingdon'
    GROUP BY
        sp.Id,
        CAST(strftime('%Y', s.Date) AS INTEGER)
),
species_year_grid AS (
    SELECT
        sl.species_id,
        sl.species,
        y.year
    FROM species_list sl
    CROSS JOIN years y
)
SELECT
    syg.species,
    SUM(COALESCE(yc.yearly_count, 0)) AS total_count,
    ROUND(AVG(COALESCE(yc.yearly_count, 0)), 2) AS avg_annual_count,
    SUM(CASE WHEN COALESCE(yc.yearly_count, 0) > 0 THEN 1 ELSE 0 END) AS years_present
FROM species_year_grid syg
LEFT JOIN yearly_counts yc
    ON yc.species_id = syg.species_id
   AND yc.year = syg.year
GROUP BY
    syg.species_id,
    syg.species
HAVING years_present >= 4
   AND avg_annual_count >= 5
ORDER BY avg_annual_count DESC, total_count DESC;
