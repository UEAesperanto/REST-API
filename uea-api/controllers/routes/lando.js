var util = require('util');
var Lando = require('../models/lando');
var db = require('../../modules/db');

/*
  GET /lando
*/
var _getLandoj = function(req, res){
  Lando.find().then(function(sucess){
        var landoj = sucess;
        res.send(landoj);
  });
}

/*
  GET /lando/:id
*/
var _getLando = function(req, res){
  Lando.find(req.params.id).then(function(sucess){
      var lando = sucess;
      if(lando.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
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
      Lando.find(novaLando.id).then(function(sucess){
        if(sucess.length <= 0)
          res.status(400).send({message: 'Bad Request'});
        else
          res.status(201).send(novaLando);
      });
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

var _updateLando = function(req, res){
//fari
}

module.exports = {
  getLandoj: _getLandoj,
  getLando: _getLando,
  postLando: _postLando,
  deleteLando:_deleteLando,
  updateLando:_updateLando,
}
