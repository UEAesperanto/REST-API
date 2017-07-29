const express = require('express');
peranto = require('../controllers/routes/peranto');
const app = express();

// Asocio routes

app.route('/')
    .get(peranto.getPerantoj);

module.exports = app;
