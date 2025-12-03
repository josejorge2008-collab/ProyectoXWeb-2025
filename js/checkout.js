// checkout.js - Funcionalidades para la página de checkout

document.addEventListener('DOMContentLoaded', function() {
    console.log('💳 Checkout inicializado');
    
    // ===== CARRITO DESDE LOCALSTORAGE =====
    let carrito = JSON.parse(localStorage.getItem('carritoSweetDelights')) || [];
    
    // ===== ELEMENTOS DEL DOM =====
    const orderItems = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    const discountInput = document.getElementById('discount-input');
    const applyBtn = document.querySelector('.btn-apply');
    const methodOptions = document.querySelectorAll('.method-option');
    
    // ===== CONSTANTES =====
    const COSTO_ENVIO = 35.00;
    let descuentoAplicado = 20.00; // Descuento por defecto
    
    // ===== CALCULAR TOTALES =====
    function calcularSubtotal() {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }
    
    function calcularTotal() {
        const subtotal = calcularSubtotal();
        return subtotal + COSTO_ENVIO - descuentoAplicado;
    }
    
    // ===== RENDERIZAR ITEMS DEL CARRITO =====
    function renderizarItemsCarrito() {
        if (!orderItems || carrito.length === 0) {
            if (orderItems) {
                orderItems.innerHTML = `
                    <div class="carrito-vacio">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Tu carrito está vacío</h3>
                        <p>Agrega productos desde nuestra tienda</p>
                        <a href="./productos.html" class="btn">Ver Productos</a>
                    </div>
                `;
            }
            actualizarTotales();
            return;
        }
        
        orderItems.innerHTML = '';
        
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.dataset.index = index;
            
            itemElement.innerHTML = `
                <img src="${item.imagen || './img/placeholder.jpg'}" alt="${item.nombre}">
                <div class="item-details">
                    <h4>${item.nombre}</h4>
                    <p>${item.descripcion || 'Delicioso producto de repostería'}</p>
                    <div class="item-controls">
                        <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                        <span class="qty">${item.cantidad}</span>
                        <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
                        <span class="item-price">$${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            orderItems.appendChild(itemElement);
        });
        
        actualizarTotales();
    }
    
    // ===== ACTUALIZAR TOTALES =====
    function actualizarTotales() {
        const subtotal = calcularSubtotal();
        const total = calcularTotal();
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `$${COSTO_ENVIO.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-$${descuentoAplicado.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Actualizar botón de confirmación
        if (confirmBtn) {
            confirmBtn.innerHTML = `<i class="fas fa-lock"></i> Confirmar y Pagar $${total.toFixed(2)}`;
        }
        
        // Actualizar monto en instrucciones QR
        const qrAmount = document.querySelector('.amount');
        if (qrAmount) {
            qrAmount.textContent = `$${total.toFixed(2)} MXN`;
        }
        
        // Actualizar QR con nuevo monto
        actualizarQRCode(total);
    }
    
    // ===== ACTUALIZAR QR CODE =====
    function actualizarQRCode(monto) {
        const qrImg = document.querySelector('.qr-code');
        if (!qrImg) return;
        
        const datosQR = `https://proyectoxweb.netlify.app/confirmacion?monto=${monto}&fecha=${Date.now()}`;
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(datosQR)}&format=svg&color=ffc8dd&bgcolor=ffffff`;
    }
    
    // ===== MANEJAR CANTIDADES =====
    function setupControlesCantidad() {
        if (!orderItems) return;
        
        orderItems.addEventListener('click', function(e) {
            const itemElement = e.target.closest('.order-item');
            if (!itemElement) return;
            
            const index = parseInt(itemElement.dataset.index);
            const item = carrito[index];
            
            if (!item) return;
            
            // Botón menos
            if (e.target.closest('.minus')) {
                if (item.cantidad > 1) {
                    item.cantidad--;
                } else {
                    // Si la cantidad es 1, preguntar si eliminar
                    if (confirm('¿Eliminar este producto del carrito?')) {
                        carrito.splice(index, 1);
                    }
                }
                guardarYActualizar();
            }
            
            // Botón más
            if (e.target.closest('.plus')) {
                item.cantidad++;
                guardarYActualizar();
            }
            
            // Eliminar item
            if (e.target.closest('.remove-item')) {
                if (confirm('¿Eliminar este producto del carrito?')) {
                    carrito.splice(index, 1);
                    guardarYActualizar();
                }
            }
        });
    }
    
    // ===== GUARDAR Y ACTUALIZAR =====
    function guardarYActualizar() {
        localStorage.setItem('carritoSweetDelights', JSON.stringify(carrito));
        renderizarItemsCarrito();
        actualizarContadorCarrito();
    }
    
    // ===== ACTUALIZAR CONTADOR CARRITO =====
    function actualizarContadorCarrito() {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        const contadores = document.querySelectorAll('#cart-count');
        
        contadores.forEach(contador => {
            contador.textContent = totalItems;
        });
    }
    
    // ===== MÉTODOS DE PAGO =====
    function setupMetodosPago() {
        if (!methodOptions.length) return;
        
        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remover active de todos
                methodOptions.forEach(opt => opt.classList.remove('active'));
                // Agregar al clickeado
                this.classList.add('active');
                
                // Mostrar sección correspondiente
                const metodo = this.dataset.method;
                const secciones = document.querySelectorAll('.payment-section > div');
                
                secciones.forEach(seccion => {
                    seccion.style.display = 'none';
                    if (seccion.classList.contains(`${metodo}-payment`)) {
                        seccion.style.display = 'block';
                    }
                });
            });
        });
    }
    
    // ===== CÓDIGO DE DESCUENTO =====
    function setupCodigoDescuento() {
        if (!applyBtn || !discountInput) return;
        
        applyBtn.addEventListener('click', aplicarDescuento);
        discountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aplicarDescuento();
            }
        });
    }
    
    function aplicarDescuento() {
        const codigo = discountInput.value.trim().toUpperCase();
        
        if (!codigo) {
            mostrarMensaje('Por favor ingresa un código', 'error');
            return;
        }
        
        // Códigos válidos
        const codigosValidos = {
            'DULCE10': 10,
            'SWEET20': 20,
            'REPOSTERIA': 15,
            'DELIVERY': 25
        };
        
        if (codigosValidos[codigo]) {
            descuentoAplicado = codigosValidos[codigo];
            mostrarMensaje(`🎉 ¡Código aplicado! Descuento de $${descuentoAplicado} aplicado`, 'exito');
            discountInput.value = '';
            actualizarTotales();
        } else {
            mostrarMensaje('❌ Código inválido o expirado', 'error');
            discountInput.value = '';
        }
    }
    
    // ===== CONFIRMAR PAGO =====
    function setupConfirmarPago() {
        if (!confirmBtn) return;
        
        confirmBtn.addEventListener('click', function() {
            // Validar carrito
            if (carrito.length === 0) {
                mostrarMensaje('🛒 Tu carrito está vacío', 'error');
                return;
            }
            
            // Validar método de pago seleccionado
            const metodoSeleccionado = document.querySelector('.method-option.active');
            if (!metodoSeleccionado) {
                mostrarMensaje('Por favor selecciona un método de pago', 'error');
                return;
            }
            
            // Mostrar loading
            const textoOriginal = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando pago...';
            this.disabled = true;
            
            // Simular procesamiento
            setTimeout(() => {
                // Crear resumen del pedido
                const resumenPedido = {
                    id: Date.now(),
                    fecha: new Date().toISOString(),
                    items: carrito,
                    subtotal: calcularSubtotal(),
                    envio: COSTO_ENVIO,
                    descuento: descuentoAplicado,
                    total: calcularTotal(),
                    metodo: metodoSeleccionado.dataset.method,
                    estado: 'completado'
                };
                
                // Guardar pedido en localStorage
                const pedidosAnteriores = JSON.parse(localStorage.getItem('pedidosSweetDelights')) || [];
                pedidosAnteriores.push(resumenPedido);
                localStorage.setItem('pedidosSweetDelights', JSON.stringify(pedidosAnteriores));
                
                // Limpiar carrito
                carrito = [];
                localStorage.removeItem('carritoSweetDelights');
                actualizarContadorCarrito();
                
                // Mostrar éxito
                this.innerHTML = '<i class="fas fa-check"></i> ¡Pago Completado!';
                this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                mostrarMensaje('🎉 ¡Pedido confirmado! Recibirás un correo con los detalles.', 'exito');
                
                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    window.location.href = `../confirmacion.html?pedido=${resumenPedido.id}`;
                }, 2000);
                
            }, 2000);
        });
    }
    
    // ===== MOSTRAR MENSAJE =====
    function mostrarMensaje(mensaje, tipo = 'info') {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'mensaje-flotante';
        mensajeDiv.innerHTML = `
            <div class="mensaje-contenido ${tipo}">
                <i class="fas fa-${tipo === 'exito' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${mensaje}</span>
            </div>
        `;
        
        // Estilos
        mensajeDiv.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(mensajeDiv);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            mensajeDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => mensajeDiv.remove(), 300);
        }, 4000);
    }
    
    // ===== INICIALIZAR =====
    function init() {
        renderizarItemsCarrito();
        setupControlesCantidad();
        setupMetodosPago();
        setupCodigoDescuento();
        setupConfirmarPago();
        actualizarContadorCarrito();
        
        // Añadir estilos para mensajes
        if (!document.querySelector('#estilos-mensajes')) {
            const estilo = document.createElement('style');
            estilo.id = 'estilos-mensajes';
            estilo.textContent = `
                .mensaje-contenido {
                    padding: 15px 25px;
                    border-radius: 10px;
                    color: white;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .mensaje-contenido.exito {
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                }
                .mensaje-contenido.error {
                    background: linear-gradient(135deg, #F44336, #d32f2f);
                }
                .mensaje-contenido.info {
                    background: linear-gradient(135deg, #2196F3, #1976D2);
                }
                .carrito-vacio {
                    text-align: center;
                    padding: 40px 20px;
                }
                .carrito-vacio i {
                    font-size: 3rem;
                    color: var(--border);
                    margin-bottom: 20px;
                }
                .carrito-vacio h3 {
                    color: var(--texto-claro);
                    margin-bottom: 10px;
                }
                .carrito-vacio .btn {
                    margin-top: 20px;
                }
            `;
            document.head.appendChild(estilo);
        }
        
        console.log('✅ Checkout listo. Productos en carrito:', carrito.length);
    }
    
    // Iniciar
    init();
});