const EmailService = {
    async sendBooking(data) {
        console.log('Booking submitted via FormSubmit.co:', data);
        return { success: true };
    }
};
