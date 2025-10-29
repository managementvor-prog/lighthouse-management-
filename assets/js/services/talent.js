// assets/js/services/talent.js
// Talent data management and filtering

let currentFilter = 'all';
let currentSearchTerm = '';

// Initialize talent display
function initializeTalentDisplay() {
    displayFeaturedTalent();
    displayAllTalent();
    populateTalentSelect();
    setupFiltering();
    setupSearch();
}

// Display featured talent
function displayFeaturedTalent() {
    const featuredGrid = document.getElementById('featured-talent-grid');
    if (!featuredGrid) return;
    
    const featuredTalent = TALENT_DATA.filter(talent => talent.featured);
    
    featuredGrid.innerHTML = featuredTalent.map(talent => 
        createTalentCard(talent)
    ).join('');
    
    // Add click events to featured talent cards
    featuredGrid.querySelectorAll('.talent-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openTalentModal(featuredTalent[index]);
        });
    });
}

// Display all talent
function displayAllTalent() {
    const talentGrid = document.getElementById('talent-grid');
    if (!talentGrid) return;
    
    const filteredTalent = filterTalent(TALENT_DATA, currentFilter, currentSearchTerm);
    
    talentGrid.innerHTML = filteredTalent.length > 0 
        ? filteredTalent.map(talent => createTalentCard(talent)).join('')
        : '<p class="no-results">No talent found matching your criteria.</p>';
    
    // Add click events to talent cards
    talentGrid.querySelectorAll('.talent-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openTalentModal(filteredTalent[index]);
        });
    });
}

// Populate talent select in booking form
function populateTalentSelect() {
    const talentSelect = document.getElementById('talent-interest');
    if (!talentSelect) return;
    
    // Add talent options
    TALENT_DATA.forEach(talent => {
        const option = document.createElement('option');
        option.value = talent.name;
        option.textContent = talent.name;
        talentSelect.appendChild(option);
    });
}

// Setup filtering functionality
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and display
            currentFilter = button.dataset.filter;
            displayAllTalent();
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('talent-search');
    if (!searchInput) return;
    
    const debouncedSearch = debounce((e) => {
        currentSearchTerm = e.target.value;
        displayAllTalent();
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
}

