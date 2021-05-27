const jwt = require('express-jwt');
const jwtConfig = require('../config/jwt');
const { PERMISSIONS } = require('./roles');

const withAuth = jwt(jwtConfig);

const requestorIsNotOwner = (objectUserId, requestUser) => {
    return objectUserId !== requestUser.sub;
};

const requestorIsNotAdmin = (requestUser) => {
    return !requestUser.permissions?.includes(PERMISSIONS.ADMIN);
};

module.exports = {withAuth, requestorIsNotOwner, requestorIsNotAdmin}; 