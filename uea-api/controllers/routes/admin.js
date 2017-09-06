var util = require('util');
var Admin = require('../models/admin');
var query = require('../../modules/query');
var config = require('../../config');


var _postAdmin = function (req, res) {
  var token = req.headers['x-access-token'];

  if (token) {
    //farota
    res.status(200).send({agordita: false});
  } else {
    Admin.find().then(
      function(result) {
        if (result.length == 0) {
          Admin.insert(req.body.idUzantoAuxAsocio, req.body.uzantnomo,
                       req.body.pasvorto).then(
              function (result) {
                  Admin.insertRajto(result.insertId,
                                    config.idAdministranto).then(
                  function(sucess) {
                      res.status(201).send({message: 'Gratulon! La sistemo pretas por uzado.'});
                    });
            });
        }
        else {
          res.status(403).send({success: false, message: 'sen ĵetono (Token)'});
        }
      });
  }
}

var _ensaluti = function (req, res) {
  res.send({message: 'farota'});
}

var _agordita = function (req, res) {
  Admin.find().then(
    function(result) {
      if (result.length == 0) {
        res.status(200).send({agordita: false});
      }
      else {
        res.status(200).send({agordita: true});
      }
    }
  );
}

module.exports = {
   postAdmin: _postAdmin,
   ensaluti: _ensaluti,
   agordita: _agordita
}
