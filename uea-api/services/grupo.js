const express = require('express');
grupo = require('../controllers/routes/grupo');
const app = express();

var router = express.Router();

// Asocio routes
app.use('/', router);

app.route('/')
    .get(grupo.getGrupoj);
app.route('/:id')
    .get(grupo.getGrupo);
router.route('/laboroj/')
    .get(grupo.getLaborgrupoj);
router.route('/laboroj/estraranoj')
    .get(grupo.getEstraranoj);
router.route('/laboroj/komitatanoj')
    .get(grupo.getKomitatanoj);
router.route('/laboroj/komisionoj')
    .get(grupo.getKomisionoj);
module.exports = app;
