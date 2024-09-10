const products = [
    { name: "Laptop", category: "Electronics", price: 1000 * 17.93, image: "photos/laptop.jpeg" },
    { name: "Shirt", category: "Clothing", price: 50 * 17.93, image: "photos/shirt.jpg" },
    { name: "Blender", category: "Home", price: 80 * 17.93, image: "photos/blender.jpg" },
    { name: "Phone", category: "Electronics", price: 800 * 17.93, image: "photos/iphone.jpg" },
    { name: "Jeans", category: "Clothing", price: 60 * 17.93, image: "photos/jean.jpg" },
    { name: "Table", category: "Home", price: 150 * 17.93, image: "photos/table.avif" }
];


const productGrid = document.getElementById('productGrid');
const categorySelect = document.getElementById('category');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const clearFiltersButton = document.getElementById('clearFilters');
const sortPriceSelect = document.getElementById('sortPrice');

// Function to display products
function displayProducts(filteredProducts) {
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="price">R${product.price}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to sort products by price
function sortProducts(productsToSort) {
    const sortValue = sortPriceSelect.value;

    if (sortValue === 'asc') {
        return productsToSort.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'desc') {
        return productsToSort.sort((a, b) => b.price - a.price);
    }

    return productsToSort; // Return unsorted if "none" is selected
}

// Function to filter products
function filterProducts() {
    const selectedCategory = categorySelect.value;
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;

    let filteredProducts = products.filter(product => {
        return (selectedCategory === 'all' || product.category === selectedCategory) &&
               product.price >= minPrice &&
               product.price <= maxPrice;
    });

    // Sort products before displaying
    filteredProducts = sortProducts(filteredProducts);

    displayProducts(filteredProducts);
}

// Function to clear filters
function clearFilters() {
    categorySelect.value = 'all';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortPriceSelect.value = 'none'; // Reset sorting to "none"
    displayProducts(products);
}

// Event Listeners
categorySelect.addEventListener('change', filterProducts);
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);
clearFiltersButton.addEventListener('click', clearFilters);
sortPriceSelect.addEventListener('change', filterProducts);

// Initial Display of All Products
displayProducts(products);
