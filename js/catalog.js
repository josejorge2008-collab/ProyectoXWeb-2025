// Funcionalidades del catálogo
document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    const filterSelects = document.querySelectorAll('.filter-select');
    const searchInput = document.querySelector('.search-input');
    const productCards = document.querySelectorAll('.product-card');
    
    // Función para filtrar productos
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryFilter = filterSelects[0].value;
        const sortFilter = filterSelects[1].value;
        
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const category = card.getAttribute('data-category') || '';
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !categoryFilter || category === categoryFilter;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Ordenar productos
        if (sortFilter === 'precio') {
            sortProductsByPrice();
        }
    }
    
    // Función para ordenar por precio
    function sortProductsByPrice() {
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(productCards);
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
        });
        
        // Reorganizar el grid
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }
    
    // Event listeners
    filterSelects.forEach(select => {
        select.addEventListener('change', filterProducts);
    });
    
    searchInput.addEventListener('input', filterProducts);
    
    // Añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Simular añadir al carrito
            this.textContent = '✓ Añadido';
            this.style.background = '#27ae60';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Añadir al Carrito';
                this.style.background = '';
                this.disabled = false;
            }, 2000);
            
            console.log(`Producto añadido: ${productName} - ${productPrice}`);
        });
    });
});