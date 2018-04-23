/*Libraries*/
var util = require('util');
var jwt  = require('jsonwebtoken');
var randomstring = require('randomstring');
var bodyParser = require('body-parser');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var urllib = require('urllib');

/*config*/
var config = require('../config.js');
var configMail = require('../configMail.js');

/*models*/
var Uzanto = require('../models/uzanto');
var UzantoAuxAsocio = require('../models/uzantoAuxAsocio');
var Grupo = require('../models/grupo');
var Aneco = require('../models/aneco');

/*modules*/
var query = require('../modules/query');
var hash = require('../modules/hash');
var mail = require('../modules/mail');
var file = require('../modules/file');
var auth = require('../modules/auth');


var proviMalnovaRetejo = function(uzantnomo, pasvorto, cres) {
  var options = {
     "method":"POST",
     "data": {"salvt": uzantnomo, "pvorto": pasvorto,
              "submetu": "KLAKU+POR+ENIRI"},
      "jar": true
  };
  urllib.request('http://reto.uea.org/index.php?a=persone', options,
    function (err, data, res) {
      var options2 = {
                      "method": "GET",
                      "headers":{"Cookie": res.headers['set-cookie'][0].split(';')[0]}
                    };
      urllib.request('http://reto.uea.org/index.php?a=persone', options2, function (err, data, res) {
        if(data) {
          var data = data.toString();
          var indexOf = data.indexOf('UEA-kodo');
          if(indexOf > -1) {
            ueakodo = data.substring(indexOf + 20, indexOf + 26).replace("-", "");
            UzantoAuxAsocio.find(ueakodo).then(function(response){
              if(response.length == 1) {
                var id = response[0].id;
                var p1 = UzantoAuxAsocio.update(id, 'uzantnomo', uzantnomo);
                var pasvortajDatumoj = hash.sha512(pasvorto, null);
                var p2 = UzantoAuxAsocio.update(id, 'pasvortoSalt', pasvortajDatumoj.salt);
                var p3 = UzantoAuxAsocio.update(id, 'pasvortoHash', pasvortajDatumoj.hash);
                Promise.all([p1, p2, p3]).then(function(values) {
                  var uzanto = {
                    id: id,
                    uzantnomo: uzantnomo,
                    permeso: 'uzanto'
                  };
                  // kaze uzanto estas trovita kaj pasvorto estas korekta
                  // oni kreas iun token
                  var token = jwt.sign(uzanto, config.sekretoJWT, {expiresIn: "30d"});
                  res.status(200).send({token: token, uzanto: sucess[0]});
                });
              } else {
                cres.status(401).send({message: 'Viaj datumoj ne estas en nia nova sistemo, \
                                                bonvole, kontaktu sekretario@co.uea.org\
                                                kaj informu vian UEA-kodo'});
              }
            });
          } else {
            cres.status(401).send({message: 'La salutvorto aŭ pasvorto ne estas korekta'});
          }
        } else {
          cres.status(401).send({message: 'La salutvorto aŭ pasvorto ne estas korekta'});
        }
     });
   });
}

/*
  POST - /uzantoj/ensaluti
*/
var _ensaluti = function(req, res) {
  UzantoAuxAsocio.findUzantnomo(req.body.uzantnomo).then(
    function(sucess) {
      if (sucess.length == 0) {
         proviMalnovaRetejo(req.body.uzantnomo, req.body.pasvorto, res);
      } else {
        if (!hash.valigiPasvorto(sucess[0].pasvortoSalt, req.body.pasvorto,
                                  sucess[0].pasvortoHash)) {
          res.status(401).send({message: 'Malkorekta pasvorto'});
        }
        var uzanto = {
          id: sucess[0].id,
          uzantnomo: sucess[0].uzantnomo,
          permeso: 'uzanto'
        };

        // kaze uzanto estas trovita kaj pasvorto estas korekta
        // oni kreas iun token
        var token = jwt.sign(uzanto, config.sekretoJWT, {expiresIn: "30d"});
        res.status(200).send({token: token, uzanto: sucess[0]});
    }
  });
}

/*
  GET /uzantoj/:id
*/
var _getUzanto = function(req, res){
  Uzanto.find('id', req.params.id).then(function(sucess){
      var uzanto = sucess;
      res.status(200).send(uzanto);
  });
}

var _getUzantoj = function(req, res){
  Uzanto.find().then(function(sucess){
      var uzanto = sucess;
      res.status(200).send(uzanto);
  });
}

