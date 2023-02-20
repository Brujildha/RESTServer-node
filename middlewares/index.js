const validatorJWT = require('./validate-jwt');
const validatorRoles = require('./validate-roles');
const validatorFields = require('./validate-fields');
const validatorFileUpload = require('./validate-file');

module.exports = {
    ...validatorJWT,
    ...validatorRoles,
    ...validatorFields,
    ...validatorFileUpload
}