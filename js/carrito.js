// carrito.js - Sistema de carrito de compras

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Carrito inicializado');
    
    // ===== SISTEMA DE CARRITO =====
    let carrito = JSON.parse(localStorage.getItem('carritoSweetDelights')) || [];
    
    // ===== ELEMENTOS DEL DOM =====
    const cartCountElement = document.getElementById('cart-count');
    const cartCounterHeader = document.querySelector('.cart-counter #cart-count');
    
    // ===== ACTUALIZAR CONTADOR =====
    function actualizarContadorCarrito() {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
        if (cartCounterHeader) {
            cartCounterHeader.textContent = totalItems;
        }
        
        // Actualizar en localStorage
        localStorage.setItem('carritoSweetDelights', JSON.stringify(carrito));
    }
    
    // ===== AGREGAR AL CARRITO =====
    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        actualizarContadorCarrito();
        mostrarNotificacion(`✅ ${producto.nombre} añadido al carrito`);
    }
    
    // ===== DATOS DE PRODUCTOS (simulados) =====
    const productos = {
        // Pasteles
        101: { id: 101, nombre: "Pastel Chocolate Supreme", precio: 280, imagen: "../img/pastel-chocolate.jpg" },
        102: { id: 102, nombre: "Pastel Fresas con Crema", precio: 250, imagen: "../img/pastel-fresa.jpg" },
        103: { id: 103, nombre: "Pastel Zanahoria Especial", precio: 270, imagen: "../img/pastel-zanahoria.jpg" },
        104: { id: 104, nombre: "Pastel Red Velvet", precio: 300, imagen: "../img/pastel-red-velvet.jpg" },
        105: { id: 105, nombre: "Pastel Coco y Limón", precio: 260, imagen: "../img/pastel-coco.jpg" },
        106: { id: 106, nombre: "Pastel Tres Leches", precio: 240, imagen: "../img/pastel-3-leches.jpg" },
        
        // Donas
        201: { id: 201, nombre: "Dona Chocolate", precio: 25, imagen: "../img/dona-chocolate.jpg" },
        202: { id: 202, nombre: "Dona Fresa", precio: 25, imagen: "../img/dona-fresa.jpg" },
        203: { id: 203, nombre: "Dona Vainilla", precio: 25, imagen: "../img/dona-vainilla.jpg" },
        204: { id: 204, nombre: "Dona Maple", precio: 30, imagen: "../img/dona-maple.jpg" },
        205: { id: 205, nombre: "Dona Rellena", precio: 30, imagen: "../img/dona-rellena.jpg" },
        206: { id: 206, nombre: "Paquete Mixto Donas", precio: 220, imagen: "../img/dona-mixta.jpg" },
        
        // Galletas
        301: { id: 301, nombre: "Galletas con Chispas", precio: 85, imagen: "../img/galleta-chispas.jpg" },
        302: { id: 302, nombre: "Galletas Avena con Pasas", precio: 80, imagen: "../img/galleta-avena.jpg" },
        303: { id: 303, nombre: "Galletas Mantequilla Decoradas", precio: 120, imagen: "../img/galleta-mantequilla.jpg" },
        304: { id: 304, nombre: "Galletas Jengibre Navideñas", precio: 150, imagen: "../img/galleta-jengibre.jpg" },
        305: { id: 305, nombre: "Galletas Almendra y Coco", precio: 95, imagen: "../img/galleta-almendra.jpg" },
        306: { id: 306, nombre: "Paquete Mixto Galletas", precio: 180, imagen: "../img/galleta-mixta.jpg" },
        
        // Bebidas
        401: { id: 401, nombre: "Café Latte", precio: 45, imagen: "../img/cafe-latte.jpg" },
        402: { id: 402, nombre: "Capuchino", precio: 50, imagen: "../img/capuchino.jpg" },
        403: { id: 403, nombre: "Chocolate Belga", precio: 55, imagen: "../img/chocolate-caliente.jpg" },
        404: { id: 404, nombre: "Té Chai Latte", precio: 48, imagen: "../img/te-chai.jpg" },
        405: { id: 405, nombre: "Frappuccino", precio: 60, imagen: "../img/frappuccino.jpg" },
        406: { id: 406, nombre: "Limonada Artesanal", precio: 40, imagen: "../img/limonada.jpg" },
        
        // Productos destacados
        1: { id: 1, nombre: "Pastel Chocolate Supreme", precio: 280, imagen: "../img/pastel-chocolate.jpg" },
        2: { id: 2, nombre: "Donas Glaseadas (6 pz)", precio: 120, imagen: "../img/donas-mixtas.jpg" },
        3: { id: 3, nombre: "Galletas con Chispas", precio: 85, imagen: "../img/galletas-chispas.jpg" }
    };
    
    // ===== MANEJAR CLIC EN BOTONES AÑADIR =====
    function setupBotonesCarrito() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-add-cart') || 
                e.target.closest('.btn-add-cart')) {
                
                const boton = e.target.classList.contains('btn-add-cart') 
                    ? e.target 
                    : e.target.closest('.btn-add-cart');
                
                const productoId = parseInt(boton.dataset.id);
                const producto = productos[productoId];
                
                if (producto) {
                    agregarAlCarrito(producto);
                    
                    // Efecto visual
                    boton.innerHTML = '<i class="fas fa-check"></i> Añadido';
                    boton.style.backgroundColor = '#4CAF50';
                    
                    setTimeout(() => {
                        boton.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir al Carrito';
                        boton.style.backgroundColor = '';
                    }, 2000);
                }
            }
        });
    }
    
    // ===== NOTIFICACIÓN =====
    function mostrarNotificacion(mensaje, tipo = 'exito') {
        // Crear notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.innerHTML = `
            <div class="notificacion-contenido ${tipo}">
                <i class="fas fa-${tipo === 'exito' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${mensaje}</span>
            </div>
        `;
        
        // Estilos
        notificacion.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
        
        // Añadir estilos si no existen
        if (!document.querySelector('#estilos-notificacion')) {
            const estilo = document.createElement('style');
            estilo.id = 'estilos-notificacion';
            estilo.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notificacion-contenido {
                    padding: 15px 25px;
                    border-radius: 10px;
                    color: white;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .notificacion-contenido.exito {
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                }
                .notificacion-contenido.error {
                    background: linear-gradient(135deg, #F44336, #d32f2f);
                }
                .notificacion-contenido.info {
                    background: linear-gradient(135deg, #2196F3, #1976D2);
                }
            `;
            document.head.appendChild(estilo);
        }
    }
    
    // ===== CARRITO EN HEADER =====
    function setupCarritoHeader() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = './checkout.html';
            });
        }
    }
    
    // ===== VACIAR CARRITO =====
    function vaciarCarrito() {
        if (carrito.length > 0) {
            if (confirm('¿Estás seguro de vaciar el carrito?')) {
                carrito = [];
                localStorage.removeItem('carritoSweetDelights');
                actualizarContadorCarrito();
                mostrarNotificacion('🛒 Carrito vaciado', 'info');
            }
        } else {
            mostrarNotificacion('El carrito ya está vacío', 'info');
        }
    }
    
    // ===== INICIALIZAR =====
    function init() {
        actualizarContadorCarrito();
        setupBotonesCarrito();
        setupCarritoHeader();
        
        // Botón para vaciar carrito (debug)
        if (window.location.href.includes('debug')) {
            const vaciarBtn = document.createElement('button');
            vaciarBtn.textContent = 'Vaciar Carrito';
            vaciarBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999;
                background: #F44336;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
            `;
            vaciarBtn.addEventListener('click', vaciarCarrito);
            document.body.appendChild(vaciarBtn);
        }
        
        console.log('✅ Carrito listo. Productos en carrito:', carrito.length);
    }
    
    // Iniciar
    init();
});