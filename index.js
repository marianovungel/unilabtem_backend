const express = require('express')
const app = express()

//importações
const morgan = require('morgan')
const bodyParser = require('body-parser')
const HelloRouter = require('./routes/Hello.routes.js')
const cors = require('cors')
require('dotenv').config()

//conectar ao Bongodb Atlas
require('./services/database')

//middlewares
app.use(morgan())
app.use(bodyParser.json())
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors())
    next();
})
app.use(cors())

//routas
app.get("/", (req, res)=>{ res.send("Requisição não autorizada!") })
app.use("/hello", HelloRouter)

//inicializar o app
const PORT=process.env.PORT
app.listen(PORT, console.log("Servidor Inicializado!"))