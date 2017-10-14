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

app.route('/:id(\\d+)')
    .get(grupo.getGrupo)
    .delete(routerAuth, grupo.deleteGrupo)
    .put(routerAuth, grupo.updateGrupo);

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
    .get(grupo.getAldonaMembrecgrupo)
    .post(routerAuth, grupo.postRefAldonmembreco);

router.route('/:id(\\d+)/anoj')
    .post(grupo.postAneco);

router.route('/anecoj')
  .get(routerAuth, aneco.getAnecoj);
router.route('/anecoj/:id/aprobi')
  .post(routerAuth, aneco.aprobiAnecon);

router.route('/:id(\\d+)/kotizoj')
    .get(aneco.getKotizoj)
    .post(routerAuth, aneco.postKotizo)
    .put(routerAuth, aneco.updateKotizo);

module.exports = app;
