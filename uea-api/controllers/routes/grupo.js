var util = require('util');
var Grupo = require('../models/grupo');
var query = require('../../modules/query');

/*
  GET /grupoj
*/
var _getGrupoj = function(req, res){
  Grupo.find().then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        if(grupoj.length <= 0)
          res.status(404).send({message: 'Ne trovita'});
        else
          res.status(200).send(grupoj);
  });
}

/*
  GET /grupoj/:id
*/
var _getGrupo = function(req, res){
  Grupo.find(req.params.id).then(function(sucess){
      var grupo = sucess;
      if(grupo.length <= 0)
        res.status(404).send({message: 'Ne trovita'});
      else
        res.status(200).send(grupo);
  });
}

/*
   GET /grupo/laboroj
*/

var _getLaborgrupoj = function(req, res){
  Grupo.findKategorio('1').then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        if(grupoj.length <= 0)
          res.status(404).send({message: 'Ne trovita'});
        else
          res.status(200).send(grupoj);
  }).catch(function(error) {
    res.status(500).send({message: 'Eraro'});
  }
  );
}

var _getEstraranoj = function(req, res){
  Grupo.findEstraranoj().then(function(sucess){
        var estraranoj = sucess;
        estraranoj = estraranoj.filter(query.search(req.query));
        if(estraranoj.length <= 0)
          res.status(404).send({message: 'Ne trovita'});
        else
          res.status(200).send(estraranoj);
  }).catch(function(error) {
    res.status(500).send({message: 'Eraro'});
  }
);
}



module.exports = {
  getGrupoj: _getGrupoj,
  getGrupo: _getGrupo,
  getLaborgrupoj: _getLaborgrupoj,
  getEstraranoj: _getEstraranoj
}
