const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('Token expired or invalid');
            } else {
                resolve(token);
            }
        });
    })

}

const verifyJWT = async (token = '') => {
    try {
        if (token.length <= 10) {
            return null;
        }
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);
        if (user) {
            return user
        }
        else { return null; }

    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = {
    createJWT,
    verifyJWT
}