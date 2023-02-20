const { Schema, model } = require('mongoose');

const ProductShema = Schema({
    name: {
        type: String,
        required: [true, 'Product must be'],
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
    },
    price:
    {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    },
});

ProductShema.methods.toJSON = function () {
    const { __v, active, ...data } = this.toObject();
    return data;
}

module.exports = model('Product', ProductShema);