// Email service integration with FormSubmit.co
class EmailService {
    constructor() {
        this.forms = [];
        this.init();
    }

    init() {
        // Monitor all forms for submission
        this.setupFormMonitoring();
    }

    setupFormMonitoring() {
        document.addEventListener('DOMContentLoaded', () => {
            // Find all forms with FormSubmit.co action
            this.forms = document.querySelectorAll('form[action*="formsubmit.co"]');
            
            this.forms.forEach(form => {
                form.addEventListener('submit', this.handleFormSubmit.bind(this));
            });
        });
    }

    handleFormSubmit(event) {
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Add loading state
        if (submitButton) {
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
        }

        // FormSubmit.co will handle the actual submission
        // We just track the attempt
        this.trackFormSubmission(form);
    }

    trackFormSubmission(form) {
        const formData = new FormData(form);
        const submission = {
            timestamp: new Date().toISOString(),
            form: form.id || 'unknown',
            data: Object.fromEntries(formData)
        };

        // Store in localStorage for analytics (optional)
        this.storeSubmission(submission);
    }

    storeSubmission(submission) {
        try {
            const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('form_submissions', JSON.stringify(submissions.slice(-50))); // Keep last 50
        } catch (error) {
            console.warn('Could not store form submission:', error);
        }
    }

    // Fallback to EmailJS if FormSubmit.co fails
    async sendWithEmailJS(formData) {
        // This would require EmailJS setup
        console.warn('EmailJS fallback not configured. Please set up EmailJS service.');
        return false;
    }
}

// Initialize email service
const emailService = new EmailService();

