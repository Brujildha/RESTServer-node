const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, extensionValid = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const basename = file.name.split('.');
        const ext = basename[basename.length - 1];

        const extValid = extensionValid;
        if (!extValid.includes(ext)) {
            return reject(`The extension ${ext} is a invalid file extension of these ${extValid}`);
        }
        const nameFile = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameFile);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameFile);
        });
    });
}

module.exports = {
    uploadFiles
}