var util = require('util');
var Peranto = require('../models/peranto');
var db = require('../modules/db');
var query = require('../modules/query');

/*
  GET /peranto
*/
var _getPerantoj = function(req, res){
  Peranto.find().then(function(sucess){
        var perantoj = sucess;
        perantoj = perantoj.filter(query.search(req.query));
        res.status(200).send(perantoj);
  });
}

/*
  DELETE /peranto
*/
var _deletePeranto = function(req, res){
  Peranto.delete(req.params.id).then(function(sucess){
    Peranto.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  POST /peranto
*/
var _postPeranto = function(req, res){
  Peranto.insert(req.body.publikaNomo, req.body.retadreso, req.body.idLando).then(
    function(sucess){
      res.status(201).send(sucess);
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'})
    }
  );
}

/*
  UPDATE /peranto
*/
var _updatePeranto = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"})
  }
  Peranto.update(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

module.exports = {
  getPerantoj: _getPerantoj,
  deletePeranto: _deletePeranto,
  postPeranto: _postPeranto,
  updatePeranto: _updatePeranto
}
