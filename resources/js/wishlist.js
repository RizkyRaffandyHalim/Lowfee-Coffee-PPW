document.addEventListener('DOMContentLoaded', () => {
  console.log('Wishlist JS loaded ✅')

  const csrfToken = document.querySelector('meta[name="csrf-token"]').content

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
          btn.closest('.wishlist-card').remove()
          alert('Item berhasil dihapus ✅')
        } else {
          alert('Gagal menghapus item ❌ (server error)')
        }
      } catch (err) {
        console.error(err)
        alert('Terjadi kesalahan koneksi ❌')
      }
    })
  })
})
