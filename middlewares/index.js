const validatorJWT = require('./validate-jwt');
const validatorRoles = require('./validate-roles');
const validatorFields = require('./validate-fields');

module.exports = {
    ...validatorJWT,
    ...validatorRoles,
    ...validatorFields
}