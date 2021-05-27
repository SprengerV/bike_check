const jwt = require('express-jwt');
const jwtConfig = require('../config/jwt');
const { PERMISSIONS } = require('./roles')

const withAuth = jwt(jwtConfig);

const requestorIsOwner = (objectUserId, requestUser) => {
    return objectUserId === requestUser.sub;
};

const requestorIsAdmin = (requestUser) => {
    return requestUser.permissions?.includes(PERMISSIONS.ADMIN);
};
module.exports = {withAuth, requestorIsOwner, requestorIsAdmin};