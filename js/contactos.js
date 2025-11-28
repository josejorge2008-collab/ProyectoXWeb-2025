// Funcionalidades para página de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.form-contacto');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btnEnviar = this.querySelector('.btn-enviar');
        const textoOriginal = btnEnviar.textContent;
        
        // Simular envío
        btnEnviar.textContent = 'ENVIANDO...';
        btnEnviar.disabled = true;
        
        setTimeout(() => {
            btnEnviar.textContent = '✓ MENSAJE ENVIADO';
            btnEnviar.style.background = '#4CAF50';
            
            // Restaurar después de 3 segundos
            setTimeout(() => {
                btnEnviar.textContent = textoOriginal;
                btnEnviar.style.background = '';
                btnEnviar.disabled = false;
                formulario.reset();
            }, 3000);
        }, 1500);
    });
});