/*Libraries*/
var util = require('util');

/*models*/
var Aneco = require('../models/aneco');

/*modules*/
var query = require('../modules/query');

/*Configuration*/
var config = require('../config');

/*
   GET /grupo/membrecoj/:id/kotizoj
*/
var _getKotizoj = function(req, res){
  Aneco.findGrupo(req.params.id).then(function(sucess){
        var kotizoj = sucess;
        kotizoj = kotizoj.filter(query.search(req.query));
        res.status(200).send(kotizoj);
  });
}

/*
   POST /grupo/membrecoj/:id/kotizoj
*/
var _postKotizo = function(req, res){
  Aneco.insertKotizo(req.body.idLando, req.body.prezo, req.body.monero, req.params.id,
                req.params.junaRabato)
             .then(function(sucess) {
                    if(sucess) {
                      res.status(201).send(sucess);
                    } else {
                      res.status(500).send({message: 'Internal Error'});
                    }
              });
}

/*
  UPDATE /grupo/membrecoj/:id/kotizoj
*/
var _updateKotizo = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"})
  }
  Aneco.updateKotizo(req.body.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}


module.exports = {
  getKotizoj: _getKotizoj,
  postKotizo: _postKotizo,
  updateKotizo:  _updateKotizo
}
