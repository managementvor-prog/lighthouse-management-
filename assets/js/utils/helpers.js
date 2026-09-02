// Scroll Reveal
function observeReveals() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// Celebrity Preview on Contact
function initCelebrityPreview() {
    const params = new URLSearchParams(window.location.search);
    const talentId = params.get('talent');
    if (!talentId || typeof talentData === 'undefined') return;

    const talent = talentData.find(t => t.id == talentId);
    if (!talent) return;

    const preview = document.getElementById('celebrity-preview');
    const img = document.getElementById('preview-image');
    const name = document.getElementById('preview-name');
    const category = document.getElementById('preview-category');
    const select = document.getElementById('talent-interest');

    if (preview) {
        preview.style.display = 'flex';
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (img) { img.src = talent.image; img.alt = talent.name; }
    if (name) name.textContent = talent.name;
    if (category) category.textContent = talent.category;
    if (select) {
        if (![...select.options].some(o => o.value === talent.name)) {
            const opt = document.createElement('option');
            opt.value = talent.name;
            opt.textContent = talent.name;
            select.appendChild(opt);
        }
        select.value = talent.name;
    }
}

// Form handling
function initForms() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
            btn.classList.add('btn-loading');
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<span style="visibility:hidden">Submit</span>';
        }

        setTimeout(() => {
            if (typeof showToast === 'function') {
                showToast('Submitting your request...');
            }
        }, 100);
    });
}

// Init everything
document.addEventListener('DOMContentLoaded', () => {
    observeReveals();
    initNavbar();
    initBackToTop();
    initCelebrityPreview();
    initForms();
});
