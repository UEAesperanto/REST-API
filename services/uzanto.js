const express = require('express');
var uzanto = require('../controllers/uzanto');
var auth = require('../modules/auth');
const app = express();

var router = express.Router();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeID);
app.use('/:id(\\d+)/', routerAuthID);
app.use('/:id(\\d+)/gxisdatigi/', routerAuthID);

// Uzanto routes
app.use('/', router);
app.route('/')
    .post(uzanto.postUzanto);
app.route('/:id(\\d+)/')
    .get(uzanto.getUzanto)
    .put(uzanto.updateUzanto);

router.route('/ensaluti')
    .post(uzanto.ensaluti);
router.route('/forgesisPasvorton')
    .post(uzanto.forgesisPasvorton);

module.exports = app;
