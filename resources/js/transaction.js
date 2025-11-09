console.log('transaction js loaded')
document.addEventListener("DOMContentLoaded", () => {
  const transactionList = document.getElementById("transaction-list");
  const totalPriceEl = document.getElementById("total-price");

  let transaction = JSON.parse(localStorage.getItem("transaction")) || [];

  function displayTransactions() {
    transactionList.innerHTML = "";
    let total = 0;

    if (transaction.length === 0) {
      transactionList.innerHTML = "<p>No transaction found 😢</p>";
      totalPriceEl.textContent = "Total: Rp.0";
      return;
    }

    transaction.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("transaction-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="transaction-img">
        <div>
          <h3>${item.name}</h3>
          <p>Rp.${item.price} × ${item.quantity}</p>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      transactionList.appendChild(div);
      total += item.price * item.quantity;
    });

    totalPriceEl.textContent = `Total: Rp.${total}`;
  }

  displayTransactions();

  transactionList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      transaction.splice(index, 1);
      localStorage.setItem("transaction", JSON.stringify(transaction));
      displayTransactions();
    }
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (transaction.length === 0) {
      alert("No items to checkout!");
      return;
    }
    alert("Thank you for your purchase!");
    localStorage.removeItem("transaction");
    displayTransactions();
  });
});
