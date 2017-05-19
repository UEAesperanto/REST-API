const express = require('express');
faktemo = require('../controllers/routes/faktemo');
const app = express();

app.route('/')
    .get(faktemo.getFaktemo);

module.exports = app;
