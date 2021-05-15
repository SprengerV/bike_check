const jwks = require('jwks-rsa');
require('dotenv').config();

const auth0Url = 'https://' + process.env.AUTH0_DOMAIN + '/';

const jwtConfig = {
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: false,
        jwksUri: auth0Url + '.well-known/jwks.json'
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: auth0Url,
    algorithms: ['RS256']
};

module.exports = jwtConfig;