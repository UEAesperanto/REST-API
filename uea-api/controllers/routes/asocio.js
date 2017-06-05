var util = require('util');
var Asocio = require('../models/asocio');
var query = require('../../modules/query');

/*
  GET /asocioj
*/
var _getAsocioj = function(req, res){
  Asocio.find().then(function(sucess){
        var asocioj = sucess;
        asocioj = asocioj.filter(query.search(req.query));
        res.status(200).send(asocioj);
  });
}

/*
  GET /asocioj/:id
*/
var _getAsocio = function(req, res){
  Asocio.find(req.params.id).then(function(sucess){
      var asocio = sucess;
      asocio = asocio.filter(query.search(req.query));
      res.status(200).send(asocio);
  });
}

module.exports = {
  getAsocioj: _getAsocioj,
  getAsocio: _getAsocio,
}
