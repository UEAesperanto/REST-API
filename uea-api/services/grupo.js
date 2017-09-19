const express = require('express');
const app = express();

//controllers
var grupo = require('../controllers/routes/grupo');
var aligxkotizo = require('../controllers/routes/aligxkotizo');

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

router.route('/:id(\\d+)/kotizoj')
    .get(aligxkotizo.getAligxKotizoj)
    .post(routerAuth, aligxkotizo.postAligxkotizo);

module.exports = app;
