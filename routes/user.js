const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controller/user');
const { isValidRole, existsEmail, existsId } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validator');


const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsId),
    check('username', 'username required').notEmpty(),
    check('password', 'Password must be more that 6 words').isLength({ min: 6 }),
    check('email', 'Please enter a valid email address').isEmail(),
    check('email').custom(existsEmail),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.post('/', [
    check('username', 'username required').notEmpty(),
    check('password', 'Password must be more that 6 words').isLength({ min: 6 }),
    check('email', 'Please enter a valid email address').isEmail(),
    check('email').custom(existsEmail),
    check('role').custom(isValidRole),
    validateFields
], userPost);

router.delete('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsId),
    validateFields
], userDelete);

module.exports = router;