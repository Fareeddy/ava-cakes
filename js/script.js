// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navActions = document.querySelector(".nav-actions");

if (menuToggle && navLinks && navActions) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        navActions.classList.toggle("show");
    });
}


// =========================
// FADE ANIMATION
// =========================

const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    });

    fadeElements.forEach(element => observer.observe(element));

}


// =========================
// CART SETUP
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartCount = 0;

cart.forEach(item => {
    cartCount += item.quantity;
});

const cartCounter = document.getElementById("cart-count");
const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkoutBtn");

if (cartCounter) {
    cartCounter.textContent = cartCount;
}

displayCart();

// =========================
// ADD TO CART
// =========================

document.querySelectorAll(".add-cart-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        if (!card) return;

        const name = card.querySelector("h3").textContent;
        const price = card.querySelector(".price").textContent;

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        cartCount++;

        if (cartCounter) {
            cartCounter.textContent = cartCount;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

        showToast(`${name} added to cart 🛒`);

    });

});

// =========================
// DISPLAY CART
// =========================

function displayCart() {

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const price = Number(item.price.replace(/[₦,]/g, ""));

        total += price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>${item.price}</p>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                ❌ Remove
            </button>

            <hr>

        </div>
        `;

    });

    cartTotal.textContent = "₦" + total.toLocaleString();

}



// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cartCount -= cart[index].quantity;

    cart.splice(index, 1);

    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}



// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    cartCount++;

    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}



// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

        cartCount--;

    } else {

        cartCount--;

        cart.splice(index, 1);

    }

    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}
// =========================
// OPEN CART
// =========================

if (cartBtn && cartSidebar) {

    cartBtn.addEventListener("click", () => {
        cartSidebar.classList.add("active");
    });

}


// =========================
// CLOSE CART
// =========================

if (closeCart && cartSidebar) {

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

}



// =========================
// CHECKOUT
// =========================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const customerName = document.getElementById("customerName");
        const customerPhone = document.getElementById("customerPhone");
        const customerAddress = document.getElementById("customerAddress");

        if (!customerName || !customerPhone || !customerAddress) {
            alert("Checkout form not found.");
            return;
        }

        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();
        const address = customerAddress.value.trim();

        if (!name || !phone || !address) {
            alert("Please complete all your details.");
            return;
        }

        let total = 0;

        let message = "🍰 *AVA CAKES ORDER* 🍰\n\n";

        message += `👤 Name: ${name}\n`;
        message += `📞 Phone: ${phone}\n`;
        message += `📍 Address: ${address}\n\n`;

        message += "*Order Details:*\n";

        cart.forEach(item => {

            const price = Number(item.price.replace(/[₦,]/g, ""));

            total += price * item.quantity;

            message += `• ${item.name} x${item.quantity} - ₦${(price * item.quantity).toLocaleString()}\n`;

        });

        message += `\n💰 Total: ₦${total.toLocaleString()}`;

        window.open(
            `https://wa.me/2349030504430?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

}



// =========================
// TOAST
// =========================

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => toast.remove(), 300);

    }, 2000);

}



// =========================
// SEARCH PRODUCTS
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}

window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    if(loader){
        loader.classList.add("hide");
    }
});

// ==================
// BACK TO TOP   
// ==================
const backToTop = document.getElementById("backToTop")

if(backToTop){
    window.addEventListener("scroll", () =>{

        if(window.scrollY > 300){
            backToTop.classList.add("show");
        }else{
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click",() =>{
        window.scrollTo({
            top:0,
            behaviour:"smooth"
        });
    });
}





























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































