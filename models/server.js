const express = require('express')
const cors = require ('cors')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        // Middlewares
        this.midlewares()

        // App routes
        this.routes()
    }

    midlewares() {
        // CORS
        this.app.use(cors())

        // Reading and parsing body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() { //endpoints
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at localhost:', this.port)
        })
    }
}


module.exports = Server