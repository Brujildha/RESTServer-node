const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/create-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !user.active) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        const passwordValid = bcryptjs.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                message: 'Password not found'
            })
        }

        const token = await createJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something failed'
        });
    }
}

module.exports = {
    login
}