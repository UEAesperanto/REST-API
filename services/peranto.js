const express = require('express');

//Controllers
peranto = require('../controllers/peranto');

//Modules
var auth = require('../modules/auth');

const app = express();

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdmin);

app.route('/')
    .get(peranto.getPerantoj)
    .post(routerAuth, peranto.postPeranto);

app.route('/:id')
    .put(routerAuth, peranto.updatePeranto)
    .delete(routerAuth, peranto.deletePeranto);

module.exports = app;
