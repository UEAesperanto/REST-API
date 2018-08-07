const express = require('express');
kongreso = require('../controllers/kongreso');
const app = express();

var router = express.Router();

// kongreso routes
app.use('/', router);

app.route('/')
    .get(kongreso.getKongresoj);
app.route('/:id(\\d+)')
    .get(kongreso.getKongreso);
router.route('/:id(\\d+)/kromaj/')
    .get(kongreso.getKromaj);
router.route('/:id(\\d+)/aligxintoj')
    .get(kongreso.getAligxintoj);
router.route('/:id(\\d+)/aligxkotizoj')
    .get(kongreso.getAligxkotizoj);
router.route('/:id(\\d+)/programeroj')
    .get(kongreso.getProgrameroj);
router.route('/:id(\\d+)/programejoj')
    .get(kongreso.getProgramejoj);
router.route('/programkategorioj')
    .get(kongreso.getProgramkategorioj);


module.exports = app;
