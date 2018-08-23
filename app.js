const express = require('express');
const passport = require('passport');
var app = express();
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var util = require('util');
var bodyParser  = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
require('shelljs/global');

app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(passport.initialize());
app.use(passport.session());

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

//Routes
uzanto = require('./services/uzanto');
dissendo = require('./services/dissendo');
lando = require('./services/lando');
asocio = require('./services/asocio');
faktemo = require('./services/faktemo');
urbo = require('./services/urbo');
grupo = require('./services/grupo');
financoj = require('./services/financoj');
kongreso = require('./services/kongreso');
admin = require('./services/admin');
peranto = require('./services/peranto');
revuo = require('./services/revuo');
vocxdonado = require('./services/vocxdonado');
anonceto = require('./services/anonceto');
opcio = require('./services/opcio');
config = require('./services/config');
gxirpropono = require('./services/gxirpropono');

// Mouting applications.
app.use('/uzantoj', uzanto);
app.use('/landoj', lando);
app.use('/dissendoj', dissendo);
app.use('/asocioj', asocio);
app.use('/faktemoj', faktemo);
app.use('/urboj', urbo);
app.use('/grupoj', grupo);
app.use('/financoj', financoj);
app.use('/kongresoj', kongreso);
app.use('/admin', admin);
app.use('/perantoj', peranto);
app.use('/config', config);
app.use('/revuoj', revuo);
app.use('/vocxdonadoj', vocxdonado);
app.use('/opcioj', opcio);
app.use('/anoncetoj', anonceto);
app.use('/gxirpropono', gxirpropono);

//Saluton Mondo
app.get('/', function (req, res) {
   res.json({message: 'Saluton Mondo!'});
});

module.exports = {
  app: app
}
