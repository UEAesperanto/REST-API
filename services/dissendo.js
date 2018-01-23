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
<<<<<<< HEAD
    .post(dissendo.postRetlisto);

app.route('/retlistoj/:id(\\d+)')
    .delete(dissendo.deleteRetlisto)
=======
    .delete(dissendo.deleteRetlisto)
    .post(dissendo.postRetlisto);
>>>>>>> master

//Qualquer um pode acessar
app.route('/retlistoj/:id/abonantoj')
    .post(dissendo.postAbonanto)
<<<<<<< HEAD
    
app.route('/retlistoj/:id(\\d+)/abonantoj/:id(\\d+)')
    .delete(dissendo.deleteAbonanto);

=======
    .delete(dissendo.deleteAbonanto);


>>>>>>> master
module.exports = app;