function makeUEAkodo() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var _postUzanto = function(req, res){
  Uzanto.find('retposxto', req.body.uzantnomo).then(function(result) {
    if(result[0]) {
      res.status(200).send({id: result[0].id});
    } else{
      UzantoAuxAsocio.find().then(function(result){
        var ueakodoj = [];
        result.map(function(item){ueakodoj.push(item.ueakodo)});
        if(req.body.ueakodo) {
          ueakodo = req.body.ueakodo;
        } else {
          var ueakodo = "";
          while(true) {
            ueakodo = makeUEAkodo();
            if(ueakodoj.indexOf(ueakodo) < 0) {
              break;
            }
          }
        }
        UzantoAuxAsocio.insert(req.body.uzantnomo, req.body.pasvorto, ueakodo).then(function (result){
           if (result) {
             Uzanto.insert(result.insertId, req.body.personanomo, req.body.familianomo, req.body.titolo,
                           req.body.bildo, req.body.adreso, req.body.posxtkodo, req.body.idLando,
                           req.body.naskigxtago, req.body.notoj, req.body.retposxto, req.body.telhejmo,
                           req.body.teloficejo, req.body.telportebla, req.body.tttpagxo, req.body.urbo).then(
                function(success) {
                     var html = util.format(configMail.registriUzanton, req.body.personanomo);
                     var to = util.format('{"%s" : "%s"}', req.body.retposxto, req.body.personanomo);
                     var mailOptions = {
                         to: JSON.parse(to),
                         subject: 'Nova aliĝo',
                         html: html
                       };
                     mail.sendiRetmesagxo(mailOptions);
                     res.status(201).send({id: result.insertId});
                   },
                   function (fail) {
                     res.status(500).send({message: 'Internal Error'});
                   });
              }
         });
      });
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
            if(req.body.retposxto) {
                var html = util.format(configMail.novaPasvorto, novaPasvorto);
                var to = util.format('{"%s" : "UEA-membro"}', req.body.retposxto);
                var mailOptions = {
                    to: JSON.parse(to),
                    subject: 'Restarigo de la forgesita pasvorto por UEA',
                    html: html
                  }
                mail.sendiRetmesagxo(mailOptions);
              }
            res.status(200).send({message: 'Nova pasvorto estis sendita al via retpoŝto'});
        });
      }
      else {
          res.status(400).send({message: "Ne ekzistas uzantoj kun la indikitaj datumoj je la sistemo"});
      }
  });
}

var _updateUzanto = function(req, res){
  var sciigi = new Promise(
    function(resolve, reject) {
      Uzanto.find('id', req.params.id).then(function(sucess){
        if(sucess[0].retposxto) {
          var uzanto = sucess[0];
          if(req.body.kampo == "pasvorto") {
            var valoro = "kaŝita pasvorto"
          } else {
            var valoro = req.body.valoro;
          }
          var html = util.format(configMail.updateUzanto, uzanto.personanomo, req.body.kampo, valoro);
          var to = util.format('{"%s" : "%s"}', uzanto.retposxto, uzanto.personanomo);
          var mailOptions = {
              to: JSON.parse(to),
              subject: 'Ĝisdatigo de datumoj en via profilo ĉe UEA',
              html: html
            }
          mail.sendiRetmesagxo(mailOptions);
          resolve();
        } else {
          resolve();
        }
      });
    });

  sciigi.then(function() {
      if (req.body.kampo == 'id') {
        res.status(403).send({message: "vi ne povas ŝanĝi vian ID"});
        return;
      }

      if (req.body.kampo == 'pasvorto') {
        var novaPasvorto = req.body.valoro;
        var pasvortajDatumoj = hash.sha512(novaPasvorto, null);
        UzantoAuxAsocio.update(req.params.id, 'pasvortoSalt', pasvortajDatumoj.salt);
        UzantoAuxAsocio.update(req.params.id, 'pasvortoHash', pasvortajDatumoj.hash);
        res.status(200).send({message: "Ĝisdatigo sukcese farita"});
        return;
      }

      if((req.body.kampo == 'ueakodo') || (req.body.kampo == 'uzantnomo')) {
        UzantoAuxAsocio.update(req.params.id, req.body.kampo, req.body.valoro).then(
          function(sucess){
            if(sucess) {
              res.status(200).send({message: "Ĝisdatigo sukcese farita"});
            } else {
              res.status(500).send({message: "Eraro en la servilo"});
            }
          });
          return;
      }

      Uzanto.update(req.params.id, req.body.kampo, req.body.valoro).then(
        function(sucess) {
          if (sucess) {
            res.status(200).send({message: "Ĝisdatigo sukcese farita"});
          } else {
            res.status(500).send({message: "Eraro en la servilo"});
          }
      });
    });
}

