const connection = require('../database/connection');

module.exports = {
    async index(request, response){ //listar
        const { page = 1 } = request.query; // ?name=leo
        
        const [count] = await connection('incidents').count(); // conta casos/ retorna array

        //limita 5 registros por pagina
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')    //relacionar dados de uma tabela/ trazer dados junto a tabela incidents
        .limit(5)
        .offset((page - 1) * 5 )
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);    
        //id do caso e da ong estão iguais(log) -> included [] - before ('*') / selecting specific atributes to show on Ong desc.
        response.header('X-Total-Count', count['count(*)']); //retorna a contagem pelo header da pagina

        return response.json(incidents);

    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;


        //id da tabela '' igual o id do parametro
        const incident = await connection('incidents')
        .where('id', id) 
        .select('ong_id')
        .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not Permitted.' });
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();

    },

    async create(request, response) { // criar
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //pega a id passada pelo cabeçalho nomeada authorization

        const [id] = await connection('incidents').insert({ // result
            title,
            description,
            value,
            ong_id,
        }); // inserção utilizando um array/ pegar o id
       // const id = result[0];  //alternativa pra pegar o id
        return response.json({ id })
    }

};

/**
 * nota request.headers 
 * informação do ID logada do usuário é passada pelo cabeçalho da aplicação 
 * (não pelo body), tambem se passa dados da autenticação do usuário, geolocalização
 * dados sobre o idioma, tudo que caracteriza o contexto daquela requisição
 */