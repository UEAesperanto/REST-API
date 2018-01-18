var util = require('util');
//var Dissendo = require('../models/dissendo');
var query = require('../modules/query');

/*
  GET /dissendoj
*/
var _getDissendoj = function(req, res){
  // Dissendo.find().then(function(sucess){
  //       var dissendoj = sucess;
  //       dissendoj = asocioj.filter(query.search(req.query));
  //       res.status(200).send(dissendoj);
  // });
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
  //fari
  // Deve enviar através do module mail.sendiRetmesagxo que já está configurado para o sendinblue
}

var _getRetlistoj = function(req, res) {
  //fari
}

var _deleteRetlisto = function(req, res) {
  //fari
}

var _postRetlisto = function(req, res) {
  //fari
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
