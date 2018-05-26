const express = require('express');
var dissendo = require('../controllers/dissendo');
const app = express();

//Modules
var auth = require('../modules/auth');

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminKomunikisto);

app.route('/')
    .get(routerAuth, dissendo.getDissendoj)
    .post(routerAuth, dissendo.postDissendo);

app.route('/:id(\\d+)/')
    .get(dissendo.getDissendo);

app.route('/retlistoj')
    .get(dissendo.getRetlistoj)
    .post(routerAuth, dissendo.postRetlisto);

app.route('/retlistoj/:id(\\d+)')
    .delete(dissendo.deleteRetlisto)

app.route('/retlistoj/:id(\\d+)/abonantoj')
    .get(routerAuth, dissendo.getAbonantoj)
    .post(dissendo.postAbonanto)

app.route('/retlistoj/:id(\\d+)/abonantoj/:idAbonanto(\\d+)')
    .delete(dissendo.deleteAbonanto);

module.exports = app;
