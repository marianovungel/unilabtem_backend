const express = require('express')
const router = express.Router()
const api = require("../services/api").pedido
const aUser = require("../services/api").userget
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
var User = require('../models/User.js')

router.post("/login", async(req, res)=>{
    try{
        
        var user = req.body;
        var getUser = null
        var newTolk = null
        var verificaFalse = false
        
        newTolk = await api(user)
        if(newTolk.data === false){
            return { error: false, data: verificaFalse};
        }
        getUser = await aUser(newTolk.data.access_token)
        const verifyAccante = await User.findOne({
            username: getUser.data[0].nome,
            email: getUser.data[0].email
        })
        if(verifyAccante){
            const accessToken = jwt.sign({
                id: verifyAccante._id,
            }, process.env.JWT_SEC)
            
            const {password, ...others} = verifyAccante._doc;
            res.status(200).json({...others, accessToken});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(user.senha, salt)
            const nerUser = new User({
                username: user.login,
                email: getUser.data[0].email,
                whatsapp: "(xx)-xxxxx-xxxx",
                password: hashedPass,
                profilePic: "74d5d28e4db58837d16d30eb57d8e8e6"
            });

            const AuthUser = await nerUser.save();

            const accessToken = jwt.sign({
                id: AuthUser._id,
            }, process.env.JWT_SEC)

            const {password, ...others} = AuthUser._doc;
            res.status(200).json({...others, accessToken});
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
    
});


module.exports = router;