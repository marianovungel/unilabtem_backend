const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true,
        // unique:true
    },
    desc:{
        type:String,
        // required:true,
    },
    photo:{
        type:String,
        // required:false,
    },
    username:{
        type:String,
        // required:true,
    },
    preco: {
        type:String,
        // required:false,
        default: "20.01",
    },
    categories:{
        type:String,
        // required:false,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("Produto", ProdutoSchema);