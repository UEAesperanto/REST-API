const express = require('express');
var dissendo = require('../controllers/dissendo');
const app = express();

// Asocio routes

//Apenas para administradores gerais ou de comunicação
app.route('/')
    .get(dissendo.getDissendoj)
    .post(dissendo.postDissendo);

app.route('/retlistoj')
     //Público
    .get(dissendo.getRetlistoj)
    //Apenas para administradores gerais ou de comunicação
    .delete(dissendo.deleteRetlisto)
    .post(dissendo.postRetlisto);

//Qualquer um pode acessar
app.route('/retlistoj/:id/abonantoj')
    .post(dissendo.postAbonanto)
    .delete(dissendo.deleteAbonanto);


module.exports = app;
