const express = require('express');
var uzanto = require('../controllers/uzanto');
var auth = require('../modules/auth');
const app = express();

var router = express.Router();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeID);

app.route('/:id(\\d+)/')
   .put(routerAuthID, uzanto.updateUzanto)
   .get(routerAuthID, uzanto.getUzanto);

app.route('/:id(\\d+)/bildo')
   .post(routerAuthID, uzanto.postBildo)
   .get(uzanto.getBildo);

app.route('/:id(\\d+)/grupoj')
   .get(routerAuthID, uzanto.getGrupoj);

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdminJuna);

// Uzanto routes
app.use('/', router);

app.route('/')
    .get(routerAuth, uzanto.getUzantoj)
    .post(uzanto.postUzanto);

app.route('/admin/:id(\\d+)/')
    .get(routerAuth, uzanto.getUzanto)
    .put(routerAuth, uzanto.updateUzanto)
    .delete(routerAuth, uzanto.delete);

app.route('/admin/:id(\\d+)/grupoj')
    .get(routerAuth, uzanto.getGrupoj);

app.route('/admin/:id(\\d+)/bildo')
    .post(routerAuth, uzanto.postBildo)
    .get(routerAuth, uzanto.getBildo);

app.route('/cxuMembro/:retposxto')
    .get(uzanto.cxuMembro);

router.route('/ensaluti')
    .post(uzanto.ensaluti);

router.route('/adapti')
    .post(routerAuth, uzanto.adapti);

router.route('/forgesisPasvorton')
    .post(uzanto.forgesisPasvorton);

module.exports = app;
