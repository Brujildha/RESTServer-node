const express = require('express')
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
        }
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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;