// Function to reset the form
function resetForm() {
    document.getElementById('product-form').reset();
}

// Function to add a product card to the page
function addProductCard(name, price, inStock, imageSrc) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${imageSrc}" alt="${name}">
        <h3>${name}</h3>
        <p class="price">$${parseFloat(price).toFixed(2)}</p>
        <p class="${inStock ? 'in-stock' : 'out-of-stock'}">
            ${inStock ? 'In Stock' : 'Out of Stock'}
        </p>
        <button onclick="removeProduct(this)">Remove</button>
    `;

    document.getElementById('product-list').prepend(productCard);
    updateLocalStorage();
}

// Function to remove a product card and update localStorage
function removeProduct(button) {
    button.parentNode.remove();
    updateLocalStorage();
}

// Event listener for form submission
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const inStock = document.getElementById('inStock').value === 'true';
    const imageSrc = document.getElementById('image').value || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
    
    addProductCard(name, price, inStock, imageSrc);
    resetForm();
});

// Function to update the inventory in localStorage
function updateLocalStorage() {
    const productCards = document.querySelectorAll('.product-card');
    const inventory = [];

    productCards.forEach(card => {
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('.price').innerText.replace('$', '');
        const inStock = card.querySelector('.in-stock') !== null;
        const imageSrc = card.querySelector('img').src;

        inventory.push({ name, price, inStock, imageSrc });
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Function to load the inventory from localStorage
function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    inventory.forEach(item => {
        addProductCard(item.name, item.price, item.inStock, item.imageSrc);
    });
}

// Load the inventory when the page is loaded
document.addEventListener('DOMContentLoaded', loadInventory);