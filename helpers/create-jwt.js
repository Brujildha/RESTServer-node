const jwt = require('jsonwebtoken');

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

module.exports = {
    createJWT
}