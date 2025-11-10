document.addEventListener('DOMContentLoaded', () => {
  console.log('Wishlist JS loaded ✅')

  const csrfToken = document.querySelector('meta[name="csrf-token"]').content

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container')
    const toast = document.createElement('div')
    toast.classList.add('toast', type)
    toast.innerHTML = `
      <i class="fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
      <span>${message}</span>
    `
    container.appendChild(toast)

    setTimeout(() => toast.classList.add('show'), 100)

    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => toast.remove(), 500)
    }, 3000)
  }

  const removeButtons = document.querySelectorAll('.remove-btn')
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      const wishlistId = btn.dataset.id

      try {
        const response = await fetch(`/wishlist/${wishlistId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        })

        if (response.ok) {
          const cardToRemove = btn.closest('.wishlist-card')
          cardToRemove.remove()
          showToast('Item berhasil dihapus ✅', 'success')

          const wishlistContainer = document.getElementById('wishlistItems')
          const remainingCards = wishlistContainer.querySelectorAll('.wishlist-card').length

          if (remainingCards === 0) {
            wishlistContainer.remove()

            const emptyStateHTML = `
                <div class="wishlist-empty">
                    <img src="/images/empty wishlist.png" alt="Empty Wishlist" />
                    <p>
                        Belum ada produk di wishlist kamu ☕
                    </p>
                    <a href="/products" class="browse-btn">Lihat Produk</a>
                </div>
            `
            const mainContainer = document.querySelector('.wishlist-container')
            mainContainer.insertAdjacentHTML('beforeend', emptyStateHTML)
          }
        } else {
          showToast('Gagal menghapus item ❌ (server error)', 'error')
        }
      } catch (err) {
        console.error(err)
        showToast('Terjadi kesalahan koneksi ❌', 'error')
      }
    })
  })
})
