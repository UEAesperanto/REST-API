const express = require('express');
lando = require('../controllers/routes/lando');
var auth = require('../modules/auth');

const app = express();


var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminPost);
app.use('/', routerAuth);

// Lando routes
app.route('/')
    .get(lando.getLandoj)
    .post(lando.postLando);
app.route('/:id')
    .get(lando.getLando)
    .delete(lando.deleteLando);

module.exports = app;
