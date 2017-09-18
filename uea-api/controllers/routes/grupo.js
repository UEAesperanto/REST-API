/*Libraries*/
var util = require('util');

/*models*/
var Grupo = require('../models/grupo');

/*modules*/
var query = require('../../modules/query');

/*Configuration*/
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
   GET /grupoj/membrecoj
*/
var _getMembrecgrupoj = function(req, res){
  Grupo.findKategorio(config.idMembrecgrupo).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
   GET /grupoj/membrecoj
*/
var _getAldonaMembrecgrupoj = function(req, res){
  Grupo.findKategorio(config.idAldonaMembrecgrupo).then(function(sucess){
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
   GET - /grupo/membrecoj/aldonoj/:id
*/
var _getAldonaMembrecgrupo = function(req, res){
  Grupo.findKategorio(config.idAldonaMembrecgrupo).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search({id:req.params.id}));
        res.status(200).send(grupoj);
  });
}

var insertAneco = function(req, res) {
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
}

/*
  POST - /grupoj/membrecoj/:id
*/
var _postAneco = function(req, res) {

  var token = req.headers['x-access-token'];

  if (token) {
      res.status(100).send({message: 'Farota'});
  } else {
    Grupo.findKategorio(config.idMembrecgrupo).then(function(result){
      var grupoj = result.filter(query.search({id:req.params.id}));
      if (grupoj.length == 1) {
        insertAneco(req, res);
      }
      else {
        Grupo.findKategorio(config.idAldonaMembrecgrupo).then(function(result){
          var grupoj = result.filter(query.search({id:req.params.id}));
          if (grupoj.length == 1) {
              insertAneco(req, res);
          }
          else {
             res.status(403).send({message: 'Vi ne rajtas membrigi\
                                            iun en tiu grupo'});
          }

        });
      }
    });
  }
}

var _postGrupo = function (req, res) {
  Grupo.insert(req.body.mallongigilo, req.body.nomo, req.body.priskribo)
  .then(function(sucess){
    if(sucess){
      res.status(201).send({message: 'Ok'});
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}

var _postRefAldonmembreco = function (req, res) {
  Grupo.insertRefKategorio(req.params.id, config.idAldonaMembrecgrupo)
  .then(function(sucess){
      if(sucess){
        res.status(201).send({message:'ok'});
      } else {
        res.status(500).send({message: 'internal error'});
      }
    });
}

module.exports = {
  getGrupoj: _getGrupoj,
  getGrupo: _getGrupo,
  postGrupo: _postGrupo,
  postRefAldonmembreco: _postRefAldonmembreco,
  getMembrecgrupoj: _getMembrecgrupoj,
  getLaborgrupoj: _getLaborgrupoj,
  getAligxKotizoj: _getAligxKotizoj,
  getMembrecgrupo: _getMembrecgrupo,
  getAldonaMembrecgrupo: _getAldonaMembrecgrupo,
  postAneco: _postAneco,
  getLaboranoj: _getLaboranoj,
  getAldonaMembrecgrupoj: _getAldonaMembrecgrupoj
}
