// Function to update local storage with the current product list
function updateLocalStorage() {
    const productCards = document.querySelectorAll('.product-card');
    const products = [];

    productCards.forEach(card => {
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent.replace('$', '');
        const inStock = card.querySelector('.stock-status').classList.contains('in-stock');
        const imageSrc = card.querySelector('img').getAttribute('src');

        products.push({ name, price, inStock, imageSrc });
    });

    localStorage.setItem('products', JSON.stringify(products));
}

// Function to load products from local storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        createProductCard(product.name, product.price, product.inStock, product.imageSrc);
    });
}

// Function to create a product card
function createProductCard(name, price, inStock, imageSrc = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg') {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${imageSrc}" alt="${name}">
        <h3>${name}</h3>
        <p class="price">$${parseFloat(price).toFixed(2)}</p>
        <p class="stock-status ${inStock ? 'in-stock' : 'out-of-stock'}">
            ${inStock ? 'In Stock' : 'Out of Stock'}
        </p>
        <button onclick="removeProduct(this)">Remove</button>
    `;

    document.getElementById('product-list').prepend(productCard);
    updateLocalStorage();
}

// Function to remove a product
function removeProduct(button) {
    button.parentNode.remove();
    updateLocalStorage();
}

// Event listener for form submission
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const inStock = document.getElementById('inStock').checked;
    const image = document.getElementById('image').value || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
    
    createProductCard(name, price, inStock, image);
    document.getElementById('product-form').reset();
});

// Load products from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadProducts);