// Funcionalidades para todas las páginas de catálogo
document.addEventListener('DOMContentLoaded', function() {
    // Añadir al carrito
    const botonesCarrito = document.querySelectorAll('.btn-carrito');
    
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', function() {
            const productoCard = this.closest('.producto-card');
            const nombreProducto = productoCard.querySelector('h3').textContent;
            const precioProducto = productoCard.querySelector('.producto-precio').textContent;
            
            // Efecto visual al añadir
            this.textContent = '✓ Añadido';
            this.style.background = '#27ae60';
            this.disabled = true;
            
            // Restaurar después de 2 segundos
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.background = '';
                this.disabled = false;
            }, 2000);
            
            console.log(`Producto añadido: ${nombreProducto} - ${precioProducto}`);
        });
    });
});