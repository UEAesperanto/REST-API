var util = require('util');
var Vocxdonado = require('../models/vocxdonado');
var query = require('../modules/query');
 

/*
  GET /vocxdonadoj
*/
var _getVocxdonadoj = function(req, res) {
  Vocxdonado.findVocxdonadoj().then(function(sucess) {
    var vocxdonadoj = sucess;
    vocxdonadoj = vocxdonadoj.filter(query.search(req.query));
    res.status(200).send(vocxdonadoj);
  });
}

/*
  GET /vocxdonadoj/:id
*/
var _getVocxdonado = function(req, res){
  Vocxdonado.findVocxdonadoj(req.params.id).then(function(sucess){
      var vocxdonado = sucess;
      vocxdonado = vocxdonado.filter(query.search(req.query));
      res.status(200).send(vocxdonado);
  });
}

/*
  POST /vocxdonadoj
*/
var _postVocxdonado = function(req, res) {
    Vocxdonado.insertVocxdonado(req.body.titolo, req.body.priskribo, req.body.pluraj_opcioj, req.body.anonima, req.body.aperdato, req.body.limdato).then(
      function(sucess){
        if(sucess) {
          res.status(201).send({insertId: sucess.insertId});
        } else {
          res.status(500).send({message: 'Internal Error'});
        }
      },
      function(fail){
        res.status(500).send({message: 'Internal Error'});
      }
    );
}

/*
  DELETE /vocxdonadoj/:id
*/
var _deleteVocxdonado = function(req, res) {
  Vocxdonado.deleteVocxdonado(req.params.id).then(function(sucess){
    Vocxdonado.findVocxdonadoj(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  PUT vocxdonadoj/:id
*/
var _putVocxdonado = function(req, res) {
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Vocxdonado.updateVocxdonado(req.params.id, req.body.kampo, req.body.valoro).then(
      function(sucess) {
        if (sucess) {
          res.status(200).send({message: "Ĝisdatigo sukcese farita"});
        } else {
          res.status(500).send({message: "Eraro en la servilo"});
        }
    });
  }
}

module.exports = {
  getVocxdonadoj: _getVocxdonadoj,
  getVocxdonado: _getVocxdonado,
  postVocxdonado: _postVocxdonado,
  deleteVocxdonado: _deleteVocxdonado,
  putVocxdonado: _putVocxdonado
}
