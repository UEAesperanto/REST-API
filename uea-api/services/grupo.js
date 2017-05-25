const express = require('express');
grupo = require('../controllers/routes/grupo');
const app = express();

// Asocio routes

app.route('/')
    .get(grupo.getGrupoj);
app.route('/:id')
    .get(grupo.getGrupo);

module.exports = app;
