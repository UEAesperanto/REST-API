const express = require('express');
asocio = require('../controllers/routes/asocio');
const app = express();

// Lando routes
app.route('/')
    .get(asocio.getAsocioj);
app.route('/:id')
    .get(asocio.getAsocio);

module.exports = app;
