console.log('login js loaded')
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = [
    { username: "user", password: "user123", role: "buyer" },
    { username: "seller", password: "seller123", role: "seller" }
  ];

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    alert(`Welcome, ${foundUser.role}!`);
    if (foundUser.role === "buyer") {
      window.location.href = "index.html"; 
    } else {
      window.location.href = "seller_dashboard.html";
    }
  } else {
    alert("Invalid username or password!");
  }
});
