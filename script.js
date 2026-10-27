
let cart = [];
let discount = 0;

// Search, filter and sort products
function showProducts() {
    let products = document.querySelectorAll(".product");

    let search = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("category").value;
    let sort = document.getElementById("sort").value;

    let productList = Array.from(products);

    productList.forEach(function(product) {
        let name = product.dataset.name.toLowerCase();
        let type = product.dataset.category;

        if (name.includes(search) &&
            (category === "All" || category === type)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    if (sort === "low") {
        productList.sort((a, b) => a.dataset.price - b.dataset.price);
    }

    if (sort === "high") {
        productList.sort((a, b) => b.dataset.price - a.dataset.price);
    }

    let box = document.getElementById("products");

    productList.forEach(function(product) {
        box.appendChild(product);
    });
}

// Add product to cart
function addToCart(button) {
    let product = button.parentElement;

    let name = product.dataset.name;
    let price = Number(product.dataset.price);

    let item = cart.find(function(item) {
        return item.name === name;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    showCart();
}

// Show cart and calculate price
function showCart() {
    let cartBox = document.getElementById("cart");
    let total = 0;
    let output = "";

    cart.forEach(function(item, index) {
        total += item.price * item.quantity;

        output += `
            <p>
                ${item.name} - ₹${item.price}
                <button onclick="changeQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </p>
        `;
    });

    cartBox.innerHTML = output || "Your cart is empty.";

    document.getElementById("total").innerText = "Total: ₹" + total;

    let finalPrice = total - total * discount;

    document.getElementById("finalTotal").innerText =
        "Final Total: ₹" + finalPrice.toFixed(2);
}

// Increase or decrease quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    showCart();
}

// Remove an item
function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

// Apply 10% discount
function applyCoupon() {
    let code = document.getElementById("coupon").value.toUpperCase();

    if (code === "SAVE10") {
        discount = 0.10;

        document.getElementById("message").innerText =
            "10% discount applied!";
    } else {
        discount = 0;

        document.getElementById("message").innerText =
            "Invalid coupon code.";
    }

    showCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully!");

        cart = [];
        discount = 0;

        document.getElementById("coupon").value = "";
        document.getElementById("message").innerText = "";

        showCart();
    }
}

// Update products when search or filters change
document.getElementById("search").addEventListener("input", showProducts);
document.getElementById("category").addEventListener("change", showProducts);
document.getElementById("sort").addEventListener("change", showProducts);

// Show the cart when the website opens
showProducts();
showCart();
