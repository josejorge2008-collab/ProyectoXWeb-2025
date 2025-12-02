// Utilidades para Happy Smile
document.addEventListener('DOMContentLoaded', function() {
    console.log('Happy Smile - Página profesional cargada');
    
    // ===== EFECTOS PARA PRODUCTOS =====
    const productos = document.querySelectorAll('.producto-card');
    
    productos.forEach(producto => {
        // Efecto hover 3D
        producto.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(255, 107, 107, 0.25)';
        });
        
        producto.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
        
        // Efecto click
        producto.addEventListener('click', function() {
            console.log('Navegando a producto: ' + this.href);
        });
    });
    
    // ===== NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.newsletter-input');
            const button = this.querySelector('.newsletter-btn');
            
            if (input.value.trim()) {
                // Guardar email
                localStorage.setItem('newsletterEmail', input.value);
                
                // Efecto visual
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
                button.style.background = '#2ecc71';
                button.disabled = true;
                
                // Reset después de 3 segundos
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    input.value = '';
                    alert('¡Gracias por suscribirte a Happy Smile!');
                }, 3000);
            }
        });
    }
    
    // ===== CONTADOR DE VISITAS =====
    if (!localStorage.getItem('visitasHS')) {
        localStorage.setItem('visitasHS', 1);
    } else {
        let visitas = parseInt(localStorage.getItem('visitasHS'));
        localStorage.setItem('visitasHS', visitas + 1);
    }
    
    // ===== AÑO ACTUAL EN FOOTER =====
    const copyright = document.querySelector('.footer-copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace('2025', currentYear);
    }
    
    // ===== WHATSAPP BUTTON ANIMATION =====
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        // Animación inicial
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 300);
        }, 1000);
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.includes('.html')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});