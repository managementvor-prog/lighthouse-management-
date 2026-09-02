function openTalentModal(talentId) {
    const data = typeof TALENT_DATA !== 'undefined' ? TALENT_DATA : (typeof talentData !== 'undefined' ? talentData : []);
    const talent = data.find(t => t.id == talentId);
    if (!talent) return;

    const modal = document.getElementById('talent-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    const statsHtml = talent.stats ? `
        <div class="modal-stats" style="display:flex;gap:1.5rem;justify-content:center;margin-bottom:1.5rem">
            <div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--accent-gold)">${talent.stats.projects}</div><div style="font-size:0.7rem;color:var(--text-gray);text-transform:uppercase;letter-spacing:1px">Projects</div></div>
            <div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--accent-gold)">${talent.stats.awards}</div><div style="font-size:0.7rem;color:var(--text-gray);text-transform:uppercase;letter-spacing:1px">Awards</div></div>
            <div style="text-align:center"><div style="font-size:1.5rem;font-weight:700;color:var(--accent-gold)">${talent.stats.experience}</div><div style="font-size:0.7rem;color:var(--text-gray);text-transform:uppercase;letter-spacing:1px">Experience</div></div>
        </div>
    ` : '';

    const specialtiesHtml = talent.specialties ? `
        <div class="modal-specialties" style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;margin-bottom:1.5rem">
            ${talent.specialties.map(s => `<span class="award-tag">${s}</span>`).join('')}
        </div>
    ` : '';

    const availabilityHtml = talent.availability ? `
        <div style="margin-bottom:1rem;font-size:0.85rem;color:var(--text-gray)">
            <span style="color:var(--accent-gold)">●</span> ${talent.availability} · ${talent.rate || ''} Rate
        </div>
    ` : '';

    content.innerHTML = `
        <div class="modal-talent">
            <img src="${talent.image}" alt="${talent.name}" loading="lazy" decoding="async" 
                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231a1a1a%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23D4AF37%22 font-size=%2214%22>✦</text></svg>'">
            <h2>${talent.name}</h2>
            <p class="category">${talent.category}</p>
            ${availabilityHtml}
            <p class="modal-bio">${talent.bio}</p>
            ${statsHtml}
            ${specialtiesHtml}
            <a href="/contact?talent=${talent.id}" class="btn btn-book-now">Book Now</a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('talent-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    document.getElementById('talent-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'talent-modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
