/*Libraries*/
var util = require('util');

/*models*/
var Aligxkotizo = require('../models/aligxkotizo');

/*modules*/
var query = require('../modules/query');

/*Configuration*/
var config = require('../config');

/*
   GET /grupo/membrecoj/:id/kotizoj
*/
var _getAligxKotizoj = function(req, res){
  Aligxkotizo.findGrupo(req.params.id).then(function(sucess){
        var kotizoj = sucess;
        kotizoj = kotizoj.filter(query.search(req.query));
        res.status(200).send(kotizoj);
  });
}

/*
   POST /grupo/membrecoj/:id/kotizoj
*/
var _postAligxkotizo = function(req, res){
  Aligxkotizo.insert(req.body.idLando, req.body.prezo, req.body.monero, req.params.id)
             .then(function(sucess) {
                    if(sucess) {
                      res.status(201).send(sucess);
                    } else {
                      res.status(500).send({message: 'Internal Error'});
                    }
              });
}

module.exports = {
  getAligxKotizoj: _getAligxKotizoj,
  postAligxkotizo: _postAligxkotizo
}
