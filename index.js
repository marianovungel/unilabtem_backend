require('dotenv').config()
const express = require('express')
const app = express()

//importações
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
//routes
const authRouter = require("./routes/auth.routes")
const usersRouter = require("./routes/User.routes")
const postsRouter = require("./routes/Produto.routes")
const categoryRouter = require("./routes/Category.routes")
const HelloRouter = require('./routes/Hello.routes.js')


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
app.use("/auth/router", authRouter)
app.use("/hello", HelloRouter)
app.use("/produto", postsRouter)
app.use("/users", usersRouter)
app.use("/categories", categoryRouter)

//inicializar o app
const PORT=process.env.PORT
app.listen(PORT, console.log("Servidor Inicializado!"))