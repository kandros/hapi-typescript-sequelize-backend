import * as Hapi from 'hapi'
import * as tagService from '../services/tag-service'

export default function (server: Hapi.Server) {

    server.route({
        method: 'get',
        path: '/tags',
        handler(request: Hapi.Request, reply: Hapi.IReply) {
            tagService.findAll()
                .then(reply)
        }
    })

}

