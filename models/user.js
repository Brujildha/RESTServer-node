const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: 6
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ['USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'],
        required: [true, 'Role must be'],
        default: 'USER_ROLE'
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Users', UserSchema);