// Airports table with alphabet filter (by first letter of IATA_Code)
(function () {
  const dataTag = document.getElementById('airports-data');
  let DATA = [];
  try { DATA = JSON.parse(dataTag.textContent || '[]'); } catch (e) { DATA = []; }

  const table = document.getElementById('airports-table');
  const tbody = table.querySelector('tbody');
  const alpha = document.getElementById('alpha-filter');
  const links = Array.from(alpha.querySelectorAll('a[data-letter]'));

  function initialLetter() {
    // hash form: #/A, #/%23 (for # group), or query: ?starts=A
    const h = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
    if (h) return h === '%23' ? '#' : h;
    const q = new URLSearchParams(location.search).get('starts');
    return q || 'ALL';
  }

  function setActive(letter) {
    links.forEach(a => a.classList.toggle('active', a.dataset.letter === letter));
  }

  function render(letter) {
    let rows = DATA;
    if (letter && letter !== 'ALL') {
      if (letter === '#') {
        rows = rows.filter(r => {
          const code = String(r.IATA_Code || '').trim();
          const ch = (code[0] || '').toUpperCase();
          return !/[A-Z]/.test(ch);
        });
      } else {
        rows = rows.filter(r => String(r.IATA_Code || '').toUpperCase().startsWith(letter));
      }
    }
    // Sort by IATA then Name for consistency
    rows.sort((a,b) => (String(a.IATA_Code||'').localeCompare(String(b.IATA_Code||'')) || String(a.Name||'').localeCompare(String(b.Name||''))));
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="3" class="muted">No airports for this filter.</td></tr>';
      return;
    }
    const html = rows.map(r => (
      '<tr>' +
        '<td>' + esc(r.IATA_Code) + '</td>' +
        '<td>' + esc(r.Name) + '</td>' +
        '<td>' + esc(r.Country) + '</td>' +
      '</tr>'
    )).join('');
    tbody.innerHTML = html;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  }

  alpha.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-letter]');
    if (!a) return;
    e.preventDefault();
    const letter = a.dataset.letter;
    setActive(letter);
    // Update hash for deep links
    const encoded = letter === '#' ? '%23' : letter;
    history.replaceState(null, '', letter === 'ALL' ? location.pathname : '#/' + encoded);
    render(letter);
  });

  // Init
  const letter = initialLetter();
  const active = links.find(a => a.dataset.letter === letter) || links[0];
  setActive(active.dataset.letter);
  render(active.dataset.letter);
})();
