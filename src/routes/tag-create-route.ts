import * as Hapi from 'hapi'
import * as tagService from '../services/tag-service'

export default function (server: Hapi.Server) {

    server.route({
        method: 'get',
        path: '/tags/create',
        handler(request: Hapi.Request, reply: Hapi.IReply) {
            tagService.create()
                .then(reply);
        }
    })

}

