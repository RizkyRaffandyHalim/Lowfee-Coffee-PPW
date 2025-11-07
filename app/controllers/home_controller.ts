import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class HomeController {
    async index({view}:HttpContext){
        const featured=await Product.query().limit(3)
        return view.render('pages/home', {featured})
    }
}