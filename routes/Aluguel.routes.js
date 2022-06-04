const express = require('express')
const router = express.Router()
const Aluguel = require("../models/Aluguel")

//create post
router.post('/', async (req, res) => {
    try{
        const aluguel = req.body;
        const response = await new Aluguel(aluguel).save();
        res.json({error: false, desapego: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})
router.post("/search", async(req, res)=>{
    try{
        const search = await Aluguel.find({ title: req.body.title});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/meu", async(req, res)=>{
    try{
        const search = await Aluguel.find({ username: req.body.username});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cat", async(req, res)=>{
    try{
        const search = await Aluguel.find({ categories: req.body.categories});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cidade", async(req, res)=>{
    try{
        const search = await Aluguel.find({ cidade: req.body.cidade});
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
        const post = await Aluguel.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const id = req.params.id;
                const novo_post = req.body;
                const posts = await Aluguel.findByIdAndUpdate(id, novo_post);
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
        const post = await Aluguel.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                // await Desapego.delete(req.params.id);
                await Aluguel.findByIdAndDelete(req.params.id);
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
        const post = await Aluguel.findById(id);
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
            posts = await Aluguel.find({username})
        }else if(catName){
            posts = await Aluguel.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Aluguel.find();
        }
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;