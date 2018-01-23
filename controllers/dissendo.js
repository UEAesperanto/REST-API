var util = require('util');

/*models*/
var Dissendo = require('../models/dissendo');
var Retlisto = require('../models/retlisto');
var Abonanto = require('../models/abonanto');
var query = require('../modules/query');
var mail = require('../modules/mail');

/*
  GET /dissendoj
*/
var _getDissendoj = function(req, res){
  Dissendo.find().then(function(sucess){
         var dissendoj = sucess;
         dissendoj = dissendoj.filter(query.search(req.query));
         res.status(200).send(dissendoj);
  });
}

/*
  POST /dissendoj
  body:
  @idRetlisto
  @dissendanto
  @html
  @temo
  @dato
  @text
*/
var _postDissendo = function(req, res){
  var novaDissendo = Dissendo.create(req.body);
  Dissendo.insert(novaDissendo).then(
    function(sucess){
      Retlisto.getEmails(novaDissendo.idRetlisto).then(function(list){ //Get All emails from Retlisto ID
        var keys = Object.keys(list);
        for(i=0; i < list.length; i++){
          var retadreso = list[keys[i]].retadreso;
          var to = util.format('{"%s" : "UEA-membro"}', retadreso);
          var mailOptions = {
              to: JSON.parse(to),
              subject: novaDissendo.temo,
              html: novaDissendo.teksto
            }

          mail.sendiRetmesagxo(mailOptions);
        }
        res.status(201).send(novaDissendo);
      })
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'})
    }
  );
  //fari
  // Deve enviar através do module mail.sendiRetmesagxo que já está configurado para o sendinblue
}

var _getRetlistoj = function(req, res) {
  Retlisto.find().then(function(sucess){
         var retlistoj = sucess;
         retlistoj = retlistoj.filter(query.search(req.query));
         res.status(200).send(retlistoj);
  });
}

var _deleteRetlisto = function(req, res) {
  Retlisto.delete(req.params.id).then(function(sucess){
    Retlisto.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(200).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

var _postRetlisto = function(req, res) {
  var novaRetlisto = Retlisto.create(req.body);
  Retlisto.insert(novaRetlisto).then(
    function(sucess){
      res.status(201).send(novaRetlisto);
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'})
    }
  );
}

var _postAbonanto = function(req, res) {
  var novaAbonanto = Abonanto.create(req.body);
  Abonanto.insert(novaAbonanto).then(
    function(sucess){
      res.status(201).send(novaAbonanto);
    },
    function(fail){
      res.status(500).send({message: 'Internal Error'})
    }
  );
}

var _deleteAbonanto = function(req, res) {
 //fari
}

module.exports = {
  getDissendoj: _getDissendoj,
  postDissendo: _postDissendo,
  getRetlistoj: _getRetlistoj,
  deleteRetlisto: _deleteRetlisto,
  postRetlisto: _postRetlisto,
  postAbonanto: _postAbonanto,
  deleteAbonanto: _deleteAbonanto
}
