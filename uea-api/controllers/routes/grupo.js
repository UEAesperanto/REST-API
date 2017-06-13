var util = require('util');
var Grupo = require('../models/grupo');
var query = require('../../modules/query');
var config = require('../../config');

/*
  GET /grupoj
*/
var _getGrupoj = function(req, res){
  Grupo.find().then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
  GET /grupoj/:id
*/
var _getGrupo = function(req, res){
  Grupo.find(req.params.id).then(function(sucess){
      var grupo = sucess;
      grupo = grupo.filter(query.search(req.query));
      res.status(200).send(grupo);
  });
}

/*
   GET /grupoj/laboroj
*/

var _getLaborgrupoj = function(req, res){
  Grupo.findKategorio(config.idLaborgrupo).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
   GET /grupoj/membroj
*/

var _getMembrecgrupoj = function(req, res){
  Grupo.findKategorio(config.idMembrecgrupo).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
   GET /grupo/laboroj/:id/anoj
*/
var _getLaboranoj = function(req, res){
  Grupo.findKategorio(config.idLaborgrupo).then(function(result){
    for (var i = 0; i < result.length; i++) {
      if(result[i].id == req.params.id) {
        Grupo.findLaboranoj(req.params.id).then(function(sucess){
              var anoj = sucess;
              anoj = anoj.filter(query.search(req.query));
              res.status(200).send(anoj);
        });
      }
    }
    res.status(400).send({message: 'ne valida id por la grupo'});
  });
}

module.exports = {
  getGrupoj: _getGrupoj,
  getGrupo: _getGrupo,
  getMembrecgrupoj: _getMembrecgrupoj,
  getLaborgrupoj: _getLaborgrupoj,
  getLaboranoj: _getLaboranoj
}
