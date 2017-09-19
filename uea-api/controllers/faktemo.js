var util = require('util');
var Faktemo = require('../models/faktemo');
var db = require('../modules/db');

/*
  GET /Faktemo
*/
var _getFaktemo = function(req, res) {
  Faktemo.find().then(function(sucess){
        var faktemoj = sucess;
        res.send(faktemoj);
  });
}

module.exports = {
  getFaktemo: _getFaktemo
}
