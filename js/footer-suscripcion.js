// Suscripción al newsletter - ARCHIVO NUEVO
document.addEventListener('DOMContentLoaded', function() {
    const formsSuscripcion = document.querySelectorAll('.form-suscripcion');
    
    formsSuscripcion.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.input-suscripcion');
            const btn = this.querySelector('.btn-suscripcion');
            
            if (input.value) {
                const textoOriginal = btn.textContent;
                btn.textContent = '✓ SUSCRITO';
                btn.style.background = '#4CAF50';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.textContent = textoOriginal;
                    btn.style.background = '';
                    btn.disabled = false;
                    input.value = '';
                }, 3000);
            }
        });
    });
});