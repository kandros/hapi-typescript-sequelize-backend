import * as Hapi from 'hapi'

export default function (server: Hapi.Server) {

    server.route({
        method: 'get',
        path: '/health',
        handler(req, reply) {
            reply({
                uptime: process.uptime()
            })
        }
    })

}

