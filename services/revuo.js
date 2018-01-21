const express = require('express');

//Controllers
var revuo = require('../controllers/revuo');

//Modules
var auth = require('../modules/auth');

const app = express();

var routerAuth = express.Router();

//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);

app.route('/')
    .get(revuo.getRevuoj)
    .post(routerAuth, revuo.postRevuo);

app.route('/:id(\\d+)')
    .delete(routerAuth, revuo.deleteRevuo)

app.route('/:id(\\d+)/volumoj')
    .get(revuo.getVolumoj)
    .post(routerAuth, revuo.postVolumo);

app.route('/volumoj')
    .get(revuo.getVolumoj);

app.route('/volumoj/:id(\\d+)')
    .put(routerAuth, revuo.updateVolumo)
    .delete(routerAuth, revuo.deleteVolumo);

app.route('/volumoj/:id(\\d+)/:tipo')
    .post(routerAuth, revuo.postVolumoFiles)
    //Nur por membroj, aldoni tion baldaŭ
    .get(revuo.getVolumoFiles)

module.exports = app;
