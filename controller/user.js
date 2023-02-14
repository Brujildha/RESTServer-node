const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({ active: true }),
        User.find({ active: true })
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    })
}
const userPost = async (req, res = response) => {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });

    //encrypted password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //save user
    await user.save();

    res.json({
        message: 'post routes - controller',
        user
    })
}
const userPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, google, password, email, ...args } = req.body;

    if (password) {
        //encrypted password
        const salt = bcryptjs.genSaltSync(10);
        args.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, args);

    res.json({
        message: 'put routes - controller',
        user
    })
}
const userDelete = async (req, res = response) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, { active: false });
    const userAuth = req.user;

    res.json({
        user,
        userAuth
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}