/*Libraries*/
var util = require('util');
var jwt  = require('jsonwebtoken');

/*Models*/
var Admin = require('../models/admin');

/*Config*/
var config = require('../../config');

/*Modules*/
var query = require('../../modules/query');
var hash = require('../../modules/hash');

var _postAdmin = function (req, res) {
  Admin.insert(null, req.body.uzantnomo, req.body.pasvorto).then(
      function(sucess) {
        res.status(201).send(sucess);
    });
}

/*
  POST /Admin/ensaluti
*/
var _ensaluti = function (req, res) {
  Admin.find().then(
    function(result) {
      if (result.length == 0) {
        Admin.insert(null, req.body.uzantnomo, req.body.pasvorto).then(
            function (result) {
                Admin.insertRajto(result.insertId,
                                  config.idAdministranto).then(
                function(sucess) {
                    res.status(201).send({message: 'Gratulon! La sistemo pretas por uzado. \
                                                    Ensalutu denove por ekuzi.'});
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
                  var token = jwt.sign(administranto, config.sekretoJWT,
                                       {expiresIn: 18000});

                  res.status(200).send({token: token});
              });
            });
      }
  });
}

/*
  GET /Agordita
*/
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

/*
  GET /Admin
*/
var _getAdmin = function(req, res){
  Admin.find().then(function(sucess){
        var admin = sucess;
        admin = admin.filter(query.search(req.query));
        res.status(200).send(admin);
  });
}

var _postRajto = function(req, res) {
  Admin.insertRajto(req.body.idUzantoAuxAsocio,
                    req.body.idRajto).then(
  function(sucess) {
      res.status(201).send({message: 'ok'});
    }).
    catch(function(response){
      res.status(500).send({message: 'Internal Error'});
    });
}

//Bezonas teston
var _deleteAdmin = function(req, res) {
  Admin.delete(req.params.id).then(function(sucess){
    Admin.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}


/*
  UPDATE /admin/:id
*/
var _updateAdmin = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"})
  }

  if (req.body.kampo == 'pasvorto') {
    var novaPasvorto = req.body.valoro;
    var pasvortajDatumoj = hash.sha512(novaPasvorto, null);
    Admin.update(req.params.id, 'pasvortoSalt', pasvortajDatumoj.salt);
    Admin.update(req.params.id, 'pasvortoHash', pasvortajDatumoj.hash);
    res.status(200).send({message: "Ĝisdatigo sukcese farita"});
  }

  Admin.update(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

module.exports = {
   postAdmin: _postAdmin,
   ensaluti: _ensaluti,
   agordita: _agordita,
   postRajto: _postRajto,
   getAdmin: _getAdmin,
   updateAdmin: _updateAdmin,
   deleteAdmin: _deleteAdmin
}
