var util = require('util');
var Kongreso = require('../models/kongreso');
var query = require('../../modules/query');

/*
  GET /Kongresoj
*/
var _getKongresoj = function(req, res){
  Kongreso.find().then(function(sucess){
        var kongresoj = sucess;
        kongresoj = kongresoj.filter(query.search(req.query));
        if(kongresoj.length <= 0)
          res.status(404).send({message: 'Ne trovita'});
        else
          res.status(200).send(kongresoj);
  });
}

/*
  GET /kongresoj/:id
*/
var _getKongreso = function(req, res){
  Kongreso.find(req.params.id).then(function(sucess){
      var kongreso = sucess;
      kongreso = kongreso.filter(query.search(req.query));
      if(kongreso.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(kongreso);
  });
}

/*
  GET /kongresoj/:id/Kromaj
*/
var _getKromaj = function(req, res){
  Kongreso.findKromaj(req.params.id).then(function(sucess){
      var kongreso = sucess;
      if(kongreso.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(kongreso);
  });
}

/*
  GET /kongresoj/:id/Kromaj
*/
var _getAligxintoj = function(req, res){
  Kongreso.findAligxintoj(req.params.id).then(function(sucess){
      var aligxintoj = sucess;
      aligxintoj = aligxintoj.filter(query.search(req.query));
      if(aligxintoj.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(aligxintoj);
  });
}

var _getAligxkotizoj = function(req, res){
  Kongreso.findAligxikotizoj(req.params.id).then(function(sucess){
      var aligxikotizoj = sucess;
      aligxikotizoj = aligxikotizoj.filter(query.search(req.query));
      if(aligxikotizoj.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(aligxikotizoj);
  });
}

module.exports = {
  getKongresoj: _getKongresoj,
  getKongreso: _getKongreso,
  getKromaj: _getKromaj,
  getAligxintoj: _getAligxintoj,
  getAligxkotizoj: _getAligxkotizoj
}