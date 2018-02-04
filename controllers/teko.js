var util = require('util');
var Teko = require('../models/teko');
var query = require('../modules/query');
 

/*
  GET /tekoj
*/
var _getTekoj = function(req, res) {
  Teko.findTekoj().then(function(sucess) {
    var tekoj = sucess;
    tekoj = tekoj.filter(query.search(req.query));
    res.status(200).send(tekoj);
  });
}

/*
  GET /tekoj/:id
*/
var _getTeko = function(req, res){
  Teko.findTekoj(req.params.id).then(function(sucess){
      var teko = sucess;
      teko = teko.filter(query.search(req.query));
      res.status(200).send(teko);
  });
}

/*
  POST /tekoj
*/
var _postTeko = function(req, res) {
    Teko.insertTeko(req.body.titolo, req.body.elnomo, req.body.kodnomo, req.body.jaro, req.body.absnum, req.body.vido).then(
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
  DELETE /tekoj/:id
*/
var _deleteTeko = function(req, res) {
  Teko.deleteTeko(req.params.id).then(function(sucess){
    Teko.findTekoj(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  PUT tekoj/:id
*/
var _putTeko = function(req, res) {
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Teko.updateTeko(req.params.id, req.body.kampo, req.body.valoro).then(
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
  getTekoj: _getTekoj,
  getTeko: _getTeko,
  postTeko: _postTeko,
  deleteTeko: _deleteTeko,
  putTeko: _putTeko
}
