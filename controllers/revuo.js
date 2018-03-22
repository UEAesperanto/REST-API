/*libraries*/
var util = require('util');

/*models*/
var Revuo = require('../models/revuo');

/*Modules*/
var query = require('../modules/query');
var file = require('../modules/file');


/*
  GET /revuoj
*/
var _getRevuoj = function(req, res) {
  Revuo.findRevuoj().then(function(sucess) {
    var revuoj = sucess;
    revuoj = revuoj.filter(query.search(req.query));
    res.status(200).send(revuoj);
  });
}

/*
  POST /revuoj
*/
var _postRevuo = function(req, res) {
    Revuo.insertRevuo(req.body.titolo, req.body.fondjaro, req.body.issn).then(
      function(sucess){
        if(sucess) {
          res.status(201).send({insertId: sucess.insertId});
        } else {
          res.status(500).send({message: 'Internal Error'});
        }
      },
      function(fail){
        res.status(500).send({message: 'Internal Error'});
      }
    );
}

/*
  DELETE /revuoj/:id
*/
var _deleteRevuo = function(req, res) {
  Revuo.deleteRevuo(req.params.id).then(function(sucess){
    Revuo.findRevuoj(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  POST revuoj/:id/volumoj
*/
var _postVolumo = function(req, res) {
  Revuo.insertVolumo(req.body.numeroJaro, req.body.numeroEntute, req.body.enhavlisto, new Date(req.body.eldondato), req.params.id).then(
    function(sucess){
      if(sucess) {
        res.status(201).send({insertId: sucess.insertId});
      } else {
        res.status(500).send({message: 'Internal Error'});
      }
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'});
    }
  );
}

/*
  POST revuoj/volumoj/:id/:tipo
*/
var _postVolumoFiles = function(req, res) {
  file.writeFile('/volumoj', req.params.tipo + req.params.id, 'file', req, res);
}

/*
  GET /revuoj/volumoj/:id/:tipo
*/
var _getVolumoFiles = function(req, res) {
  var tipo = 'application/pdf';
  if(req.params.tipo == 'bildo') {
    tipo = 'image/png';
  }
  file.readFile('/volumoj/'+ req.params.tipo + req.params.id, tipo, res);
}

/*
  PUT revuoj/volumoj/:id
*/
var _updateVolumo = function(req, res) {
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Revuo.updateVolumo(req.params.id, req.body.kampo, req.body.valoro).then(
      function(sucess) {
        if (sucess) {
          res.status(200).send({message: "Ĝisdatigo sukcese farita"});
        } else {
          res.status(500).send({message: "Eraro en la servilo"});
        }
    });
  }
}

/*
  DELETE revuoj/volumoj/:id
*/
var _deleteVolumo = function(req, res) {
  Revuo.deleteVolumo(req.params.id).then(function(sucess){
    Revuo.findVolumoj(req.params.id, 'id').then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

var _getVolumoj = function(req, res) {
  Revuo.findVolumoj(req.params.id, 'idRevuo').then(function(sucess) {
    var volumoj = sucess;
    volumoj = volumoj.filter(query.search(req.query));
    res.status(200).send(volumoj);
  });
}

module.exports = {
  getRevuoj: _getRevuoj,
  postRevuo: _postRevuo,
  deleteRevuo: _deleteRevuo,
  postVolumo: _postVolumo,
  postVolumoFiles: _postVolumoFiles,
  getVolumoj: _getVolumoj,
  getVolumoFiles: _getVolumoFiles,
  updateVolumo: _updateVolumo,
  deleteVolumo: _deleteVolumo
}