var _cxuMembro = function(req, res) {
  if(!req.params.retposxto) {
    res.status(200).send({membroID: false});
  }

  Uzanto.find('retposxto', req.params.retposxto).then(
    function(sucess){
      if(sucess && sucess.length >= 1) {
        var id = sucess[0].id;
        Grupo.findKategorio(config.idMembrecgrupo).then(function(sucess){
            var grupoj = sucess;
            var promises = [];
            for(var i = 0; i < grupoj.length; i++) {
              promises.push(Grupo.findAnoj(grupoj[i].id));
            }
            Promise.all(promises).then(function(values){
              for(var i = 0; i < values.length; i++) {
                 var ano = values[i].filter(query.search({idAno:id}));
                 if(ano.length >= 1) {
                   var result = {uzantoID: id,
                                 membro: true,
                                 idGrupo: ano[0].idGrupo,
                                 komencdato: ano[0].komencdato,
                                 dumviva: parseInt(ano[0].dumviva.toString('hex')),
                                 aprobita: parseInt(ano[0].aprobita.toString('hex')),
                                 findato: ano[0].findato};
                   result = result.filter(query.search(req.query));
                   res.status(200).send(result);
                   return;
                  }
              }
              res.status(200).send({uzantoID: id, membro: false});
            });
        });
      } else {
        res.status(200).send({uzantoID: -1, membro: false});
      }
    });
}

var _postBildo = function(req, res) {
  file.writeFile('/uzantbildoj', 'uzantbildo' + req.params.id, 'file', req, res);
}

var _getBildo = function(req, res) {
  file.readFile('/uzantbildoj/uzantbildo' + req.params.id, 'image/png', res);
}

var _getGrupoj = function(req,res) {
  Uzanto.findGrupoj(req.params.id).then(function(sucess){
    res.status(200).send(sucess);
  });
}

var _delete = function(req, res) {
  UzantoAuxAsocio.delete(req.params.id).then(function(sucess){
    UzantoAuxAsocio.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0){
        Uzanto.delete(req.params.id).then(function(sucess){
          Uzanto.find('id', req.params.id).then(function(sucess){
            if(sucess.length <= 0)
              res.status(204).send({message: 'Ok'});
            else
              res.status(500).send({message: 'Internal Error'});
          });
        });
      } else {
        res.status(500).send({message: 'Internal Error'});
      }
    });
  });
}

var _adapti = function(req, res) {
  UzantoAuxAsocio.insert(null, null, req.body.ueakodo).then(
    function(result){
      if (result) {
        var id = result.insertId;
        Uzanto.insert(result.insertId, req.body.personanomo,
                      req.body.familianomo, req.body.titolo,
                      req.body.bildo, req.body.adreso,
                      req.body.posxtkodo, req.body.idLando,
                      req.body.naskigxtago, req.body.notoj,
                      req.body.retposxto, req.body.telhejmo,
                      req.body.teloficejo, req.body.telportebla,
                      req.body.tttpagxo, req.body.urbo).then(
                        function(result){
                          if(result) {
                            res.status(201).send({message: 'Ok', id: id});
                          } else {
                            res.status(500).send({message: 'Internal error'});
                          }
                        });
      } else {
        UzantoAuxAsocio.find(req.body.ueakodo).then(function(sucess){
            res.status(200).send(sucess);
        });
      }
  });
}

var _ensalutiSenPasvorto = function(req, res){
    Uzanto.find('retposxto', req.user.displayName).then(function(sucess){
      var params = '';
        if (sucess.length < 1) {
          params = "?message=Ne estas membroj kun tiu retpoŝtadreso en nia sistemo";
        } else if(sucess.length > 1) {
         params = "?message=Estas pli ol 1 uzanto kies tiu retpoŝtadreso estis indikita. Provu\
                   ensaluti pere de uzantnomo kaj pasvorto aŭ skribu al sekretario@co.uea.org\
                   por informi al kiu tiu retpoŝtadreso vere apartenas";
        } else {
          var uzanto = {
            id: sucess[0].id,
            uzantnomo: sucess[0].uzantnomo,
            permeso: 'uzanto'
          };
          var token = jwt.sign(uzanto, config.sekretoJWT, {expiresIn: 18000});
          params = '?token=' + token +'&id=' + sucess[0].id
        }
        res.redirect(req.session.returnTo || config.loginURL + params)
    });
}

module.exports = {
  forgesisPasvorton:_forgesisPasvorton,
  getGrupoj:_getGrupoj,
  postBildo: _postBildo,
  getBildo: _getBildo,
  getUzanto: _getUzanto,
  postUzanto: _postUzanto,
  updateUzanto: _updateUzanto,
  ensaluti: _ensaluti,
  cxuMembro: _cxuMembro,
  adapti: _adapti,
  ensalutiSenPasvorto: _ensalutiSenPasvorto,
  getUzantoj: _getUzantoj,
  delete: _delete
}
