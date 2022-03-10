require('dotenv').config()
const express = require('express')
const app = express()

//importações
const morgan = require('morgan')
const path = require("path")
const cors = require('cors')
//routes
const authRouter = require("./routes/auth.routes")
const usersRouter = require("./routes/User.routes")
const postsRouter = require("./routes/Produto.routes")
const categoryRouter = require("./routes/Category.routes")
const HelloRouter = require('./routes/Hello.routes.js')
// const RouterUpload = require('./routes/Post.routes.js')




//conectar ao Bongodb Atlas
require('./services/database')

//middlewares
app.use(morgan('dev'))
app.use(express.json())
const multer = require('multer')
app.use(express.urlencoded({extended: true}))


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(__dirname, "./", "img"));
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    },
    limits:{
        fileSize: 4*1024*1024,
    },
    fileFilter: (req, file, cb)=>{
        const allowedMimes=[
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cd(new error("Invalid file type."))
        }
    }
})


const upload = multer({storage: storage})
app.post("/upload", upload.single("file", (req, res)=>{
    try{
        res.status(200).json("file has been uploaded")
    }catch(err){
        res.json(err)
    }
}))

app.use("/img", express.static(path.resolve(__dirname, "./", "img")))
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "/*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors())
    next();
})
app.use(cors())


//routas
app.get("/", (req, res)=>{ res.send("Requisição não autorizada!") })
// app.use("/", RouterUpload)
app.use("/auth/router", authRouter)
app.use("/hello", HelloRouter)
app.use("/produto", postsRouter)
app.use("/users", usersRouter)
app.use("/categories", categoryRouter)

//inicializar o app
const PORT=process.env.PORT
app.listen(PORT, console.log("Servidor Inicializado!"))