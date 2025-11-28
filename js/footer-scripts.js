// Scripts para el footer Happy Smile
document.addEventListener('DOMContentLoaded', function() {
    // Suscripción al newsletter
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.subscribe-input');
            const button = this.querySelector('.subscribe-btn');
            
            if (input.value.trim()) {
                const originalText = button.textContent;
                button.textContent = '✓ Suscrito';
                button.style.background = '#4CAF50';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    input.value = '';
                }, 3000);
            }
        });
    });
    
    // Efecto hover en enlaces
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});