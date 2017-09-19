const express = require('express');
var admin = require('../controllers/admin');
const app = express();

// Admin routes

app.route('/')
    .post(admin.postAdmin);
app.route('/ensaluti')
    .post(admin.ensaluti);
app.route('/agordita')
    .get(admin.agordita);

module.exports = app;
