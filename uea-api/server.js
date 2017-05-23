const express = require('express');
var fs      = require('fs');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
require('shelljs/global');

uzanto = require('./services/uzanto');
lando = require('./services/lando');
asocio = require('./services/asocio');
faktemo = require('./services/faktemo');

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


// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app; // for testing
