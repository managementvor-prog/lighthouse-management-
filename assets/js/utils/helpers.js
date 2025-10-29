// assets/js/utils/helpers.js
// Utility functions for the application

// Debounce function to limit how often a function can be called
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Format category for display
function formatCategory(category) {
    const categoryMap = {
        'acting': 'Acting',
        'music': 'Music',
        'lifestyle': 'Lifestyle'
    };
    return categoryMap[category] || category;
}

// Create talent card HTML
function createTalentCard(talent) {
    return `
        <div class="talent-card" data-category="${talent.category}" data-name="${talent.name.toLowerCase()}">
            <img src="${talent.image}" alt="${talent.name}" class="talent-image">
            <div class="talent-info">
                <h3 class="talent-name">${talent.name}</h3>
                <div class="talent-category">${formatCategory(talent.category)}</div>
                <p class="talent-bio">${talent.bio}</p>
                <div class="talent-stats">
                    <div class="stat-item">
                        <div class="stat-value">${talent.stats.projects}</div>
                        <div class="stat-label">Projects</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${talent.stats.awards}</div>
                        <div class="stat-label">Awards</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${talent.stats.experience}</div>
                        <div class="stat-label">Experience</div>
                    </div>
                </div>
                <div class="talent-availability">${talent.availability}</div>
            </div>
        </div>
    `;
}

// Create modal content HTML
function createModalContent(talent) {
    return `
        <div class="modal-talent-content">
            <div class="modal-header">
                <img src="${talent.image}" alt="${talent.name}" class="modal-image">
                <div class="modal-basic-info">
                    <h2>${talent.name}</h2>
                    <div class="modal-category">${formatCategory(talent.category)}</div>
                    <p class="modal-bio">${talent.bio}</p>
                    <div class="modal-stats">
                        <div class="modal-stat">
                            <div class="modal-stat-value">${talent.stats.projects}</div>
                            <div class="modal-stat-label">Projects</div>
                        </div>
                        <div class="modal-stat">
                            <div class="modal-stat-value">${talent.stats.awards}</div>
                            <div class="modal-stat-label">Awards</div>
                        </div>
                        <div class="modal-stat">
                            <div class="modal-stat-value">${talent.stats.experience}</div>
                            <div class="modal-stat-label">Experience</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-specialties">
                <h3>Specialties</h3>
                <div class="specialties-list">
                    ${talent.specialties.map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="modal-availability">
                <h3>Availability & Rates</h3>
                <p><strong>Availability:</strong> ${talent.availability}</p>
                <p><strong>Rate:</strong> ${talent.rate}</p>
            </div>
            <div class="modal-actions">
                <a href="#contact" class="btn btn-primary book-talent-btn" data-talent="${talent.name}">Book This Talent</a>
                <button class="btn btn-secondary close-modal-btn">Close</button>
            </div>
        </div>
    `;
}

// Filter talent based on category and search term
function filterTalent(talent, category, searchTerm) {
    let filtered = talent;
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(t => t.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return filtered;
}

