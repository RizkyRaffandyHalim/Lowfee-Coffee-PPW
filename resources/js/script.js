// 🛍️ Sample product data
console.log('script js loaded')
const products = [
  { name: "Caramel Cold Brew", category: "coffee", price: 1.95, image: "images/caramel.jpg" },
  { name: "Espresso", category: "coffee", price: 1.50, image: "images/coffeecup.jpg" },
  { name: "Matcha Latte", category: "non-coffee", price: 1.75, image: "images/matchalatte.jpg" },
  { name: "Chocolate Milk", category: "non-coffee", price: 1.60, image: "images/matcha.jpg" },
  { name: "Sandwich", category: "snacks", price: 2.50, image: "images/sandwich.jpg" },
  { name: "Croissant", category: "snacks", price: 2.20, image: "images/pastries.jpg" }
];

// 🎨 Target container
const productList = document.getElementById("product-list");

// 🧩 Render products
function renderProducts(category = "all") {
  productList.innerHTML = "";
  products
    .filter(p => category === "all" || p.category === category)
    .forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.style.backgroundImage = `url(${p.image})`;
      card.innerHTML = `
        <div class="product-overlay">
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <button class="wishlist-btn">♡ Add to Wishlist</button>
        </div>
      `;
      productList.appendChild(card);
    });
}

// 🧃 Category filter buttons
const buttons = document.querySelectorAll(".filter-buttons button");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

// 🚀 Initialize
renderProducts();
