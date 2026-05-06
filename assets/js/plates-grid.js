function showPlateGrid() {
  const grids = document.querySelectorAll(".plates-grid-outer");
  const notes = document.querySelectorAll("#plate-method-note");

  if (!grids.length) return;

  grids.forEach(function (grid) {
    grid.style.display = "block";
  });

  notes.forEach(function (note) {
    note.style.display = "block";
  });
}

function hidePlateGrid() {
  const grids = document.querySelectorAll(".plates-grid-outer");
  const notes = document.querySelectorAll("#plate-method-note");

  if (!grids.length) return;

  grids.forEach(function (grid) {
    grid.style.display = "none";
  });

  notes.forEach(function (note) {
    note.style.display = "none";
  });
}