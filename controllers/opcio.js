var util = require('util');
var Opcio = require('../models/opcio');
var query = require('../modules/query');
 

/*
  GET /opcioj
*/
var _getOpcioj = function(req, res) {
  Opcio.findOpcioj().then(function(sucess) {
    var opcioj = sucess;
    opcioj = opcioj.filter(query.search(req.query));
    res.status(200).send(opcioj);
  });
}

/*
  GET /opcioj/:id
*/
var _getOpcio = function(req, res){
  Opcio.findOpcioj(req.params.id).then(function(sucess){
      var opcio = sucess;
      opcio = opcio.filter(query.search(req.query));
      res.status(200).send(opcio);
  });
}

/*
  POST /opcioj
*/
var _postOpcio = function(req, res) {
    Opcio.insertOpcio(req.body.priskribo, req.body.idVocxdonado).then(
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
  DELETE /opcioj/:id
*/
var _deleteOpcio = function(req, res) {
  Opcio.deleteOpcio(req.params.id).then(function(sucess){
    Opcio.findOpcioj(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  PUT opcioj/:id
*/
var _putOpcio = function(req, res) {
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Opcio.updateOpcio(req.params.id, req.body.kampo, req.body.valoro).then(
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
  getOpcioj: _getOpcioj,
  getOpcio: _getOpcio,
  postOpcio: _postOpcio,
  deleteOpcio: _deleteOpcio,
  putOpcio: _putOpcio
}
