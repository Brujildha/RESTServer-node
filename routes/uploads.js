const { Router } = require('express');
const { check } = require('express-validator');

const { collectionAdmit } = require('../helpers');
const { validateFileUpload,
    validateFields
} = require('../middlewares');
const { uploadFile,
    updateFile,
    showImg
} = require('../controller/uploads');

const router = Router();

router.post('/', validateFileUpload, uploadFile);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom(c => collectionAdmit(c, ['users', 'products'])),
    validateFields
], updateFile);

router.get('/:collection/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom(c => collectionAdmit(c, ['users', 'products'])),
    validateFields
], showImg);

module.exports = router;