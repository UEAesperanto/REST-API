const express = require('express');
kongreso = require('../controllers/routes/kongreso');
const app = express();

app.route('/')
    .get(kongreso.getKongresoj);
app.route('/:id')
    .get(kongreso.getKongreso);

module.exports = app;
