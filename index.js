const express = require('express')
const app = express()

//importações
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

//conectar ao Bongodb Atlas


//middlewares
app.use(morgan())
app.use(bodyParser.json())

//routas
app.get("/", (req, res)=>{ res.send("Requisição não autorizada!") })

//inicializar o app
app.listen("8000", console.log("Servidor Inicializado!"))