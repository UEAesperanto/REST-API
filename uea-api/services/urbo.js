const express = require('express');
urbo = require('../controllers/urbo');
const app = express();

// Asocio routes

app.route('/')
    .get(urbo.getUrboj);
app.route('/:id')
    .get(urbo.getUrbo);

module.exports = app;
