import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'

export default class MessagesController {
    async index({view}:HttpContext){
        const messages=await Message.all()
        return view.render('pages/home', {messages})
    }

    async store({request, response}:HttpContext){
        const content = request.input('message')
        if (content){
            await Message.create({content})
        }
        return response.redirect('/')
    }
}