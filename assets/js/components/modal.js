function openTalentModal(talentId) {
    if (typeof talentData === 'undefined') return;
    const talent = talentData.find(t => t.id == talentId);
    if (!talent) return;

    const modal = document.getElementById('talent-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    const awardsHtml = (talent.awards || []).map(a => 
        `<span class="award-tag">${a}</span>`
    ).join('');

    content.innerHTML = `
        <div class="modal-talent">
            <img src="${talent.image}" alt="${talent.name}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231a1a1a%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23D4AF37%22 font-size=%2214%22>✦</text></svg>'">
            <h2>${talent.name}</h2>
            <p class="category">${talent.category}</p>
            <p class="modal-bio">${talent.bio}</p>
            ${awardsHtml ? `<div class="modal-awards">${awardsHtml}</div>` : ''}
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
