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
        minlength: 6,
        select: false
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: ['USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'],
        required: [true, 'Role must be'],
        default: 'user_role'
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
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('Users', UserSchema);