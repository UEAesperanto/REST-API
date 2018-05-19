const express = require('express');
var admin = require('../controllers/admin');

//Modules
var auth = require('../modules/auth');

const app = express();

var routerAuth = express.Router();
routerAuth.use(auth.authorizeAdmin);

// Admin routes
app.route('/')
    .post(routerAuth, admin.postAdmin)
    .get(routerAuth, admin.getAdmins);

app.route('/:id(\\d+)')
    .get(routerAuth, admin.getAdmin)
    .delete(routerAuth, admin.deleteAdmin)
    .put(routerAuth, admin.updateAdmin);

app.route('/rajtoj')
    .get(admin.getRajtoj);

app.route('/:id(\\d+)/rajtoj')
    .get(routerAuth, admin.getRajtojAdmin)
    .post(routerAuth, admin.postRajtoAdmin);

app.route('/ensaluti')
    .post(admin.ensaluti);
app.route('/agordita')
    .get(admin.agordita);

module.exports = app;
