const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

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
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({ username: req.body.username});
        !user && res.status(400).json("credencial errada");

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

module.exports = router;