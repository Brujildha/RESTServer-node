
const { response, request } = require('express');
const path = require('path');
const fs = require('fs');
const { uploadFiles } = require('../helpers');
const { Product, User } = require('../models');

const uploadFile = async (req = request, res = response) => {
    try {

        //examples to send files
        //const nameFile = await uploadFiles(req.files, ['txt', 'HEIC'], texto);
        // const nameFile = await uploadFiles(req.files, undefined,img);

        const nameFile = await uploadFiles(req.files);
        res.json({
            nameFile
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}
const updateFile = async (req, res = response) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(404).json({
                    message: `No users were found with id ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(404).json({
                    message: `No product were found with id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                message: 'missing implementation'
            })
    }

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }
    const nameFile = await uploadFiles(req.files, undefined, collection);
    model.img = nameFile;
    await model.save();

    res.json(model);

}

const showImg = async (req, res = response) => {
    const { collection, id } = req.params;
    let model;
    const pathImgNoFound = path.join(__dirname, '../assets', 'no-image.jpeg');
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(404).json({
                    message: `No users were found with id ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(404).json({
                    message: `No product were found with id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                message: 'missing implementation'
            })
    }

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    return res.sendFile(pathImgNoFound);
}

module.exports = {
    uploadFile,
    updateFile,
    showImg
}