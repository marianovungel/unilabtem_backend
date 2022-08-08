const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

router.post("/register", async(req, res)=>{
    try{
        //usando bcrypt para incriptar a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const nerUser = new User({
            username: req.body.username,
            email: req.body.email,
            whatsapp: req.body.whatsapp,
            password: hashedPass,
        });

        const user = await nerUser.save();
        return res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
    
});

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({ username: req.body.username});
        if(!user){
            return res.status(400).json("credencial errada");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            return res.status(400).json("credencial errada");
        }

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/sendemail", async(req, res)=>{
    try{
        const user = await User.findOne({ email: req.body.to});

        if(!user){
            return res.status(400).json("Não existe usuário cadastrado com este email!");
        }
        if(user){
            
            var codigo = req.body.codigo
            var from = req.body.from
            var to = req.body.to
            var subject = "Reset Password"
            var message = `Olá ${user.username}! Este é o código de verificação do seu email para poder alterar a sua palavra passe. codigo: ${codigo}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'unilabtem@gmail.com',
                pass: 'xruetlpwtoquvnye'
                }
            })

            var mailOptions = {
                from: from,
                to:to,
                subject:subject,
                text:message
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return status(500).json("Algo deu errado no envio do email...");
                } else {
                    console.log("Email Sent: " + info.response)
                  return  res.status(200).json(codigo);
                }
                // response.redirect("/")
            })
        }
        return res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/usersearch", async(req, res)=>{
    try{
        const verdade = true;
        const falsidade = false;
        const user = await User.findOne({ email: req.body.to});

        if(!user){
            return res.status(200).json(falsidade);
        }
        
        return res.status(200).json(verdade);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/checkuser", async(req, res)=>{
    try{
        const verdade = true;
        const falsidade = false;
        const user = await User.findOne({ username: req.body.username});

        if(!user){
            return res.status(200).json(falsidade);
        }
        
        return res.status(200).json(verdade);
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;