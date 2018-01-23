var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id){
    id = db.escape(id);
    var query = util.format('SELECT * FROM `retlisto` WHERE `id` = %s;', id);
  }
  else
    var query = util.format('SELECT * FROM `retlisto`;');
  return db.mysqlExec(query);
}

var _getEmails = function(id){
  id = db.escape(id);
  var query = util.format('SELECT retadreso FROM `retlist_abono` WHERE `idRetlisto` = %s;', id);
  return db.mysqlExec(query);
}


var _insert = function(nomo, priskribo){
  db.escapeArgs(arguments);
  var query = util.format( 'INSERT INTO retlisto (nomo, priskribo) VALUES (%s, %s);', nomo, priskribo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format('DELETE FROM `retlisto` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  insert: _insert,
  delete: _delete,
  getEmails:_getEmails
}
