import * as Hapi from 'hapi'
import * as Routes from './routes/index';

const validate = function (decoded, request, callback) {
    const credentials = {
        ...decoded,
        user_id: decoded.sub
    }
    return callback(null, true, credentials);
};

export function init() {
    const server = new Hapi.Server()

    server.connection({
        port: 4000,
        routes: {
            cors: true
        }
    })

    const plugins = [require('hapi-auth-jwt2')]

    server.register(plugins, function (err) {
        if (err) {
            throw err;
        }

        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_SECRET,
            validateFunc: validate,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });

        Routes.init(server)

        return server
    })


    return server
}