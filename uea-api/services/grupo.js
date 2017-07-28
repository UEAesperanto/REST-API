const express = require('express');
grupo = require('../controllers/routes/grupo');
const app = express();

var router = express.Router();

// Asocio routes
app.use('/', router);

app.route('/')
    .get(grupo.getGrupoj);
app.route('/:id(\\d+)')
    .get(grupo.getGrupo);

router.route('/laboroj/')
    .get(grupo.getLaborgrupoj);

router.route('/laboroj/:id/anoj')
    .get(grupo.getLaboranoj);

router.route('/membrecoj')
    .get(grupo.getMembrecgrupoj);
router.route('/membrecoj/:id(\\d+)')
    .get(grupo.getMembrecgrupo);

router.route('/membrecoj/aldonoj/')
    .get(grupo.getAldonaMembrecgrupoj);
router.route('/membrecoj/aldonoj/:id(\\d+)')
    .get(grupo.getAldonaMembrecgrupo);

router.route('/:id(\\d+)/anoj')
    .post(grupo.postAneco);


router.route('/membrecoj/:id(\\d+)/kotizoj')
    .get(grupo.getAligxKotizoj);

module.exports = app;
