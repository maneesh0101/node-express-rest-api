const expressJwt = require('express-jwt');
const config = require('../../global.config');
//const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secretKey = config.secret;
    return expressJwt({ secret: secretKey, isRevoked: isRevokedCallback }).unless({
        path: [
            // public routes that don't require authentication
            '/authenticate',
            '/users',
            { url: /^\/users\/.*/, methods: ['GET', 'POST', 'PUT', 'DELETE'] },
            '/products',
            { url: /^\/products\/.*/, methods: ['GET'] },
            '/employees',
            { url: /^\/employees\/.*/, methods: ['GET', 'PUT', 'DELETE'] },
            '/crickets',
            { url: /^\/crickets\/.*/, methods: ['GET', 'POST', 'PUT', 'DELETE'] }
        ]
    });
}

async function isRevokedCallback(req, payload, done) {
    /*const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    */

    done();
};
