// Alias for backward compatibility
const talentData = typeof TALENT_DATA !== 'undefined' ? TALENT_DATA : [];

function renderSkeletons(containerId, count = 6) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
        grid.innerHTML += `
            <div class="talent-card skeleton">
                <div class="skeleton-img"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
            </div>
        `;
    }
}

function renderTalent(talentList, containerId = 'talent-grid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = '';
    talentList.forEach((talent, index) => {
        const card = document.createElement('div');
        card.className = 'talent-card reveal';
        card.style.transitionDelay = `${index * 0.05}s`;

        const statsHtml = talent.stats ? `
            <div class="talent-stats" style="display:flex;gap:1rem;margin-top:0.75rem;font-size:0.75rem;color:var(--text-gray)">
                <span><strong style="color:var(--accent-gold)">${talent.stats.projects}</strong> Projects</span>
                <span><strong style="color:var(--accent-gold)">${talent.stats.awards}</strong> Awards</span>
                <span><strong style="color:var(--accent-gold)">${talent.stats.experience}</strong></span>
            </div>
        ` : '';

        const specialtiesHtml = talent.specialties ? `
            <div class="talent-specialties" style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.75rem">
                ${talent.specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}
            </div>
        ` : '';

        card.innerHTML = `
            <div class="talent-image">
                <img src="${talent.image}" alt="${talent.name}" loading="lazy" decoding="async"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231a1a1a%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23D4AF37%22 font-size=%2214%22>✦</text></svg>'">
                <div class="talent-overlay">
                    <button class="btn btn-book-now book-from-card" data-talent="${talent.id}">Book Now</button>
                </div>
            </div>
            <div class="talent-info">
                <h3>${talent.name}</h3>
                <p class="talent-category">${talent.category}</p>
                <p class="talent-bio">${talent.bio}</p>
                ${statsHtml}
                ${specialtiesHtml}
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof observeReveals === 'function') observeReveals();

    document.querySelectorAll('.book-from-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `/contact?talent=${btn.dataset.talent}`;
        });
    });

    document.querySelectorAll('.talent-card:not(.skeleton)').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.querySelector('.book-from-card')?.dataset.talent;
            if (id && typeof openTalentModal === 'function') openTalentModal(id);
        });
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('talent-search');
    let currentFilter = 'all';
    let currentSearch = '';

    function filterAndRender() {
        let filtered = talentData;
        if (currentFilter !== 'all') {
            filtered = filtered.filter(t => t.category === currentFilter);
        }
        if (currentSearch) {
            const q = currentSearch.toLowerCase();
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(q) || 
                t.bio.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        }
        renderTalent(filtered);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterAndRender();
        });
    });

    searchInput?.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterAndRender();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const isTalentPage = document.getElementById('talent-grid');
    const isHomePage = document.getElementById('featured-talent-grid');

    if (isTalentPage) {
        renderSkeletons('talent-grid', 6);
        setTimeout(() => {
            renderTalent(talentData, 'talent-grid');
            setupFilters();
        }, 600);
    }

    if (isHomePage) {
        const featured = talentData.filter(t => t.featured);
        renderSkeletons('featured-talent-grid', Math.min(3, featured.length));
        setTimeout(() => {
            renderTalent(featured.slice(0, 3), 'featured-talent-grid');
        }, 500);
    }
});
