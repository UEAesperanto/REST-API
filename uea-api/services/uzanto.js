const express = require('express');
var uzanto = require('../controllers/routes/uzanto');
var auth = require('../modules/auth');
const app = express();

var router = express.Router();

var routerAuthID = express.Router();
routerAuthID.use(auth.authorizeID);
app.use('/:id(\\d+)/', routerAuthID);

// Uzanto routes
app.use('/', router);
app.route('/')
    .get(uzanto.getUzantoj)
    .post(uzanto.postUzanto);
app.route('/:id(\\d+)/')
    .get(uzanto.getUzanto);
router.route('/ensaluti')
    .post(uzanto.ensaluti);
router.route('/forgesisPasvorton')
    .post(uzanto.forgesisPasvorton);


module.exports = app;
