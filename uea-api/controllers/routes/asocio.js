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
  GET /asocio/:id
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

module.exports = {
  getAsocioj: _getAsocioj,
  getAsocio: _getAsocio
}