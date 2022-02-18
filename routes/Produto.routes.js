const express = require('express')
const router = express.Router()
const Produto  = require('../models/produto')

router.get("/", async(req, res)=>{
    try{
        const produto = await Produto.find({})
        res.json(produto)
    }catch(err){
        res.json(err)
    }
});
router.get("/get", (req, res)=>{
        res.json("produto")
});

router.get('/:id', async (req, res) => {
    try{
            const id = req.params.id;
            const produto = await Produto.findById(id);
            const others = produto._doc;
            res.status(200).json(others);
        }catch(err){
            res.json({error: true, message: err.message});
        }
});
router.post("/", async(req, res)=>{
    try{
        const produto = req.body;
        const saveproduto = await new Produto(produto).save();
        res.json({error: false, produto: saveproduto})
    }catch(err){
        res.json({error: true, message: err.message})
    }
});
module.exports = router;