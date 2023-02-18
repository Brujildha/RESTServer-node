const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const collectionValid = [
    'users',
    'categories',
    'products',
    'roles'
];
let query = '';

const searchUsers = async (value = '', res = response) => {
    const isMongoId = ObjectId.isValid(value);
    if (isMongoId) {
        query = await User.findById(value);
        return res.json({
            results: (query) ? [query] : []
        });
    } else {
        const regex = new RegExp(value, 'i')
        query = await User.find({
            $or: [{ username: regex }, { email: regex }],
            $and: [{ active: true }]
        })
    }

    return res.json({
        results: (query) ? [query] : []
    });
}
const searchCategories = async (value = '', res = response) => {
    const isMongoId = ObjectId.isValid(value);
    if (isMongoId) {
        query = await Category.findById(value);
        return res.json({
            results: (query) ? [query] : []
        });
    } else {
        const regex = new RegExp(value, 'i')
        query = await Category.find({
            $and: [{ name: regex }, { active: true }]
        })
            .populate('user', 'username');
    }

    return res.json({
        results: (query) ? [query] : []
    });
}
const searchProducts = async (value = '', res = response) => {
    const isMongoId = ObjectId.isValid(value);
    if (isMongoId) {
        query = await Product.findById(value);
        return res.json({
            results: (query) ? [query] : []
        });
    } else {
        const regex = new RegExp(value, 'i')
        query = await Product.find({
            $or: [{ name: regex }, { description: regex }],
            $and: [{ active: true }]
        })
            .populate('user', 'username')
            .populate('category', 'name');
    }

    return res.json({
        results: (query) ? [query] : []
    });
}

const search = async (req, res = response) => {
    const { collection, value } = req.params;
    try {

        if (!collectionValid.includes(collection)) {
            res.status(400).json({
                message: `Collection admit ${collectionValid}`
            })
        }

        switch (collection) {
            case 'users':
                searchUsers(value, res);
                break;
            case 'categories':
                searchCategories(value, res);
                break;
            case 'products':
                searchProducts(value, res);
                break;

            default:
                res.status(500).json({
                    message: 'Collection not found'
                })
                break;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something failed'
        });
    }
}

module.exports = {
    search
}