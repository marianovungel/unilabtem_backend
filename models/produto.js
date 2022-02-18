const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', { 
    nome: {
        type: String,
        required: true,
        default: "produtoNome"
    },
    imagem: {
        type: String,
        required: false,
        default: "img"
    },
    descricao: {
        type: Object,
        required: true,
    },
    preco: {
        type: String,
        required: true,
        default: "R$ 0.00"
    }
});

module.exports = Produto;