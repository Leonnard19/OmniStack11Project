const express = require('express'); //instanciando o express
const routes = require('./routes'); //referencia o caminho do exports
const cors = require('cors'); //referencia o caminho do exports


const app = express(); //criando um aplicativa que recebe o express
const port = 8000 //porta

//entender q o request está usando json
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(port, () => {                
    console.log(`Rodando na porta ${port}`)
    
});

 /* Metodos HTTP
GET : buscar uma informação do backend
POST: criar uma informação no backend
PUT: alterar uma informação no backend
DELETE: deletar informações no backend

TIPOS DE PARAMETROS

query params: parametros nomeados enviados na rota após "?" (filtros, paginação) ex: '/users?nome=leo' req.query
route params: parametros utilizados para identificar recursos ex: '/users/:id'  -> (web) '/users/1' / buscar user pelo id '/users/:id'
request body: corpo da requisição, utilizado para criar ou alterar recursos


*/


