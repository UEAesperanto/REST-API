const express = require('express');
var table = require('../controllers/table');
const app = express();
var auth = require('../modules/auth');
var routerAuth = express.Router();
//por nun, baldaŭ estos ankaŭ por administranto pri komunikado
routerAuth.use(auth.authorizeAdmin);
