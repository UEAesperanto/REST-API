var util = require('util');
var Uzanto = require('../models/uzanto');
var UzantoAuxAsocio = require('../models/uzantoAuxAsocio');
var db = require('../../modules/db');
var query = require('../../modules/query');

/*
  GET /uzantoj
*/
var _getUzantoj = function(req, res){
  Uzanto.find().then(function(sucess){
        var uzantoj = sucess;
        uzantoj = uzantoj.filter(query.search(req.query));
        res.status(200).send(uzantoj);
  });
}

/*
  GET /uzantoj/:id
*/
var _getUzanto = function(req, res){
  Uzanto.find(req.params.id).then(function(sucess){
      var uzanto = sucess;
      res.status(200).send(uzanto);
  });
}

var _postUzanto = function(req, res){

   UzantoAuxAsocio.insert(req.body.uzantnomo, req.body.pasvorto).then(
    function (result){
      if (result) {
        Uzanto.insert(result.insertId, req.body.personanomo, req.body.familianomo, req.body.titolo,
                      req.body.bildo, req.body.adreso, req.body.posxtkodo, req.body.idNacialando, req.body.idUrbo,
                      req.body.naskigxtago, req.body.notoj, req.body.retposxto, req.body.telhejmo,
                      req.body.teloficejo, req.body.telportebla,  req.body.tttpagxo).then(
              function(success) {
                res.status(201).send({message: result.insertId});
              },
              function (fail) {
                res.status(500).send({message: 'Internal Error'});
              }
            );
      }
      else {
        res.status(400).send({message: "La uzantnomo jam ekzistas je nia sistemo"});
      }
    });
}

var _deleteUzanto = function(req, res){
//fari
}

var _updateUzanto = function(req, res){
//fari
}

module.exports = {
  getUzantoj: _getUzantoj,
  getUzanto: _getUzanto,
  postUzanto: _postUzanto,
  deleteUzanto:_deleteUzanto,
  updateUzanto:_updateUzanto,
}
