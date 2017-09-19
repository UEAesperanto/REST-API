const express = require('express');
faktemo = require('../controllers/faktemo');
const app = express();

app.route('/')
    .get(faktemo.getFaktemo);

module.exports = app;
