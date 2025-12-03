// inicio.js - Funcionalidades para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 Página de inicio cargada');
    
    // ===== ANIMACIÓN DE ENTRADA =====
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeIn 1s ease';
    }
    
    // ===== CONTADOR ANIMADO =====
    function iniciarContadorAnimado() {
        const contadores = document.querySelectorAll('.contador');
        contadores.forEach(contador => {
            const objetivo = parseInt(contador.dataset.objetivo);
            const duracion = 2000; // 2 segundos
            const incremento = objetivo / (duracion / 16); // 60fps
            let actual = 0;
            
            const timer = setInterval(() => {
                actual += incremento;
                if (actual >= objetivo) {
                    contador.textContent = objetivo + '+';
                    clearInterval(timer);
                } else {
                    contador.textContent = Math.floor(actual);
                }
            }, 16);
        });
    }
    
    // ===== EFECTO SCROLL SUAVE =====
    function setupScrollSuave() {
        const enlaces = document.querySelectorAll('a[href^="#"]');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const objetivo = document.querySelector(href);
                if (objetivo) {
                    e.preventDefault();
                    window.scrollTo({
                        top: objetivo.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== ANIMACIÓN AL SCROLL =====
    function setupAnimacionScroll() {
        const elementos = document.querySelectorAll('.categoria-card, .producto-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        elementos.forEach(el => observer.observe(el));
    }
    
    // ===== TESTIMONIOS CARRUSEL (si agregas después) =====
    function setupCarruselTestimonios() {
        const carrusel = document.querySelector('.carrusel-testimonios');
        if (!carrusel) return;
        
        const testimonios = carrusel.querySelectorAll('.testimonio');
        let indiceActual = 0;
        
        function mostrarTestimonio(indice) {
            testimonios.forEach((testimonio, i) => {
                testimonio.classList.remove('active');
                if (i === indice) {
                    testimonio.classList.add('active');
                }
            });
        }
        
        // Auto-avanzar cada 5 segundos
        setInterval(() => {
            indiceActual = (indiceActual + 1) % testimonios.length;
            mostrarTestimonio(indiceActual);
        }, 5000);
    }
    
    // ===== INICIALIZAR TODO =====
    function init() {
        setupScrollSuave();
        setupAnimacionScroll();
        iniciarContadorAnimado();
        setupCarruselTestimonios();
        
        // Añadir clase loaded para transiciones
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        console.log('✅ Inicio inicializado correctamente');
    }
    
    // Iniciar
    init();
});