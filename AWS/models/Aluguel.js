const mongoose = require('mongoose')

const AluguelSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    photo1:{
        type:String,
    },
    photo2:{
        type:String,
    },
    photo3:{
        type:String,
    },
    photo4:{
        type:String,
    },
    photo5:{
        type:String,
    },
    userId:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
    },
    userwhatsapp:{
        type:String,
        default: "",
    },
    categories:{
        type:String,
        default: "",
    },
    cidade:{
        type:String,
        default: "",
    },
    cep:{
        type: Object,
        default: "",
    },
    preco:{
        type:Number,
    },
    area:{
        type:Number,
    },
    quarto:{
        type:Number,
    },
    sala:{
        type:Number,
    },
    cozinha:{
        type:Number,
    },
    banheiro:{
        type:Number,
    },
    contrato:{
        type:String,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("Aluguel", AluguelSchema);