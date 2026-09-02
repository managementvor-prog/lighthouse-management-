document.addEventListener('DOMContentLoaded', () => {
    console.log('%c Lighthouse Management ', 'background:#D4AF37;color:#0A0A0A;padding:4px 8px;border-radius:4px;font-weight:bold;', 'initialized');

    window.addEventListener('error', (e) => {
        console.error('Runtime error:', e.error);
    });
});
