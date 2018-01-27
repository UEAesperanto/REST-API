const express = require('express');
const app = express();

//controllers
var grupo = require('../controllers/grupo');
var aneco = require('../controllers/aneco');

//Modules
var auth = require('../modules/auth');

var router = express.Router();

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdmin);

app.use('/', router);

app.route('/')
    .get(grupo.getGrupoj)
    .post(routerAuth, grupo.postGrupo);

app.route('/kategorioj')
    .get(grupo.getKategorioj);

app.route('/kategorioj/:id/sub')
    .get(grupo.getGrupojKat);

app.route('/kategorioj/:idKat/sub/:idGrupo')
    .delete(routerAuth, grupo.deleteGrupoKat)
    .post(routerAuth, grupo.postRefKatGrupo);

app.route('/:id(\\d+)')
    .get(grupo.getGrupo)
    .delete(routerAuth, grupo.deleteGrupo)
    .put(routerAuth, grupo.updateGrupo);

var routerAuthSen = express.Router();

routerAuthSen.use(auth.authorizeSenKondicxo);
router.route('/:id(\\d+)/anoj')
    .get(routerAuthSen, grupo.getAnoj)
    .post(routerAuthSen, grupo.postAneco);

router.route('/anecoj/:id(\\d+)/aprobi')
    .put(routerAuth, aneco.aprobiAnecon);

router.route('/anecoj/:id(\\d+)')
    .delete(routerAuth, aneco.deleteAneco)
    .put(routerAuth, aneco.updateAneco);

router.route('/:id(\\d+)/kotizoj')
    .get(aneco.getKotizoj)
    .post(routerAuth, aneco.postKotizo)
    .put(routerAuth, aneco.updateKotizo);

module.exports = app;
