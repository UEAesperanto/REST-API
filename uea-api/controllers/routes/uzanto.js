var util = require('util');
var Uzanto = require('../models/uzanto');
var db = require('../../modules/db');

/*
  GET /uzanto
*/
var _getUzantoj = function(req, res){
  Uzanto.find().then(function(sucess){
        var uzantoj = sucess;
        res.send(uzantoj);
  });
}

/*
  GET /uzanto/:id
*/
var _getUzanto = function(req, res){
  Uzanto.find(req.params.id).then(function(sucess){
      var uzanto = sucess;
      res.send(uzanto);
  });
}

var _postUzanto = function(req, res){
//fari
}

var _deleteUzanto = function(req, res){
//fari
}

var _updateUzanto = function(req, res){
//fari
}

module.exports = {
  getUzantoj: _getUzantoj,
  getUzanto: _getUzanto,
  postUzanto: _postUzanto,
  deleteUzanto:_deleteUzanto,
  updateUzanto:_updateUzanto,
}
