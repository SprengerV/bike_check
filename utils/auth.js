const jwt = require('express-jwt');
const jwtConfig = require('../config/jwt');

const withAuth = jwt(jwtConfig);

module.exports = withAuth;