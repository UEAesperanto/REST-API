/*Libraries*/
var util = require('util');

/*models*/
var Grupo = require('../models/grupo');
var Aneco = require('../models/aneco');

/*modules*/
var query = require('../modules/query');

/*Configuration*/
var config = require('../config');

/*
  GET /grupoj
*/
var _getGrupoj = function(req, res){
  Grupo.find().then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
  GET /grupoj/kategorioj
*/
var _getKategorioj = function(req, res){
  Grupo.findKategorio().then(function(sucess){
        var kategorioj = sucess;
        kategorioj = kategorioj.filter(query.search(req.query));
        res.status(200).send(kategorioj);
  });
}

/*
  GET /grupoj/:id
*/
var _getGrupo = function(req, res){
  Grupo.find(req.params.id).then(function(sucess){
      var grupo = sucess;
      grupo = grupo.filter(query.search(req.query));
      res.status(200).send(grupo);
  });
}

var _deleteGrupo = function(req, res){
  Grupo.delete(req.params.id).then(function(sucess){
    Grupo.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  UPDATE /grupo
*/
var _updateGrupo = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"})
  }
  Grupo.update(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

/*
   GET /grupoj/laboroj
*/
var _getGrupojKat = function(req, res){
  Grupo.findKategorio(req.params.id).then(function(sucess){
        var grupoj = sucess;
        grupoj = grupoj.filter(query.search(req.query));
        res.status(200).send(grupoj);
  });
}

/*
   GET /grupo/laboroj/:id/anoj
*/
var _getLaboranoj = function(req, res){
  Grupo.findKategorio(config.idLaborgrupo).then(function(result){
    var grupoj = result.filter(query.search({id:req.params.id}));
    if (grupoj.length == 1) {
        Grupo.findLaboranoj(req.params.id).then(function(sucess){
              var anoj = sucess;
              anoj = anoj.filter(query.search(req.query));
              res.status(200).send(anoj);
        });
    }
    else {
      res.status(400).send({message: 'ne valida ID'});
    }
  });
}

var insertAneco = function(req, res, aprobita) {
  Aneco.insertAneco(req.body.idAno, req.params.id, req.body.komencdato,
                    req.body.findato, req.body.dumviva, req.body.tasko,
                    req.body.respondeco, req.body.idAsocio, req.body.idUrbo,
                    req.body.idFako, req.body.observoj, aprobita).then(
                 function(result) {
                   if (result) {
                     res.status(201).send({message: 'aneco sukcese registrita', id: result.insertId});
                   }
                   else {
                     res.status(400).send({message: 'Kontrolu viajn parametrojn'});
                   }
                 }
      );
}

/*
  POST - /grupoj/:id/anoj
*/
var _postAneco = function(req, res) {
  if (req.decoded) {
      if(req.decoded.permesoj.indexOf(config.idAdministranto) > -1) {
        insertAneco(req, res, 1);
      }
  } else {
    //Ĉu la celata grupo estas en membrecgrupo?
    Grupo.findKategorio(config.idMembrecgrupo).then(function(result){
      var grupoj = result.filter(query.search({id:req.params.id}));
      if (grupoj.length == 1) {
        insertAneco(req, res, 0);
      }
      else {
        Grupo.findKategorio(config.idAldonaMembrecgrupo).then(function(result){
          var grupoj = result.filter(query.search({id:req.params.id}));
          if (grupoj.length == 1) {
              insertAneco(req, res, 0);
          }
          else {
             res.status(403).send({message: 'Vi ne rajtas membrigi\
                                            iun en tiu grupo'});
          }
        });
      }
    });
  }
}

/*
  POST - /grupoj
*/
var _postGrupo = function (req, res) {
  Grupo.insert(req.body.mallongigilo, req.body.nomo, req.body.priskribo)
  .then(function(sucess){
    if(sucess){
      res.status(201).send(sucess);
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}

var _postRefKatGrupo = function (req, res) {
  Grupo.insertRefKategorio(req.params.idGrupo, req.params.idKat)
  .then(function(sucess){
      if(sucess){
        res.status(201).send({message:'ok'});
      } else {
        res.status(500).send({message: 'internal error'});
      }
    });
}

var findAnoj = function(req, res) {
  Grupo.findAnoj(req.params.id)
  .then(function(sucess) {
    if(sucess){
      var anoj = sucess;
      anoj = anoj.filter(query.search(req.query));
      res.status(200).send(anoj);
    }
    else {
      res.status(500).send("Internal Error");
    }
  });
}

/*
  GET - /grupoj/:id/anoj
*/
var _getAnoj = function(req, res) {
  if (req.decoded) {
      if(req.decoded.permesoj.indexOf(config.idAdministranto) > -1) {
        findAnoj(req, res);
      } else if(req.decoded.permesoj.indexOf(config.idJunaAdministranto) > -1) {
          Grupo.findKategorio(config.idJunajGrupoj).then(function(result){
            if (grupoj.length == 1) {
              findAnoj(req, res);
            } else {
              var jaro = parseInt((new Date()).getFullYear());
              var junaJaro = jaro - config.junaAgxo;
              req.query.naskigxtago = new Date(junaJaro + '-01-01');
              findAnoj(req, res);
           }
          });
      }
  } else {
    //Ĉu la celata grupo estas en laborgrupo?
    Grupo.findKategorio(config.idLaborgrupo).then(function(result){
      var grupoj = result.filter(query.search({id:req.params.id}));
      if (grupoj.length == 1) {
        findAnoj(req, res);
      } else {
        res.status(403).send({message: 'Vi ne rajtas vidi la membrojn de tiu grupo'});
     }
    });
  }
}

/**/
var _deleteGrupoKat = function(req, res) {
  Grupo.deleteGrupoKat(req.params.idGrupo, req.params.idKat)
  .then(function(sucess){
      if(sucess){
        res.status(204).send({message:'ok'});
      } else {
        res.status(500).send({message: 'internal error'});
      }
    });
}

module.exports = {
  getGrupoj: _getGrupoj,
  deleteGrupoKat: _deleteGrupoKat,
  getKategorioj: _getKategorioj,
  getGrupo: _getGrupo,
  postGrupo: _postGrupo,
  deleteGrupo: _deleteGrupo,
  updateGrupo: _updateGrupo,
  getGrupojKat: _getGrupojKat,
  postAneco: _postAneco,
  getLaboranoj: _getLaboranoj,
  getAnoj: _getAnoj,
  postRefKatGrupo: _postRefKatGrupo
}
