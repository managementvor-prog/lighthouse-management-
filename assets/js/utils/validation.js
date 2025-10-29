// Form validation utilities
class FormValidator {
    constructor() {
        this.patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^\+?[\d\s\-\(\)]{10,}$/,
            url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        };
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        
        this.clearError(field);

        // Required field validation
        if (field.required && !value) {
            return this.showError(field, 'This field is required');
        }

        // Type-specific validation
        switch (type) {
            case 'email':
                if (value && !this.patterns.email.test(value)) {
                    return this.showError(field, 'Please enter a valid email address');
                }
                break;
            case 'tel':
                if (value && !this.patterns.phone.test(value)) {
                    return this.showError(field, 'Please enter a valid phone number');
                }
                break;
            case 'url':
                if (value && !this.patterns.url.test(value)) {
                    return this.showError(field, 'Please enter a valid URL');
                }
                break;
        }

        // Custom validation based on name
        switch (name) {
            case 'name':
                if (value && value.length < 2) {
                    return this.showError(field, 'Name must be at least 2 characters');
                }
                break;
            case 'message':
            case 'project_details':
                if (value && value.length < 10) {
                    return this.showError(field, 'Please provide more details (minimum 10 characters)');
                }
                break;
        }

        return true;
    }

    showError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        return false;
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setupFormValidation(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            field.addEventListener('input', () => {
                this.clearError(field);
            });
        });

        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
                // Focus on first error field
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    }
}

// Initialize form validation
const formValidator = new FormValidator();

