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
   GET /grupo/membrecoj/:id/kotizoj
*/
var _getAligxKotizoj = function(req, res){
  Grupo.findAligxKotizoj(req.params.id).then(function(sucess){
        var kotizoj = sucess;
        kotizoj = kotizoj.filter(query.search(req.query));
        res.status(200).send(kotizoj);
  });
}

/*
   GET /grupo/laboroj/:id/anoj
*/
var _getLaboranoj = function(req, res){
  Grupo.findKategorio(config.idLaborgrupo).then(function(result){
    var grupoj = result.filter(query.search({id:req.params.id}));
    if (grupoj.length == 1) {
        Grupo.findLaboranoj(req.params.id).then(function(sucess){
              var anoj = sucess;
              anoj = anoj.filter(query.search(req.query));
              res.status(200).send(anoj);
        });
    }
    else {
      res.status(400).send({message: 'ne valida ID'});
    }
  });
}

/*
   GET - /grupo/membrecoj/:id
*/
var _getMembrecgrupo = function(req, res){
  Grupo.findKategorio(config.idMembrecgrupo).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search({id:req.params.id}));
        res.status(200).send(grupoj);
  });
}

/*
  POST - /grupoj/membrecoj/:id
*/
var _postAneco = function(req, res) {

  Grupo.findKategorio(config.idLaborgrupo).then(function(result){
    var grupoj = result.filter(query.search({id:req.params.id}));
    if (grupoj.length == 1) {
          Grupo.insertMembreco(req.body.idAno, req.params.id, req.body.komencdato,
                       req.body.findato, req.body.dumviva, req.body.tasko,
                       req.body.respondeco, req.body.idAsocio, req.body.idUrbo,
                       req.body.idFako, req.body.idAneckotizo, req.body.observoj, 0).then(
                         function(result) {
                           if (result) {
                             res.status(201).send({message: 'aneco sukcese registrita'});
                           }
                           else {
                             res.status(400).send({message: 'Kontrolu viajn parametrojn'});
                           }
                         }
              );
    } else {
      res.status(403).send({message: 'Vi ne rajtas membrigi iun en tiu grupo'});
    }
  });
}

module.exports = {
  getGrupoj: _getGrupoj,
  getGrupo: _getGrupo,
  getMembrecgrupoj: _getMembrecgrupoj,
  getLaborgrupoj: _getLaborgrupoj,
  getAligxKotizoj: _getAligxKotizoj,
  getMembrecgrupo: _getMembrecgrupo,
  postAneco: _postAneco,
  getLaboranoj: _getLaboranoj
}
