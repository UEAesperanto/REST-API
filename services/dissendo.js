const express = require('express');
var dissendo = require('../controllers/dissendo');
const app = express();

// Asocio routes

//Apenas para administradores gerais ou de comunicação
app.route('/')
    .get(dissendo.getDissendoj)
    .post(dissendo.postDissendo);

app.route('/:id(\\d+)/')
    .get(dissendo.getDissendo);

app.route('/retlistoj')
     //Público
    .get(dissendo.getRetlistoj)
    //Apenas para administradores gerais ou de comunicação
    .post(dissendo.postRetlisto);

app.route('/retlistoj/:id(\\d+)')
    .delete(dissendo.deleteRetlisto)

//Qualquer um pode acessar
app.route('/retlistoj/:id/abonantoj')
    .post(dissendo.postAbonanto)

app.route('/retlistoj/:id(\\d+)/abonantoj/:idAbonanto(\\d+)')
    .delete(dissendo.deleteAbonanto);

module.exports = app;
