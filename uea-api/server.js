const express = require('express');
var fs      = require('fs');
var path = require('path');
var https = require('https');
var util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
var db = require('./modules/db');

require('shelljs/global');

var httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
}

uzanto = require('./services/uzanto');
lando = require('./services/lando');
asocio = require('./services/asocio');
faktemo = require('./services/faktemo');
urbo = require('./services/urbo');
grupo = require('./services/grupo');
kongreso = require('./services/kongreso');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
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
app.use('/kongresoj', kongreso);

// Start the server
/*app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);}
);*/

https.createServer(httpsOptions, app).listen(PORT, function(){
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  setInterval(function () {
      db.mysqlExec('SELECT 1');
  }, 5000);
})

module.exports = app; // for testing
