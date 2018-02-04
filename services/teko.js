const express = require('express');
var teko = require('../controllers/teko');
const app = express();
var auth = require('../modules/auth');
var routerAuth = express.Router();
//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);
 
app.route('/')
    .get(teko.getTekoj)
    .post(routerAuth, teko.postTeko);
app.route('/:id')
    .get(teko.getTeko)
    .delete(routerAuth, teko.deleteTeko)
    .put(routerAuth, teko.putTeko);

module.exports = app;
