const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB_CNN);

        console.log('Connected to Mongo');

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Mongo');
    }
}

module.exports = dbConnection;