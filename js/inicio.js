// inicio.js - VERSIÓN CORREGIDA Y OPTIMIZADA
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página de inicio cargada correctamente');
    
    // ===== CORRECCIÓN: ESPERAR A QUE EXISTAN ELEMENTOS =====
    function safeQuerySelector(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Elemento no encontrado: ${selector}`);
            return null;
        }
        return element;
    }
    
    // ===== MENÚ MÓVIL (si no tienes) =====
    const menuToggle = safeQuerySelector('.menu-toggle');
    const navMenu = safeQuerySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ===== ANIMACIÓN DE SCROLL SUAVE =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CONTADOR DE PRODUCTOS (ejemplo) =====
    const contadorProductos = safeQuerySelector('.contador-productos');
    if (contadorProductos) {
        // Simular carga de datos
        setTimeout(() => {
            contadorProductos.textContent = '25+';
            contadorProductos.style.color = '#ff6b8b';
        }, 1000);
    }
    
    // ===== DETECCIÓN DE ERRORES =====
    window.addEventListener('error', function(e) {
        console.error('❌ Error detectado:', e.message);
        // Puedes enviar esto a un servicio de monitoreo
    });
    
    // ===== INICIALIZACIÓN COMPLETA =====
    console.log('✨ Script de inicio inicializado correctamente');
});

// ===== FUNCIONES GLOBALES ÚTILES =====
function mostrarMensaje(mensaje, tipo = 'info') {
    const colores = {
        'success': '#4CAF50',
        'error': '#F44336',
        'info': '#2196F3',
        'warning': '#FF9800'
    };
    
    const div = document.createElement('div');
    div.textContent = mensaje;
    div.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 15px 25px;
        background: ${colores[tipo] || '#2196F3'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// Añadir animaciones CSS si no existen
if (!document.querySelector('#estilos-dinamicos')) {
    const style = document.createElement('style');
    style.id = 'estilos-dinamicos';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}