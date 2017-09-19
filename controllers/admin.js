/*Libraries*/
var util = require('util');
var jwt  = require('jsonwebtoken');

/*Models*/
var Admin = require('../models/admin');

/*Config*/
var config = require('../config');

/*Modules*/
var query = require('../modules/query');
var hash = require('../modules/hash');

var _postAdmin = function (req, res) {
  var token = req.headers['x-access-token'];
  res.send({message: 'farota'});
}

var _ensaluti = function (req, res) {
  Admin.find().then(
    function(result) {
      if (result.length == 0) {
        Admin.insert(null, req.body.uzantnomo, req.body.pasvorto).then(
            function (result) {
                Admin.insertRajto(result.insertId,
                                  config.idAdministranto).then(
                function(sucess) {
                    res.status(201).send({message: 'Gratulon! La sistemo pretas por uzado.' +
                                                   ' Ensalutu denove por ekuzi.'});
                  });
          });
      } else {
          Admin.findUzantnomo(req.body.uzantnomo).then(
            function(sucess){
              if (sucess.length == 0) {
                res.status(401).send({message: 'La uzantnomo ne ekzistas'});
              }

              if (!hash.valigiPasvorto(sucess[0].pasvortoSalt, req.body.pasvorto,
                                        sucess[0].pasvortoHash)){
                res.status(401).send({message: 'Malkorekta pasvorto'});
              }

              var administranto = {
                id: sucess[0].id,
                uzantnomo: sucess[0].uzantnomo,
                permesoj: []
              };

              Admin.getRajtoj(sucess[0].id).then(
                function(sucess){
                  //res.status(200).send({message: sucess});
                  for (var i = 0; i < sucess.length; i++) {
                    administranto.permesoj[i] = (sucess[i].idAdminrajto);
                  }

                  // kaze uzanto estas trovita kaj pasvorto estas korekta
                  // oni kreas iun token
                  var token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});

                  res.status(200).send({token: token});
              });
            });
      }
  });
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
    });
}


module.exports = {
   postAdmin: _postAdmin,
   ensaluti: _ensaluti,
   agordita: _agordita
}
