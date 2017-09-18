const express = require('express');
var admin = require('../controllers/routes/admin');

//Modules
var auth = require('../modules/auth');

const app = express();

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdmin);

// Admin routes
app.route('/')
    .post(routerAuth, admin.postAdmin)
    .get(routerAuth, admin.getAdmin);

app.route('/:id(\\d+)')
    .delete(routerAuth, admin.deleteAdmin)
    .put(routerAuth, admin.updateAdmin);

app.route('/rajtoj')
    .post(routerAuth, admin.postRajto);

app.route('/ensaluti')
    .post(admin.ensaluti);
app.route('/agordita')
    .get(admin.agordita);

module.exports = app;
