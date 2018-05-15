const express = require('express');
var table = require('../controllers/anonceto');
const app = express();
var auth = require('../modules/auth');

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminKomunikisto);

app.route('/')
    .get(table.getTablej)
    .post(routerAuth, table.postTable);
app.route('/:id')
    .get(table.getTable)
    .delete(routerAuth, table.deleteTable)
    .put(routerAuth, table.putTable);

module.exports = app;
