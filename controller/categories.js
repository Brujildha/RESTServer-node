const { response } = require('express');

const { Category,
    User
} = require('../models');

const categoriesGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({ active: true }),
        Category.find({ active: true })
            .populate('user', 'username')
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.json({
        total,
        categories
    })
}
const categoryGet = async (req, res = response) => {
    const id = req.params.id;

    const category = await Category.findById({ _id: id, active: true })
        .populate('user', 'username');

    if (!category) {
        res.status(400).json({
            message: `Category not ${id} exist`
        })
    }

    res.json({
        message: 'put category routes - controller',
        category
    })
}
const categoryPost = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const ExistsCategory = await Category.findOne({ name });
    if (ExistsCategory) {
        res.status(400).json({
            message: `Category ${name} exist`
        })
    }

    const category = new Category(
        {
            name,
            user: req.user._id
        }
    );

    //save category
    await category.save();

    res.status(200).json({
        message: 'post category routes - controller',
        category
    })
}
const categoryPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, active, user, ...args } = req.body;
    args.name = args.name.toUpperCase();
    args.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, args);

    res.json({
        message: 'put category routes - controller',
        category
    })
}
const categoryDelete = async (req, res = response) => {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(id, { active: false });
    const userAuth = req.user;

    res.json({
        category,
        userAuth
    })
}

module.exports = {
    categoriesGet,
    categoryPost,
    categoryPut,
    categoryDelete,
    categoryGet
}