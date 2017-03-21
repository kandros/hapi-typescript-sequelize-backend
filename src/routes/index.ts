import * as Hapi from 'hapi'
import * as glob from 'glob'
import * as path from 'path'

export function init(server: Hapi.Server) {

    glob.sync('**/*-route.*', {
        cwd: __dirname
    }).forEach(file => {
        const route = require(path.join(__dirname, file)).default
        route(server)
    });

}


