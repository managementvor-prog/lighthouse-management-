// assets/js/services/talent.js
let currentFilter = 'all';
let currentSearchTerm = '';

function initializeTalentDisplay() {
    // Render IMMEDIATELY - no artificial delay
    displayFeaturedTalent();
    displayAllTalent();
    populateTalentSelect();
    setupFiltering();
    setupSearch();
}

function displayFeaturedTalent() {
    const grid = document.getElementById('featured-talent-grid');
    if (!grid || typeof TALENT_DATA === 'undefined') return;
    const featured = TALENT_DATA.filter(t => t.featured);
    grid.innerHTML = featured.map(t => createTalentCard(t)).join('');
    attachCardEvents(grid);
}

function displayAllTalent() {
    const grid = document.getElementById('talent-grid');
    if (!grid || typeof TALENT_DATA === 'undefined') return;
    const filtered = filterTalent(TALENT_DATA, currentFilter, currentSearchTerm);
    grid.innerHTML = filtered.length > 0 ? filtered.map(t => createTalentCard(t)).join('') : '<p class="no-results">No talent found matching your criteria.</p>';
    attachCardEvents(grid);
}

function attachCardEvents(grid) {
    grid.querySelectorAll('.talent-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        const talent = TALENT_DATA.find(t => t.id === id);
        card.addEventListener('click', (e) => { if (e.target.closest('.btn')) return; if (talent) openTalentModal(talent); });
        const viewBtn = card.querySelector('.view-details-btn');
        if (viewBtn && talent) viewBtn.addEventListener('click', (e) => { e.stopPropagation(); openTalentModal(talent); });
    });
}

function populateTalentSelect() {
    const select = document.getElementById('talent-interest');
    if (!select || typeof TALENT_DATA === 'undefined') return;
    while (select.options.length > 1) select.remove(1);
    TALENT_DATA.forEach(talent => {
        const option = document.createElement('option');
        option.value = talent.name;
        option.textContent = talent.name;
        select.appendChild(option);
    });
}

function setupFiltering() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayAllTalent();
        });
    });
}

function setupSearch() {
    const input = document.getElementById('talent-search');
    if (!input) return;
    input.addEventListener('input', debounce((e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        displayAllTalent();
    }, 150)); // Faster debounce (was 300ms)
}

function filterTalent(talent, category, searchTerm) {
    return talent.filter(t => {
        const matchesCategory = category === 'all' || t.category === category;
        const matchesSearch = !searchTerm || t.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
}
