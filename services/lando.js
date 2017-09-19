//Libraries
const express = require('express');

//controllers
var lando = require('../controllers/lando');

//Modules
var auth = require('../modules/auth');

const app = express();

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdmin);

// Lando routes
app.route('/')
    .get(lando.getLandoj)
    .post(routerAuth, lando.postLando);
app.route('/:id')
    .get(lando.getLando)
    .delete(routerAuth, lando.deleteLando)
    .put(routerAuth, lando.updateLando);

module.exports = app;
