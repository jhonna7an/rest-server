const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //BD
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        // Perseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    async routes(){
        this.app.use('/api/usuarios', require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;