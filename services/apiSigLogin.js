const axios = require("axios")

const apic = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

const apicUser = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

module.exports = {
    pedido: async(newData)=> {
        try{
            const response = await apic.post('/authenticate', newData)
            if(!response){
                throw new error(null)
            }

            return { error: false, data: response.data};
        }catch(err){
            return {error: true, message: err.message}
        }
    },

    userget: async(newUser)=>{
        try{
            const response = await apic.get('/bond', {
                headers: {authorization: newUser}
            })

            return { error: false, data: response.data};
        }catch(err){
            return {error: true, message: "credencias erradas!"}
        }
    }
}