// checkout.js - Funcionalidad completa del checkout

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Checkout cargado');
    
    // ===== DATOS DEL CARRITO (simulado) =====
    let cart = [
        {
            id: 1,
            name: "Pastel de Chocolate Premium",
            description: "Con chips de chocolate y crema belga",
            price: 280.00,
            quantity: 1,
            image: "img/pastel-ejemplo.jpg"
        },
        {
            id: 2,
            name: "Donas Glaseadas (6 pz)",
            description: "Variedad: chocolate, fresa, vainilla",
            price: 120.00,
            quantity: 1,
            image: "img/dona-ejemplo.jpg"
        }
    ];
    
    const shippingCost = 35.00;
    const discount = 20.00;
    
    // ===== ELEMENTOS DEL DOM =====
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.getElementById('cart-count');
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    
    // ===== FUNCIONES DE CÁLCULO =====
    function calculateSubtotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    function calculateTotal() {
        const subtotal = calculateSubtotal();
        return subtotal + shippingCost - discount;
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }
    
    // ===== RENDERIZAR ITEMS DEL CARRITO =====
    function renderCartItems() {
        if (!orderItemsContainer) return;
        
        orderItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-desc">${item.description}</p>
                    <div class="item-controls">
                        <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                        <span class="qty">${item.quantity}</span>
                        <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
                        <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            `;
            
            orderItemsContainer.appendChild(itemElement);
        });
        
        updateTotals();
        updateCartCount();
    }
    
    // ===== ACTUALIZAR TOTALES =====
    function updateTotals() {
        const subtotal = calculateSubtotal();
        const total = calculateTotal();
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Actualizar botón de confirmación
        if (confirmBtn) {
            confirmBtn.innerHTML = `<i class="fas fa-lock"></i> Confirmar y Pagar $${total.toFixed(2)}`;
        }
        
        // Actualizar instrucciones del QR
        const qrTotal = document.querySelector('.qr-instructions strong');
        if (qrTotal) {
            qrTotal.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // ===== MANEJAR CAMBIOS DE CANTIDAD =====
    function setupQuantityControls() {
        orderItemsContainer.addEventListener('click', function(e) {
            const itemElement = e.target.closest('.order-item');
            if (!itemElement) return;
            
            const itemId = parseInt(itemElement.dataset.id);
            const item = cart.find(i => i.id === itemId);
            if (!item) return;
            
            // Botón menos
            if (e.target.closest('.minus')) {
                if (item.quantity > 1) {
                    item.quantity--;
                    renderCartItems();
                }
            }
            
            // Botón más
            if (e.target.closest('.plus')) {
                item.quantity++;
                renderCartItems();
            }
            
            // Eliminar item
            if (e.target.closest('.remove-item')) {
                if (confirm('¿Eliminar este producto del carrito?')) {
                    cart = cart.filter(i => i.id !== itemId);
                    renderCartItems();
                }
            }
        });
    }
    
    // ===== MÉTODOS DE PAGO =====
    function setupPaymentMethods() {
        const methodOptions = document.querySelectorAll('.method-option');
        const qrPayment = document.querySelector('.qr-payment');
        
        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remover clase active de todos
                methodOptions.forEach(opt => opt.classList.remove('active'));
                // Agregar al clickeado
                this.classList.add('active');
                
                // Mostrar sección correspondiente
                const method = this.dataset.method;
                if (method === 'qr') {
                    qrPayment.classList.add('active');
                } else {
                    qrPayment.classList.remove('active');
                }
            });
        });
    }
    
    // ===== CÓDIGO DE DESCUENTO =====
    function setupDiscountCode() {
        const discountInput = document.getElementById('discount-input');
        const applyBtn = document.querySelector('.btn-apply');
        
        if (applyBtn && discountInput) {
            applyBtn.addEventListener('click', function() {
                const code = discountInput.value.trim();
                
                if (code === '') {
                    alert('Por favor ingresa un código');
                    return;
                }
                
                // Simular validación de código
                if (code.toUpperCase() === 'DULCE10') {
                    alert('🎉 ¡Código aplicado! Obtienes $10 de descuento adicional');
                } else {
                    alert('❌ Código inválido o expirado');
                }
                
                discountInput.value = '';
            });
            
            // Permitir Enter
            discountInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyBtn.click();
                }
            });
        }
    }
    
    // ===== CONFIRMAR PAGO =====
    function setupPaymentConfirmation() {
        if (!confirmBtn) return;
        
        confirmBtn.addEventListener('click', function() {
            // Validar que haya items
            if (cart.length === 0) {
                alert('🛒 Tu carrito está vacío');
                return;
            }
            
            // Mostrar loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando pago...';
            this.disabled = true;
            
            // Simular procesamiento de pago
            setTimeout(() => {
                // Éxito
                this.innerHTML = '<i class="fas fa-check"></i> ¡Pago Completado!';
                this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                // Mostrar mensaje de éxito
                showNotification('🎉 ¡Pedido confirmado! Recibirás un correo con los detalles.', 'success');
                
                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html?order=success';
                }, 2000);
                
                // Aquí normalmente enviarías los datos a tu backend
                console.log('Pedido procesado:', {
                    cart: cart,
                    total: calculateTotal(),
                    timestamp: new Date().toISOString()
                });
                
            }, 2000);
        });
    }
    
    // ===== NOTIFICACIÓN =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content ${type}">
                ${message}
            </div>
        `;
        
        // Estilos básicos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // ===== INICIALIZACIÓN =====
    function init() {
        renderCartItems();
        setupQuantityControls();
        setupPaymentMethods();
        setupDiscountCode();
        setupPaymentConfirmation();
        
        console.log('✨ Checkout inicializado');
    }
    
    // Iniciar
    init();
    
    // ===== ANIMACIONES CSS ADICIONALES =====
    if (!document.querySelector('#checkout-animations')) {
        const style = document.createElement('style');
        style.id = 'checkout-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification-content {
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .notification-content.success {
                background: linear-gradient(135deg, #4CAF50, #45a049);
            }
            
            .notification-content.error {
                background: linear-gradient(135deg, #F44336, #d32f2f);
            }
            
            .notification-content.info {
                background: linear-gradient(135deg, #2196F3, #1976D2);
            }
            
            .fa-spinner {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});