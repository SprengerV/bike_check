const jwt = require('express-jwt');
const jwtConfig = require('../config/jwt');

const withAuth = jwt(jwtConfig);
console.log(withAuth);
module.exports = withAuth;