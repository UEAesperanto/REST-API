const express = require('express');
kongreso = require('../controllers/routes/kongreso');
const app = express();

var router = express.Router();

// kongreso routes
app.use('/', router);

app.route('/')
    .get(kongreso.getKongresoj);
app.route('/:id')
    .get(kongreso.getKongreso);
router.route('/:id/kromaj/')
    .get(kongreso.getKromaj);

module.exports = app;
