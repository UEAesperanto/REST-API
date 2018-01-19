var util = require('util');

/*models*/
var Dissendo = require('../models/dissendo');
var Retlisto = require('../models/retlisto');
var query = require('../modules/query');

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
  @html
  @subject
  @dato
  @text
*/
var _postDissendo = function(req, res){
  var novaDissendo = Dissendo.create(req.body);
  Dissendo.insert(novaDissendo).then(
    function(sucess){
      res.status(201).send(novaDissendo);
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
  //fari
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
  //fari
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
