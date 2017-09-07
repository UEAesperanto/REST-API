var util = require('util');
var Lando = require('../models/lando');
var db = require('../../modules/db');
var query = require('../../modules/query');

/*
  GET /lando
*/
var _getLandoj = function(req, res){
  Lando.find().then(function(sucess){
        var landoj = sucess;
        landoj = landoj.filter(query.search(req.query));
        res.status(200).send(landoj);
  });
}

/*
  GET /lando/:id
*/
var _getLando = function(req, res){
  Lando.find(req.params.id).then(function(sucess){
      var lando = sucess;
      res.status(200).send(lando);
  });
}

/*
  POST /lando
*/
var _postLando = function(req, res){
  var novaLando = Lando.create(req.body);
  Lando.insert(novaLando).then(
    function(sucess){
      res.status(201).send(novaLando);
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'})
    }
  );
}

var _deleteLando = function(req, res){
  Lando.delete(req.params.id).then(function(sucess){
    Lando.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

module.exports = {
  getLandoj: _getLandoj,
  getLando: _getLando,
  postLando: _postLando,
  deleteLando:_deleteLando
}
