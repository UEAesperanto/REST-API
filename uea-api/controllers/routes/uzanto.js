/*Libraries*/
var util = require('util');
var jwt  = require('jsonwebtoken');
var randomstring = require("randomstring");

/*config*/
var config = require('../../config.js');

/*models*/
var Uzanto = require('../models/uzanto');
var UzantoAuxAsocio = require('../models/uzantoAuxAsocio');

/*modules*/
var db = require('../../modules/db');
var query = require('../../modules/query');
var hash = require('../../modules/hash');
var mail = require('../../modules/mail');

/*
  POST - /uzantoj/ensaluti
*/
var _ensaluti = function(req, res) {
  UzantoAuxAsocio.findUzantnomo(req.body.uzantnomo).then(
    function(sucess) {

      if (sucess.length == 0) {
        res.status(401).send({message: 'la uzantnomo ne ekzistas'});
      }

      if (! hash.valigiPasvorto(sucess[0].pasvortoSalt, req.body.pasvorto, sucess[0].pasvortoHash)) {
        res.status(401).send({message: 'Malkorekta pasvorto'});
      }

      var uzanto = {
        id: sucess[0].id,
        uzantnomo: sucess[0].uzantnomo,
        permeso: 'uzanto'
      };

      // kaze uzanto estas trovita kaj pasvorto estas korekta
      // oni kreas iun token
      var token = jwt.sign(uzanto, config.sekretoJWT, {expiresIn: 18000});

      res.status(200).send({token: token});
    });
}

/*
  GET /uzantoj/:id
*/
var _getUzanto = function(req, res){
  Uzanto.find(req.params.id).then(function(sucess){
      var uzanto = sucess;
      res.status(200).send(uzanto);
  });
}

var _postUzanto = function(req, res){

   UzantoAuxAsocio.insert(req.body.uzantnomo, req.body.pasvorto).then(
    function (result){
      if (result) {
        Uzanto.insert(result.insertId, req.body.personanomo, req.body.familianomo, req.body.titolo,
                      req.body.bildo, req.body.adreso, req.body.posxtkodo, req.body.idNacialando,
                      req.body.naskigxtago, req.body.notoj, req.body.retposxto, req.body.telhejmo,
                      req.body.teloficejo, req.body.telportebla,  req.body.tttpagxo).then(
              function(success) {
                res.status(201).send({id: result.insertId});
              },
              function (fail) {
                res.status(500).send({message: 'Internal Error'});
              }
            );
      }
      else {
        res.status(400).send({message: "La uzantnomo jam ekzistas je nia sistemo"});
      }
    });
}

var _forgesisPasvorton = function(req, res) {
    Uzanto.findForgesis(req.body.retposxto, req.body.naskigxtago).then(
      function(sucess) {
        if (sucess.length > 0) {
          var novaPasvorto = randomstring.generate(10);
          var pasvortajDatumoj = hash.sha512(novaPasvorto, null);
          UzantoAuxAsocio.update(sucess[0].id, 'pasvortoSalt', pasvortajDatumoj.salt);
          UzantoAuxAsocio.update(sucess[0].id, 'pasvortoHash', pasvortajDatumoj.hash);
          UzantoAuxAsocio.find(sucess[0].id).then(
          function (sucess) {
              var html = util.format(
                     'Saluton! <br><br>\
                      Via uzantnomo por membrspaco ĉe UEA estas: %s <br>\
                      La pasvorto por via membrspaco ĉe UEA estas nun: %s  <br> \
                      Ni rekomendas tuj ŝanĝi tiun pasvorton je ensaluto en la membra retejo. \
                      <br><br>Kunlabore,<br><br>\
                      La UEA-Teamo', sucess[0].uzantnomo, novaPasvorto);
              var mailOptions = {
                  from: 'reto@uea.org',
                  to: req.body.retposxto,
                  subject: 'Vi forgesis vian pasvorton por membro.uea.org',
                  html: html
                }
              mail.sendiRetmesagxo(mailOptions)
              res.status(200).send({message: 'Nova pasvorto estis sendita al via retpoŝto'});
        });
      }
        else {
          res.status(400).send({message: "Ne ekzistas uzantoj kun la indikitaj datumoj je la sistemo"});
        }
      }
    );
}

var _updateUzanto = function(req, res){
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi vian ID"})
  }
  Uzanto.update(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess) {
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
  });
}

module.exports = {
  forgesisPasvorton:_forgesisPasvorton,
  getUzanto: _getUzanto,
  postUzanto: _postUzanto,
  updateUzanto: _updateUzanto,
  ensaluti: _ensaluti
}
