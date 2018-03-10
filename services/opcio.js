const express = require('express');
var opcio = require('../controllers/opcio');
const app = express();
var auth = require('../modules/auth');
var routerAuth = express.Router();
//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);
 
app.route('/')
    .get(opcio.getOpcioj)
    .post(routerAuth, opcio.postOpcio);
app.route('/:id')
    .get(opcio.getOpcio)
    .delete(routerAuth, opcio.deleteOpcio)
    .put(routerAuth, opcio.putOpcio);

module.exports = app;
