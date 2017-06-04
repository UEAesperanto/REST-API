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
router.route('/:id/aligxintoj')
    .get(kongreso.getAligxintoj);
router.route('/:id/aligxkotizoj')
    .get(kongreso.getAligxkotizoj);

module.exports = app;
