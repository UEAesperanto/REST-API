const express = require('express');
asocio = require('../controllers/routes/asocio');
const app = express();

// Asocio routes
app.route('/')
    .get(asocio.getAsocioj);
app.route('/id/:id')
    .get(asocio.getAsocio);

app.route('/tejo')
    .get(asocio.getTejoAsocioj);
app.route('/tejo/:id')
    .get(asocio.getTejoAsocio);

module.exports = app;
