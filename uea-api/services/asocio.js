const express = require('express');
asocio = require('../controllers/routes/asocio');
const app = express();

// Asocio routes

app.route('/')
    .get(asocio.getAsocioj);
app.route('/id/:id')
    .get(asocio.getAsocio);
app.route('/lando/:id')
    .get(asocio.getLandoAsocio);
app.route('/tejo')
    .get(asocio.getTejoAsocioj);
app.route('/tejo/:id')
    .get(asocio.getTejoAsocio);
app.route('/uea')
    .get(asocio.getUeaAsocioj);
app.route('/uea/:id')
    .get(asocio.getUeaAsocio);

module.exports = app;
