// Scripts para el footer - ARCHIVO NUEVO
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
                button.textContent = 'Suscrito ✓';
                button.style.background = '#25D366';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    input.value = '';
                }, 3000);
            }
        });
    });
    
    // WhatsApp click
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            alert('Redirigiendo a WhatsApp...');
        });
    });
});