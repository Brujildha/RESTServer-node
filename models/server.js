const express = require('express')
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        // conect to database
        this.conectDB();
        // Middleware
        this.middleware();
        //routes of my application
        this.routes();
    }

    middleware() {
        //CORS
        this.app.use(cors());
        // read and parse body of the request
        this.app.use(express.json());
        //public methods
        this.app.use(express.static('public'));
    }

    async conectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;