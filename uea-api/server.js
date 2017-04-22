const express = require('express');
var fs      = require('fs');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer');
require('shelljs/global');
var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'uea'
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Saluton Mondo
app.get('/', function (req, res) {
   res.send('Saluton Mondo!');
});

app.get('/uzantoj', function (req, res) {
  var query = util.format('SELECT * FROM `uzanto`;')
  mysqlExec(query).then(function(result){
    res.send(result);
  });
});

app.get('/uzantoj/:id', function (req, res) {
   var id = req.params.id;
   var query = util.format('SELECT * FROM `uzanto` WHERE `id` = %s;', id);
   mysqlExec(query).then(function(result){
     res.send(result);
   })
});

var mysqlExec = function(query){
  return new Promise(function(resolve, reject){
    connection.query(query, function (err, results, fields) {
      resolve(results);
    });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
