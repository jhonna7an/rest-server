const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        // Perseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;