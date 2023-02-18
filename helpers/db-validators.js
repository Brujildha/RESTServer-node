const { Product,
    Category,
    Role,
    User
} = require('../models');

const existsId = async (id = '') => {
    const exists = await User.findById(id);
    if (!exists) {
        throw new Error('Id is not exists');
    }
}

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error('Role is not valid');
    }
}

const existsEmail = async (email = '') => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error('email already exists');
    }
}

const existsCategoryId = async (id = '') => {
    const exists = await Category.findById(id);
    if (!exists) {
        throw new Error('Id  Category is not exists');
    }
}
const existsProductId = async (id = '') => {
    const exists = await Product.findById(id);
    if (!exists) {
        throw new Error('Id is not exists');
    }
}
module.exports = {
    isValidRole,
    existsEmail,
    existsId,
    existsCategoryId,
    existsProductId
}