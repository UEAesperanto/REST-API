const express = require('express');
var asocio = require('../controllers/asocio');
const app = express();

// Asocio routes

app.route('/')
    .get(asocio.getAsocioj);
app.route('/:id')
    .get(asocio.getAsocio);

module.exports = app;
