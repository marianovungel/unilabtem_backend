const express = require('express')
const router = express.Router()
const Desapegar = require("../models/Desapego")

//create post
router.post('/', async (req, res) => {
    try{
        const desapego = {
            title:req.body.title,
            desc:req.body.desc,
            photo:req.body.photo,
            username:req.body.username,
            userwhatsapp:req.body.userwhatsapp,
            categories:req.body.categories,
            cep:req.body.cep,
            cidade:req.body.cidade,

        };
        const response = await new Desapegar(desapego).save();
        res.json({error: false, desapego: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})
router.post("/search", async(req, res)=>{
    try{
        const search = await Desapegar.find({ title: req.body.title});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/meu", async(req, res)=>{
    try{
        const search = await Desapegar.find({ username: req.body.username});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cat", async(req, res)=>{
    try{
        const search = await Desapegar.find({ categories: req.body.categories});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cidade", async(req, res)=>{
    try{
        const search = await Desapegar.find({ cidade: req.body.cidade});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//Update user
router.put('/:id', async (req, res) => {
    try{
        const post = await Desapego.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const id = req.params.id;
                const novo_post = req.body;
                const posts = await Desapegar.findByIdAndUpdate(id, novo_post);
                res.json({error: false, posts});
            }catch(err){
                res.json({error: true, message: err.message});  
            }
        }else{
            res.status(500).json("you can update only you post!")
        }
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    try{
        const post = await Desapegar.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                // await Desapego.delete(req.params.id);
                await Desapegar.findByIdAndDelete(req.params.id);
                res.json({error: false, message: "post deletado com sucesso!"});
            }catch(err){
                res.json({error: true, message: err.message});  
            }
        }else{
            res.status(500).json("you can delete only you post!")
        }
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//get post
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Desapegar.findById(id);
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})


//get all post
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Desapegar.find({username})
        }else if(catName){
            posts = await Desapegar.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Desapegar.find();
        }
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;