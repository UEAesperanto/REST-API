var util = require('util');
var Asocio = require('../models/asocio');
var db = require('../../modules/db');

/*
  GET /asocio
*/
var _getAsocioj = function(req, res){
  Asocio.find().then(function(sucess){
        var asocioj = sucess;
        res.send(asocioj);
  });
}

/*
  GET /asocio/id/:id
*/
var _getAsocio = function(req, res){
  Asocio.find(req.params.id).then(function(sucess){
      var asocio = sucess;
      if(asocio.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
        res.status(200).send(asocio);
  });
}

/*
  GET /asocio/lando/:id
*/
var _getLandoAsocio = function(req, res){
  Asocio.findLando(req.params.id).then(function(sucess){
      var asocio = sucess;
      if(asocio.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
        res.status(200).send(asocio);
  });
}

/*
  GET /asocio/uea
*/
var _getUeaAsocioj = function(req, res){
  Asocio.findUea().then(function(sucess){
        var asocioj = sucess;
        res.send(asocioj);
  });
}

/*
  GET /asocio/uea/:id
*/
var _getUeaAsocio = function(req, res){
  Asocio.findUea(req.params.id).then(function(sucess){
      var asocio = sucess;
      if(asocio.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
        res.status(200).send(asocio);
  });
}


/*
  GET /asocio/tejo
*/
var _getTejoAsocioj = function(req, res){
  Asocio.findTejo().then(function(sucess){
        var asocioj = sucess;
        res.send(asocioj);
  });
}

/*
  GET /asocio/tejo/:id
*/
var _getTejoAsocio = function(req, res){
  Asocio.findTejo(req.params.id).then(function(sucess){
      var asocio = sucess;
      if(asocio.length <= 0)
        res.status(404).send({message: 'Not Found'});
      else
        res.status(200).send(asocio);
  });
}


module.exports = {
  getAsocioj: _getAsocioj,
  getAsocio: _getAsocio,
  getTejoAsocio:_getTejoAsocio,
  getTejoAsocioj:_getTejoAsocioj,
  getUeaAsocio:_getUeaAsocio,
  getUeaAsocioj:_getUeaAsocioj,
  getLandoAsocio:_getLandoAsocio
}
