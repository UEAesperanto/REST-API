const express = require('express');
asocio = require('../controllers/routes/asocio');
const app = express();

// Asocio routes

app.route('/')
    .get(asocio.getAsocioj);
app.route('/:id')
    .get(asocio.getAsocio);

module.exports = app;
