const express = require('express');
var config = require('../controllers/config');
const app = express();

// config routes
app.route('/:config')
    .get(config.getConfig);

module.exports = app;
