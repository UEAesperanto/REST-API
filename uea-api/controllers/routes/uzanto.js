var util = require('util');
var db = require('../../modules/db');

var _getUzantoj = function(req, res){
  var query = util.format('SELECT * FROM `uzanto`;')
  db.mysqlExec(query).then(function(result){
    res.send(result);
  });
}

var _getUzanto = function(req, res){
  var id = req.params.id;
  var query = util.format('SELECT * FROM `uzanto` WHERE `id` = %s;', id);
  db.mysqlExec(query).then(function(result){
    res.send(result);
  })
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
