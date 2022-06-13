const express = require('express')
const router = express.Router()
const Produto = require("../models/produto")
const _ = require("underscore")

//create post
router.post('/', async (req, res) => {
    try{
        const post = req.body;
        const response = await new Produto(post).save();
        res.json({error: false, post: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})

//Update user
router.put('/:id', async (req, res) => {
    try{
        const post = await Produto.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const id = req.params.id;
                const novo_post = req.body;
                const posts = await Produto.findByIdAndUpdate(id, novo_post);
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
        const post = await Produto.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await Produto.findByIdAndDelete(req.params.id);
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
        const post = await Produto.findById(id);
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})
router.post("/search", async(req, res)=>{
    try{
        const search = await Produto.find({ title: req.body.title});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//get all post
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let postsAll;
        if(username){
            postsAll = await Produto.find({username})
        }else if(catName){
            postsAll = await Produto.find({categories:{
                $in:[catName]
            }})
        }else{
            postsAll = await Produto.find();
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;