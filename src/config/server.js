import express from 'express'
import routes from '../routes'
import bodyParser from 'body-parser'

const server = express()

// body parser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// Inicia rotas da aplicação
routes(server)


export default server