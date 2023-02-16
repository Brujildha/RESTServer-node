const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleAuth } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate-fields');

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

module.exports = router;