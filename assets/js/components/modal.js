// assets/js/components/modal.js
const modal = document.getElementById('talent-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.querySelector('.close-modal');

function openTalentModal(talent) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = createModalContent(talent);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const closeBtn = modalContent.querySelector('.close-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeTalentModal);
}
function closeTalentModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
if (closeModalBtn) closeModalBtn.addEventListener('click', closeTalentModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeTalentModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeTalentModal(); });
