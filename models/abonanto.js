var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id){
    id = db.escape(id);
    var query = util.format('SELECT * FROM `retlist_abono` WHERE `id` = %s;', id);
  }
  else
    var query = util.format('SELECT * FROM `retlist_abono`;');
  return db.mysqlExec(query);
}

var _insert = function(idRetlisto, ekde, formato_html, kodigxo_utf8, retadreso){
  db.escapeArgs(arguments);
  var query = util.format( 'INSERT INTO retlist_abono (ekde, formato_html, kodigxo_utf8, \
                            retadreso, idRetlisto) VALUES (%s, %s, %s, %s, %s);',
                            ekde, formato_html, kodigxo_utf8, retadreso, idRetlisto);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format(
  'DELETE FROM `retlist_abono` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  insert: _insert,
  delete: _delete
}
