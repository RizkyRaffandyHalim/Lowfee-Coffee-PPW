console.log('toast js loaded')
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  
  setTimeout(() => {
    toast.className = "toast";
  }, 2000);
}
window.showToast = showToast;