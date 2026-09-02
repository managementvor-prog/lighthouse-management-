function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateRequired(value) {
    return value.trim().length > 0;
}

document.getElementById('booking-form')?.addEventListener('submit', function(e) {
    let isValid = true;
    this.querySelectorAll('[required]').forEach(field => {
        if (!validateRequired(field.value)) {
            field.style.borderColor = '#ff4444';
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            field.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    if (!isValid) {
        e.preventDefault();
        if (typeof showToast === 'function') showToast('Please check all required fields.', 'error');
    }
});
