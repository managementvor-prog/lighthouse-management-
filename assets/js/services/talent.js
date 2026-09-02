const talentData = [
    {
        id: 1,
        name: "Marcus Sterling",
        category: "acting",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
        bio: "Academy Award-nominated actor known for transformative performances in dramatic roles. 15+ years of critically acclaimed work across film and television.",
        awards: ["Oscar Nominee", "BAFTA Winner", "SAG Award"],
        specialties: ["Drama", "Thrillers", "Period Pieces"]
    },
    {
        id: 2,
        name: "Isabella Monroe",
        category: "acting",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
        bio: "Golden Globe-winning actress with extraordinary range from intimate indie films to major blockbuster franchises. A true versatile force in cinema.",
        awards: ["Golden Globe", "SAG Award", "Cannes Best Actress"],
        specialties: ["Drama", "Comedy", "Action"]
    },
    {
        id: 3,
        name: "Julian Cross",
        category: "music",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
        bio: "Chart-topping recording artist and producer with five platinum albums and sold-out world tours. Known for blending R&B with modern pop sensibilities.",
        awards: ["3x Platinum", "Grammy Nominee", "Billboard #1"],
        specialties: ["R&B", "Pop", "Production"]
    },
    {
        id: 4,
        name: "Sofia Reyes",
        category: "music",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
        bio: "Latin Grammy winner and international pop sensation with over 2 billion streams. A cultural icon bridging Latin and global mainstream markets.",
        awards: ["Latin Grammy", "Billboard Award", "MTV EMA"],
        specialties: ["Pop", "Latin", "Dance"]
    },
    {
        id: 5,
        name: "Ethan Cole",
        category: "lifestyle",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
        bio: "Leading lifestyle influencer and entrepreneur with 15M+ followers. Founder of a fitness-tech startup and brand ambassador for global luxury houses.",
        awards: ["Forbes 30 Under 30", "Shorty Award"],
        specialties: ["Fashion", "Fitness", "Tech"]
    },
    {
        id: 6,
        name: "Zara Williams",
        category: "lifestyle",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
        bio: "Beauty and wellness icon, bestselling author, and founder of a clean beauty brand valued at $100M. A pioneer in the conscious beauty movement.",
        awards: ["CEW Award", "Shorty Award", "Inc. Female Founder"],
        specialties: ["Beauty", "Wellness", "Business"]
    }
];

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
        card.innerHTML = `
            <div class="talent-image">
                <img src="${talent.image}" alt="${talent.name}" loading="lazy" 
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231a1a1a%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23D4AF37%22 font-size=%2214%22>✦</text></svg>'">
                <div class="talent-overlay">
                    <button class="btn btn-book-now book-from-card" data-talent="${talent.id}">Book Now</button>
                </div>
            </div>
            <div class="talent-info">
                <h3>${talent.name}</h3>
                <p class="talent-category">${talent.category}</p>
                <p class="talent-bio">${talent.bio}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    if (window.observeReveals) window.observeReveals();

    document.querySelectorAll('.book-from-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `/contact?talent=${btn.dataset.talent}`;
        });
    });

    document.querySelectorAll('.talent-card:not(.skeleton)').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.querySelector('.book-from-card')?.dataset.talent;
            if (id && window.openTalentModal) openTalentModal(id);
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
        renderSkeletons('featured-talent-grid', 3);
        setTimeout(() => {
            renderTalent(talentData.slice(0, 3), 'featured-talent-grid');
        }, 500);
    }
});
