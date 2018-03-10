const express = require('express');
var vocxdonado = require('../controllers/vocxdonado');
const app = express();
var auth = require('../modules/auth');
var routerAuth = express.Router();
//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);
 
app.route('/')
    .get(vocxdonado.getVocxdonadoj)
    .post(routerAuth, vocxdonado.postVocxdonado);
app.route('/:id')
    .get(vocxdonado.getVocxdonado)
    .delete(routerAuth, vocxdonado.deleteVocxdonado)
    .put(routerAuth, vocxdonado.putVocxdonado);

module.exports = app;
