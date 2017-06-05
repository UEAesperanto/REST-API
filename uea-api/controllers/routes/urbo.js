var util = require('util');
var Urbo = require('../models/urbo');
var query = require('../../modules/query');

/*
  GET /urboj
*/
var _getUrboj = function(req, res){
  Urbo.find().then(function(sucess){
        var urboj = sucess;
        urboj = urboj.filter(query.search(req.query));
        res.status(200).send(urboj);
  });
}

/*
  GET /asocioj/:id
*/
var _getUrbo = function(req, res){
  Urbo.find(req.params.id).then(function(sucess){
      var urbo = sucess;
      res.status(200).send(urbo);
  });
}

module.exports = {
  getUrboj: _getUrboj,
  getUrbo: _getUrbo,
}
