var util = require('util');
var Gxiro = require('../models/gxirpropono');
var query = require('../modules/query');
 

/*
  GET /Gxiroj
*/
var _getGxiroj = function(req, res) {
  Gxiro.findGxiroj().then(function(success) {
    var gxiroj = success;
    gxiroj = gxiroj.filter(query.search(req.query));
    res.status(200).send(gxiroj);
  });
}

/*
  GET /Gxiroj/:id
*/
var _getGxiro = function(req, res){
  Gxiro.findGxiroj(req.params.id).then(function(sucess){
      var gxiro = sucess;
      gxiro = gxiro.filter(query.search(req.query));
      res.status(200).send(gxiro);
  });
}

/*
  POST /Gxiroj
*/
var _postGxiro = function(req, res) {
    Gxiro.insertGxiro(req.body.idGxiranto, req.body.idRicevanto, 
      req.body.kialo, req.body.traktita, req.body.aligxo, 
      req.body.kvanto,req.body.valuto, req.body.pagmaniero).then(
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
  DELETE /Gxiroj/:id
*/
var _deleteGxiro = function(req, res) {
  Gxiro.deleteGxiro(req.params.id).then(function(sucess){
    Gxiro.findGxiroj(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  PUT Gxiroj/:id
*/
var _putGxiro = function(req, res) {
  // console.log(req.body);
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Gxiro.updateGxiro(req.params.id, req.body.kampo, req.body.valoro).then(
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
  getGxiroj: _getGxiroj,
  getGxiro: _getGxiro,
  postGxiro: _postGxiro,
  deleteGxiro: _deleteGxiro,
  putGxiro: _putGxiro
}
