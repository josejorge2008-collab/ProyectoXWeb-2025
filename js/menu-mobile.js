// menu-mobile.js - Menú responsive para móviles

document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Menú móvil inicializado');
    
    // ===== ELEMENTOS DEL DOM =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) {
        console.warn('Elementos del menú móvil no encontrados');
        return;
    }
    
    // ===== TOGGLE MENÚ =====
    hamburger.addEventListener('click', function() {
        // Toggle menú
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animación de hamburguesa a X
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // ===== CERRAR MENÚ AL HACER CLIC EN ENLACE =====
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Restaurar barras
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
    
    // ===== CERRAR MENÚ AL HACER CLIC FUERA =====
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Restaurar barras
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });
    
    // ===== DETECTAR ANCHO DE PANTALLA =====
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            // En pantallas grandes, asegurar que el menú esté visible
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // Verificar tamaño al cargar y al redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    console.log('✅ Menú móvil listo');
});