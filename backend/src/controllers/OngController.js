// para cada entidade um controller
const crypto = require('crypto'); //cria string random
const connection = require('../database/connection');
module.exports = {

    async index (request, response) {  //metodo listagem de * dados da tabela
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },



async create(request, response) {

 const {name, email, whatsapp, city, uf } = request.body; // quebra em variaveis
     
    const id = crypto.randomBytes(4).toString('HEX'); //gera 4 valores e transf. em HEX

    //executa insert dos dados na tabela
    await connection('ongs').insert({ // await -> espera esse bloco finalizar pra então continuar
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

        return response.json({ id }); //retornar id para o cliente
        
}


};

