// Species table renderer with category dropdown filter
(function () {
  const dataTag = document.getElementById('species-data');
  let DATA = [];
  try { DATA = JSON.parse(dataTag.textContent || '[]'); } catch (e) { DATA = []; }

  const table = document.getElementById('species-table');
  const tbody = table.querySelector('tbody');
  const select = document.getElementById('cat-select');

  function readInitialCategory() {
    // Allow deep links via hash (#/Category) or ?category=Category
    const hash = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
    if (hash) return hash;
    const params = new URLSearchParams(location.search);
    return params.get('category') || '';
  }

  function renderRows(category) {
    if (!category) {
      tbody.innerHTML = '<tr><td colspan="3" class="muted">Pick a category to load species…</td></tr>';
      return;
    }
    // Filter by exact match on Category
    const rows = DATA.filter(r => (r.Category || '').toString() === category);
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="3" class="muted">No species found for "' + escapeHtml(category) + '".</td></tr>';
      return;
    }
    // Sort by Species name
    rows.sort((a, b) => String(a.Species || '').localeCompare(String(b.Species || '')));
    const html = rows.map(r => (
      '<tr>' +
        '<td>' + escapeHtml(r.Species) + '</td>' +
        '<td>' + escapeHtml(r.Scientific_Name) + '</td>' +
        '<td>' + escapeHtml(r.Category) + '</td>' +
      '</tr>'
    )).join('');
    tbody.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
  }

  // Wire up dropdown
  select.addEventListener('change', () => {
    const cat = select.value;
    // Update hash for deep linking
    history.replaceState(null, '', cat ? '#/' + encodeURIComponent(cat) : location.pathname);
    renderRows(cat);
  });

  // Initialize from URL if present
  const initial = readInitialCategory();
  if (initial) {
    // Preselect if it exists
    const opt = Array.from(select.options).find(o => o.value === initial);
    if (opt) select.value = initial;
  }
  renderRows(select.value);
})();
