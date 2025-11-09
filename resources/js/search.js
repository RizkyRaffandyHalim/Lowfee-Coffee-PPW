console.log("Search script loaded!");
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("navSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (!searchInput || !resultsBox) return;

  let allItems = [];

  const cards = document.querySelectorAll(".card, .category-card, .product-card");
  if (cards.length > 0) {
    const seen = new Set();
    cards.forEach(el => {
      const name = el.querySelector("h3, p, span")?.textContent.trim();
      if (!name || seen.has(name)) return;
      seen.add(name);

      const link = el.querySelector("a")?.getAttribute("href") || "#";
      const bgImage = el.style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
      const image = bgImage ? bgImage[1] : el.querySelector("img")?.src || null;

      allItems.push({ name, link, image });
    });
  }

  if (allItems.length === 0) {
    allItems = [
      { name: "Caramel Cold Brew", link: "products.html#caramel", image: "images/caramel.jpg" },
      { name: "Matcha Latte", link: "products.html#matcha", image: "images/matchalatte.jpg" },
      { name: "Sandwich", link: "products.html#sandwich", image: "images/sandwich.jpg" }
    ];
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    resultsBox.innerHTML = "";

    if (!query) {
      resultsBox.style.display = "none";
      return;
    }

    const filtered = allItems.filter(item => item.name.toLowerCase().includes(query));

    if (filtered.length === 0) {
      resultsBox.innerHTML = `<div class="search-result-item">No results found</div>`;
    } else {
      filtered.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("search-result-item");
        div.innerHTML = `
          ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:30px; height:30px; border-radius:5px; margin-right:8px;">` : ""}
          ${item.name}
        `;
        div.addEventListener("click", (event) => {
          event.stopPropagation();
          window.location.href = item.link;
        });
        resultsBox.appendChild(div);
      });
    }

    resultsBox.style.display = "block";
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-bar-nav")) {
      resultsBox.style.display = "none";
    }
  });

  document.querySelectorAll(".header-icons a").forEach(icon => {
    icon.addEventListener("click", (e) => e.stopPropagation());
  });
});
