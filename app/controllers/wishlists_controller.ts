import Wishlist from '#models/wishlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class WishlistsController {
    async index({view}:HttpContext){
        const wishlists=await Wishlist.query().preload('product')
        return view.render('pages/wishlist', {wishlists})
    }

    async store({request, response}: HttpContext){
        const {productId} = request.only(['productId'])
        const userId=1
        await Wishlist.firstOrCreate({userId, productId})
        return response.redirect('/wishlist')
    }
}