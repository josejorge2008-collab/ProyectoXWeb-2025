// menu-mobile.js - Menú hamburguesa para móviles
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa si no existe
    if (!document.querySelector('.hamburger')) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = `
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            `;
            
            // Insertar antes del menú
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navbar.insertBefore(hamburger, navMenu);
                
                // Funcionalidad
                hamburger.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    
                    // Animación de las barras
                    const bars = this.querySelectorAll('.bar');
                    if (this.classList.contains('active')) {
                        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                        bars[1].style.opacity = '0';
                        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
                    } else {
                        bars[0].style.transform = 'none';
                        bars[1].style.opacity = '1';
                        bars[2].style.transform = 'none';
                    }
                });
                
                // Cerrar menú al hacer clic en enlace
                navMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        // Restaurar barras
                        const bars = hamburger.querySelectorAll('.bar');
                        bars[0].style.transform = 'none';
                        bars[1].style.opacity = '1';
                        bars[2].style.transform = 'none';
                    });
                });
            }
        }
    }
});