console.log('cart js loaded')
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("cartTotal");

  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalDisplay.textContent = `Rp${total.toLocaleString("id-ID")}`;
  }

  function renderCart() {
    const cart = loadCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p style="text-align:center;">Your cart is empty 😢</p>`;
      totalDisplay.textContent = "Rp0";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-card");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <p>${item.name}</p>
          <p>Rp${item.price.toLocaleString("id-ID")}</p>
          <div class="cart-actions">
            <button class="qty-btn" data-index="${index}" data-change="-1">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-index="${index}" data-change="1">+</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    updateTotal(cart);

    document.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cart = loadCart();
        const i = btn.dataset.index;
        const change = parseInt(btn.dataset.change);
        cart[i].quantity = Math.max(1, cart[i].quantity + change);
        saveCart(cart);
        renderCart();
      });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cart = loadCart();
        cart.splice(btn.dataset.index, 1);
        saveCart(cart);
        renderCart();
      });
    });
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      const image = button.dataset.image;

      let cart = loadCart();
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      saveCart(cart);
      showToast("Item added to cart!");;
    });
  });

  if (cartContainer) renderCart();
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = loadCart();

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      localStorage.setItem("transaction", JSON.stringify(cart));

      window.location.href = "/transaction";
    });
  }
});
