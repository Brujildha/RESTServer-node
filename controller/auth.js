const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { createJWT } = require('../helpers/create-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
const googleAuth = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { username, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });
        if (!user) {
            const data = {
                username,
                email,
                password: 'changeme',
                img,
                google: true
            };
            user = new User(data);
            await user.save();

        }

        if (!user.active) {
            return request.status(401).json({
                message: 'User not active'
            })
        }

        const token = await createJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Authentication failed',
            ok: false
        })
    }
}

const updateToken = async (req, res) => {
    const { user } = req;
    const token = await createJWT(user.id);

    res.json({
        user,
        token
    })
}


module.exports = {
    login,
    googleAuth,
    updateToken
}