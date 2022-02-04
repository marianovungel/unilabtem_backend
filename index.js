const express = require('express')
const app = express()

//importações
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

//conectar ao Bongodb Atlas
require('./services/database')

//middlewares
app.use(morgan())
app.use(bodyParser.json())

//routas
app.get("/", (req, res)=>{ res.send("Requisição não autorizada!") })

//inicializar o app
const PORT=process.env.PORT
app.listen(PORT, console.log("Servidor Inicializado!"))