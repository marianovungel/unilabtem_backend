const mongoose = require('mongoose')

const DesapegoSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    photo:{
        type:String,
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
},
    {timestamps: true}
);

module.exports = mongoose.model("Desapego", DesapegoSchema);