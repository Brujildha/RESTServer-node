const { Router } = require('express');
const { check } = require('express-validator');
const { login,
    googleAuth,
    updateToken
} = require('../controller/auth');
const { validateFields,
    validateJWT
} = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'required').isEmail(),
    check('password', 'required').notEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'Token required').notEmpty(),
    validateFields
], googleAuth);

router.get('/', validateJWT, updateToken);


module.exports = router;