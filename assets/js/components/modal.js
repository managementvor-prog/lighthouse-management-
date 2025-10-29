// assets/js/components/modal.js
// Modal functionality

const modal = document.getElementById('talent-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

// Open modal with talent details
function openTalentModal(talent) {
    modalContent.innerHTML = createModalContent(talent);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add event listeners to modal buttons
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const bookTalentBtn = document.querySelector('.book-talent-btn');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeTalentModal);
    }
    
    if (bookTalentBtn) {
        bookTalentBtn.addEventListener('click', () => {
            closeTalentModal();
            // Set the talent name in the booking form
            const talentSelect = document.getElementById('talent-interest');
            if (talentSelect) {
                talentSelect.value = talent.name;
            }
        });
    }
}

// Close modal
function closeTalentModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event listeners for modal
closeModal.addEventListener('click', closeTalentModal);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeTalentModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeTalentModal();
    }
});

