// assets/js/utils/helpers.js
function debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const later = () => { timeout = null; if (!immediate) func(...args); };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}
function formatCategory(category) {
    const map = {'acting':'Acting','music':'Music','lifestyle':'Lifestyle'};
    return map[category] || category;
}
function showToast(message, type='info', duration=4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    const icons = {success:'&#10003;',error:'&#10007;',info:'&#9432;'};
    toast.innerHTML = '<span class="toast-icon">'+(icons[type]||icons.info)+'</span><div class="toast-content"><p>'+message+'</p></div><button class="toast-close" aria-label="Close">&times;</button>';
    container.appendChild(toast);
    const timeout = setTimeout(() => removeToast(toast), duration);
    toast.querySelector('.toast-close').addEventListener('click', () => { clearTimeout(timeout); removeToast(toast); });
}
function removeToast(toast) {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
}
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
}
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', debounce(() => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, 100));
    btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', debounce(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 50));
}
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { hamburger.classList.remove('active'); navMenu.classList.remove('active'); });
    });
}
function createTalentCard(talent) {
    return '<div class="talent-card" data-category="'+talent.category+'" data-name="'+talent.name.toLowerCase()+'" data-id="'+talent.id+'">'+
        '<div class="talent-image-wrapper"><img src="'+talent.image+'" alt="'+talent.name+'" class="talent-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500/1a1a1a/D4AF37?text='+encodeURIComponent(talent.name)+''"></div>'+
        '<div class="talent-info"><h3 class="talent-name">'+talent.name+'</h3><div class="talent-category">'+formatCategory(talent.category)+'</div><p class="talent-bio">'+talent.bio+'</p>'+
        '<div class="talent-stats"><div class="stat-item"><div class="stat-value">'+talent.stats.projects+'</div><div class="stat-label">Projects</div></div>'+
        '<div class="stat-item"><div class="stat-value">'+talent.stats.awards+'</div><div class="stat-label">Awards</div></div>'+
        '<div class="stat-item"><div class="stat-value">'+talent.stats.experience+'</div><div class="stat-label">Experience</div></div></div>'+
        '<div class="talent-availability">'+talent.availability+'</div>'+
        '<div class="talent-actions"><button class="btn btn-secondary view-details-btn" data-talent-id="'+talent.id+'">View Details</button>'+
        '<a href="contact.html?talent='+encodeURIComponent(talent.name)+'" class="btn btn-book-now">Book Now</a></div></div></div>';
}
function createModalContent(talent) {
    return '<div class="modal-talent-content"><div class="modal-header"><img src="'+talent.image+'" alt="'+talent.name+'" class="modal-image" onerror="this.src='https://via.placeholder.com/400x500/1a1a1a/D4AF37?text='+encodeURIComponent(talent.name)+''">'+
        '<div class="modal-basic-info"><h2>'+talent.name+'</h2><div class="modal-category">'+formatCategory(talent.category)+'</div><p class="modal-bio">'+talent.bio+'</p>'+
        '<div class="modal-stats"><div class="modal-stat"><div class="modal-stat-value">'+talent.stats.projects+'</div><div class="modal-stat-label">Projects</div></div>'+
        '<div class="modal-stat"><div class="modal-stat-value">'+talent.stats.awards+'</div><div class="modal-stat-label">Awards</div></div>'+
        '<div class="modal-stat"><div class="modal-stat-value">'+talent.stats.experience+'</div><div class="modal-stat-label">Experience</div></div></div>'+
        '<div class="modal-specialties"><h3>Specialties</h3><div class="specialties-list">'+talent.specialties.map(s=>'<span class="specialty-tag">'+s+'</span>').join('')+'</div></div>'+
        '<div class="modal-availability"><h3>Availability</h3><p style="color:var(--text-gray)">'+talent.availability+' &mdash; '+talent.rate+' Rate</p></div>'+
        '<div class="modal-actions"><button class="btn btn-secondary close-modal-btn">Close</button>'+
        '<a href="contact.html?talent='+encodeURIComponent(talent.name)+'" class="btn btn-book-now">Book This Talent</a></div></div></div></div>';
}
function initCelebrityPreview() {
    const select = document.getElementById('talent-interest');
    const preview = document.getElementById('celebrity-preview');
    const previewImg = document.getElementById('preview-image');
    const previewName = document.getElementById('preview-name');
    const previewCategory = document.getElementById('preview-category');
    if (!select || !preview) return;
    const urlParams = new URLSearchParams(window.location.search);
    const preselected = urlParams.get('talent');
    if (preselected && typeof TALENT_DATA !== 'undefined') {
        const talent = TALENT_DATA.find(t => t.name === preselected);
        if (talent) { select.value = talent.name; updatePreview(talent); showToast('Booking request for '+talent.name+' ready', 'info'); }
    }
    select.addEventListener('change', function() {
        const name = this.value;
        if (!name || typeof TALENT_DATA === 'undefined') { preview.classList.remove('active'); return; }
        const talent = TALENT_DATA.find(t => t.name === name);
        if (talent) updatePreview(talent);
    });
    function updatePreview(talent) {
        previewImg.src = talent.image;
        previewImg.alt = talent.name;
        previewName.textContent = talent.name;
        previewCategory.textContent = formatCategory(talent.category);
        preview.classList.add('active');
    }
}
function initFormHandling() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        if (!this.checkValidity()) { e.preventDefault(); this.reportValidity(); showToast('Please fill in all required fields', 'error'); return; }
        showToast('Submitting your booking request...', 'info', 2000);
    });
}
