const express = require('express');
var gxiroj = require('../controllers/gxirpropono');
const app = express();
var auth = require('../modules/auth');

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminFinancoj);
 
app.route('/')
    .get(routerAuth, gxiroj.getGxiroj)
    .post(gxiroj.postGxiro);
app.route('/:id')
    .get(routerAuth, gxiroj.getGxiro)
    .delete(routerAuth, gxiroj.deleteGxiro)
    .put(routerAuth, gxiroj.putGxiro);

module.exports = app;
