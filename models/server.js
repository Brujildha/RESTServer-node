const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

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

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;