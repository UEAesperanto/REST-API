const express = require('express');
var table = require('../controllers/faktemo');
const app = express();
var auth = require('../modules/auth');
var routerAuth = express.Router();
//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);

app.route('/')
    .get(table.getTablej)
    .post(routerAuth, table.postTable);
app.route('/:id')
    .get(table.getTable)
    .delete(routerAuth, table.deleteTable)
    .put(routerAuth, table.putTable);

module.exports = app;
