var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Token inválido!")
            req.user=user;
            next();
        })
    }else{
        return res.status(401).json("Não estás autenticado!")
    }
}

const verifyTokenAndAuthorization =  (req, res, next)=>{
    verifyToken(req, res, async ()=>{
        // var produtId = await Produto.findById(req.params.id)
        const produtId = req.body.userId;
        if(req.user.id === produtId){
            next();
        }else{
            return res.status(403).json("Deixe de Roubo!")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if( req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("Não estás autorizado!")
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization};