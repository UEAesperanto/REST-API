const express = require('express');
peranto = require('../controllers/peranto');
const app = express();

// Asocio routes

app.route('/')
    .get(peranto.getPerantoj);

module.exports = app;
