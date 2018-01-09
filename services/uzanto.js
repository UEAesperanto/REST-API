const express = require('express');
var uzanto = require('../controllers/uzanto');
var auth = require('../modules/auth');
const app = express();

var router = express.Router();

// var routerAuthID = express.Router();
// routerAuthID.use(auth.authorizeID);
// app.use('/:id(\\d+)/', routerAuthID);
// app.use('/:id(\\d+)/gxisdatigi/', routerAuthID);

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminJuna);

// Uzanto routes
app.use('/', router);

app.route('/')
    .post(uzanto.postUzanto);

app.route('/admin/:id(\\d+)/')
    .get(routerAuth, uzanto.getUzanto)
    .put(routerAuth, uzanto.updateUzanto);

app.route('/admin/:id(\\d+)/grupoj')
    .get(routerAuth, uzanto.getGrupoj);

app.route('/admin/:id(\\d+)/bildo')
    .post(routerAuth, uzanto.postBildo)
    .get(routerAuth, uzanto.getBildo);

app.route('/cxuMembro/:retposxto')
    .get(uzanto.cxuMembro);

  router.route('/ensaluti')
    .post(uzanto.ensaluti);

router.route('/forgesisPasvorton')
    .post(uzanto.forgesisPasvorton);

module.exports = app;
