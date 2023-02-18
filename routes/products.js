const { Router } = require('express');
const { check } = require('express-validator');

const { existsProductId, existsCategoryId } = require('../helpers/db-validators');

const { productPost,
    productDelete,
    productPut,
    productsGet,
    productGet
} = require('../controller/products');

const { validateJWT,
    validateFields,
    hasRole
} = require('../middlewares');

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsProductId),
    validateFields
], productGet);

router.post('/', [
    validateJWT,
    check('name', 'required').notEmpty(),
    check('category', 'required').notEmpty(),
    check('category', 'category is not valid').isMongoId(),
    check('category').custom(existsCategoryId),
    validateFields
], productPost);

router.put('/:id', [
    validateJWT,
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsProductId),
    check('category', 'category is not valid').isMongoId(),
    validateFields
], productPut);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(existsProductId),
    validateFields
], productDelete);

module.exports = router;