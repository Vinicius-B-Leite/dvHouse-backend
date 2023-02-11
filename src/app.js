import  express from  'express'
import routes from './routes'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

class App {
    constructor() {
        this.server = express()
        mongoose.set("strictQuery", true)
        mongoose.connect('mongodb+srv://vinicius:viniciusbl21@cluster0.5n8cxvx.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(cors())
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server