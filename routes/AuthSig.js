const express = require('express')
const router = express.Router()
const api = require("../services/apiSigLogin.js").pedido
const aUser = require("../services/apiSigLogin.js").userget
var jwt = require('jsonwebtoken');
var UserSig = require('../models/UserSig.js')

router.post("/login", async(req, res)=>{
    try{
        
        var user = req.body;
        if(!user.login || !user.senha ){
            return {message: 'Os dois campos são obrigatórios...'}
        }
        var getUser = null
        var newTolk = null
        var verificaFalse = false
        
        newTolk = await api(user)
        if(newTolk.error === true){
            res.status(200).json({message: "usuário não existente!"})
            // return {status: 200, message: "ESTE USUÀRIO Não EXISTE!"}
        }else{
            getUser = await aUser(newTolk.data.access_token)
        }
        const verifyAccante = await UserSig.findOne({
            username: user.login,
            email: getUser.data[0].email
        })
        if(verifyAccante){
            const accessToken = jwt.sign({
                id: verifyAccante._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...verifyAccante._doc, accessToken});
        }else{
            const nerUser = new UserSig({
                username: user.login,
                email: getUser.data[0].email,
                whatsapp: "(xx)-xxxxx-xxxx",
                profilePic: "74d5d28e4db58837d16d30eb57d8e8e6"
            });

            const AuthUser = await nerUser.save();

            const accessToken = jwt.sign({
                id: AuthUser._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...AuthUser._doc, accessToken});
        }
        
    }catch(err){
        
        res.status(400).json({error: true, message: err.message});
    }
    
});


module.exports = router;