const { Schema, model } = require('mongoose');

const CategoryShema = Schema({
    name: {
        type: String,
        required: [true, 'Category must be'],
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

CategoryShema.methods.toJSON = function () {
    const { __v, active, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategoryShema);