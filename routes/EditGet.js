const express = require('express')
const router = express.Router()
const Produto = require("../models/produto")
const _ = require("underscore")


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
            postsAll = await Produto.find({
                estado:"visivel"
            });
            // postsAll = await Produto.find({estado:"analise"});
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;