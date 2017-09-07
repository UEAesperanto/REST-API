const express = require('express');
lando = require('../controllers/routes/lando');
const app = express();

// Lando routes
app.route('/')
    .get(lando.getLandoj)
    .post(lando.postLando);
app.route('/:id')
    .get(lando.getLando)
    .delete(lando.deleteLando);
    
module.exports = app;
