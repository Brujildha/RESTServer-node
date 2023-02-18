const { response } = require('express');

const { Product } = require('../models');

const productsGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({ active: true }),
        Product.find({ active: true })
            .populate('user', 'username')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.json({
        total,
        products
    })
}
const productGet = async (req, res = response) => {
    const id = req.params.id;

    const product = await Product.findById({ _id: id, active: true })
        .populate('user', 'username')
        .populate('category', 'name');

    if (!product) {
        res.status(400).json({
            message: `Product not ${id} exist`
        })
    }

    res.json({
        message: 'put product routes - controller',
        product
    })
}
const productPost = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const ExistsProduct = await Product.findOne({ name });
    if (ExistsProduct) {
        res.status(400).json({
            message: `Product ${name} exist`
        })
    }

    const product = new Product(
        {
            ...req.body,
            name,
            user: req.user._id,
        }
    );

    await product.save();

    res.status(200).json({
        message: 'post product routes - controller',
        product
    })
}
const productPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, active, user, ...args } = req.body;
    args.name = args.name?.toUpperCase();
    args.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, args);

    res.json({
        message: 'put product routes - controller',
        product
    })
}
const productDelete = async (req, res = response) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, { active: false });
    const userAuth = req.user;

    res.json({
        product,
        userAuth
    })
}

module.exports = {
    productsGet,
    productPost,
    productPut,
    productDelete,
    productGet
}