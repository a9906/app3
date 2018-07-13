
var express = require('express');
var app = express();
var porta = process.env.PORT || 3000;

var async = require('async');
var ldap = require('ldapjs');


var config = require('./config/configAD.js');
var adt = require('./lib/activedirectory.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));






var Inscricao = require('./models/obj'), // instanciar o modelo de dados definido
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/adroutes');
//importar rotas

routes(app); //registar as rotas
app.listen(porta);

console.log('a executar em:' + porta);