const { Router } = require('express');
const { check } = require('express-validator');

const { existsCategoryId } = require('../helpers/db-validators');

const { categoryPost,
    categoryDelete,
    categoryPut,
    categoriesGet,
    categoryGet
} = require('../controller/categories');

const { validateJWT,
    validateFields,
    hasRole
} = require('../middlewares');

const router = Router();

router.get('/', categoriesGet);

router.get('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsCategoryId),
    validateFields
], categoryGet);

router.post('/', [
    validateJWT,
    check('name', 'required').notEmpty(),
    validateFields
], categoryPost);

router.put('/:id', [
    validateJWT,
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsCategoryId),
    check('name', 'name required').notEmpty(),
    validateFields
], categoryPut);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsCategoryId),
    validateFields
], categoryDelete);

module.exports = router;