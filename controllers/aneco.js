/*Libraries*/
var util = require('util');

/*models*/
var Aneco = require('../models/aneco');
var Uzanto = require('../models/uzanto');

/*modules*/
var query = require('../modules/query');
var mail = require('../modules/mail');

/*Configuration*/
var config = require('../config');
var configMail = require('../configMail.js');

/*
   GET /grupo/membrecoj/:id/kotizoj
*/
var _getKotizoj = function(req, res){
  Aneco.findKotizoj(req.params.id).then(function(sucess){
        var kotizoj = sucess;
        kotizoj = kotizoj.filter(query.search(req.query));
        res.status(200).send(kotizoj);
  });
}

/*
   POST /grupo/membrecoj/:id/kotizoj
*/
var _postKotizo = function(req, res){
  Aneco.insertKotizo(req.body.idLando, req.body.prezo,
                     req.params.id, req.body.junaRabato)
             .then(function(sucess) {
                    if(sucess) {
                      res.status(201).send(sucess);
                    } else {
                      res.status(500).send({message: 'Internal Error'});
                    }
              });
}

/*
  UPDATE /grupo/:id/kotizoj
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

var _deleteAneco = function(req, res) {
  Aneco.deleteAneco(req.params.id).then(
    function(sucess) {
      if(sucess) {
        Uzanto.find('id', req.params.id).then(function(sucess){
            if(sucess && sucess[0].retposxto) {
              var html = util.format(configMail.membrecVisxita,
                                     sucess[0].personanomo, req.body.anecnomo);
              var to = util.format('{"%s" : "%s"}', sucess[0].retposxto, sucess[0].personanomo);
              var mailOptions = {
                  to: JSON.parse(to),
                  subject: util.format('%s aneco viŝita', req.body.anecnomo),
                  html: html
                }
              mail.sendiRetmesagxo(mailOptions);
          }
        });
        res.status(204).send({message: 'Ok'});
      } else {
        res.status(500).send({message: "Eraro en la servilo"});
      }
    }
  );
}

var _updateAneco = function(req, res) {
  Aneco.updateAneco(req.params.id, req.body.kampo, req.body.valoro).then(
    function(sucess) {
      if (sucess && req.body.kampo != "notoj") {
        Uzanto.find('id', req.params.id).then(function(sucess){
          if(sucess[0].retposxto) {
            var html = "";
            Aneco.findAnecGrupo(req.params.id).then(function(response){
              switch(req.body.kampo) {
                case "aprobita":
                  if(req.body.valoro == true) {
                   html = util.format(configMail.membrecAprobita, sucess[0].personanomo,
                                      response[0].nomo);
                  } else{
                    html = util.format(configMail.membrecMalaprobita, sucess[0].personanomo,
                                       response[0].nomo);
                  }
                break;
                case "findato":
                    var valoro = "";
                    if(req.body.valoro == null) {
                      valoro = "la fino de via vivo (dumvive)";
                    } else {
                      var v = req.body.valoro;
                      valoro = v[6] + v[7] + '/' + v[4] + v[5] + '/' +
                               v[0] + v[1] + v[2] + v[3] + '(TT/MM/JJJJ)';
                    }
                    html = util.format(configMail.membrecRenovigita, sucess[0].personanomo,
                                       response[0].nomo, valoro);
                break;
              }
              var to = util.format('{"%s" : "%s"}', sucess[0].retposxto, sucess[0].personanomo);
              var mailOptions = {
                  to: JSON.parse(to),
                  subject: util.format('Ĝisdatigo en via membrecstatuso por %s', response[0].nomo),
                  html: html
                }
              mail.sendiRetmesagxo(mailOptions);
          });
         }
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
      });
    }
  });
}

module.exports = {
  getKotizoj: _getKotizoj,
  postKotizo: _postKotizo,
  deleteAneco: _deleteAneco,
  updateAneco:  _updateAneco,
  updateKotizo:  _updateKotizo
}
