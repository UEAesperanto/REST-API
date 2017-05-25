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
        if(urboj.length <= 0)
          res.status(404).send({message: 'Ne trovita'});
        else
          res.status(200).send(urboj);
  });
}

/*
  GET /asocioj/:id
*/
var _getUrbo = function(req, res){
  Urbo.find(req.params.id).then(function(sucess){
      var urbo = sucess;
      if(urbo.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
        res.status(200).send(urbo);
  });
}

module.exports = {
  getUrboj: _getUrboj,
  getUrbo: _getUrbo,
}
