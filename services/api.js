const axios = require("axios")

const apic = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

const apicUser = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

module.exports = {
    pedido: async(newData)=> {
        const verificadorSigUser = false;
        try{
            const response = await apic.post('/authenticate', newData)
            if(!response){
                verificadorSigUser = false;
                return { error: false, data: verificadorSigUser.data};
            }

            return { error: false, data: response.data};
        }catch(err){
            // return {error: true, message: "teve falha"}
            // res.status(200).json(verificadorSigUser);
            return {error: true, message: verificadorSigUser}
        }
    },

    userget: async(newUser)=>{
        try{
            const response = await apic.get('/bond', {
                headers: {authorization: newUser}
            })

            return { error: false, data: response.data};
        }catch(err){
            return {error: true, message: "teve falha"}
        }
    }
}