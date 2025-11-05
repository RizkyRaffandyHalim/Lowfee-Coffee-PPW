import type { HttpContext } from '@adonisjs/core/http'

export default class TestController {
    async index({view}:HttpContext){
        return view.render('pages/test')
    }
}