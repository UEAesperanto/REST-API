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
      if(kongreso.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(kongreso);
  });
}

module.exports = {
  getKongresoj: _getKongresoj,
  getKongreso: _getKongreso
}
