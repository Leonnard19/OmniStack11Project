const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.get('/ongs', OngController.index);  //async/await
routes.post('/ongs', OngController.create); // NOVO

routes.post('/sessions', SessionController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete); // :id recebe o id do caso que quer deletar

//exportar rotas para o index poder utilizar
module.exports = routes;



/**
 * routes.post('/ongs', async (request, response) => { //função assíncrona
ANTIGO -> passou esse método pro controller
});
 */