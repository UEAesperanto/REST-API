var util = require('util');
var Peranto = require('../models/peranto');
var db = require('../../modules/db');
var query = require('../../modules/query');

/*
  GET /lando
*/
var _getPerantoj = function(req, res){
  Peranto.find().then(function(sucess){
        var perantoj = sucess;
        perantoj = perantoj.filter(query.search(req.query));
        res.status(200).send(perantoj);
  });
}

module.exports = {
  getPerantoj: _getPerantoj
}
