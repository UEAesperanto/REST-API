const express = require('express');
uzanto = require('../controllers/routes/uzanto');
const app = express();

// Uzanto routes
app.route('/')
    .get(uzanto.getUzantoj)
    .post(uzanto.postUzanto);
app.route('/:id')
    .get(uzanto.getUzanto);


module.exports = app;
