//Libraries
const express   = require('express');
var cors        = require('cors');
var fs          = require('fs');
var path        = require('path');
var util        = require('util');
var bodyParser  = require('body-parser');
var multer      = require('multer');
var morgan      = require('morgan');

//Modules
var db          = require('./modules/db');

require('shelljs/global');

const PORT = process.env.PORT || 3000;
const app = express();

uzanto = require('./services/uzanto');
lando = require('./services/lando');
asocio = require('./services/asocio');
faktemo = require('./services/faktemo');
urbo = require('./services/urbo');
grupo = require('./services/grupo');
financoj = require('./services/financoj');
kongreso = require('./services/kongreso');
admin = require('./services/admin');
peranto = require('./services/peranto');
config = require('./services/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//Indas ŝanĝi origin por ebligi nur kelkajn domajnojn aliri
app.use(cors({origin: '*'}));

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers',
                  'X-Requested-With, content-type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
    next();
});

//Saluton Mondo
app.get('/', function (req, res) {
   res.json({message: 'Saluton Mondo!'});
});

// Mouting applications.
app.use('/uzantoj', uzanto);
app.use('/landoj', lando);
app.use('/asocioj', asocio);
app.use('/faktemoj', faktemo);
app.use('/urboj', urbo);
app.use('/grupoj', grupo);
app.use('/financoj', financoj);
app.use('/kongresoj', kongreso);
app.use('/admin', admin);
app.use('/perantoj', peranto);
app.use('/config', config);

// Start the server
app.listen(PORT, () => {
  console.log(`La API aŭskultas ĉe la pordo ${PORT}`);
  console.log('Presu Ctrl+C por ĉesi.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);
});

module.exports = app; // for testing
