const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: true[true, 'Role must be']
    }
});

module.exports = model('Role', RoleSchema);