var util = require('util');
var db = require('../modules/db');

var _insert = function(valuto, radikoEo, finajxoEo, landkodo){
  db.escapeArgs(arguments);
  var query = util.format(
  'INSERT INTO lando (valuto, radikoEO, finajxoEO, landkodo)\
   VALUES (%s, %s, %s, %s);',
    valuto, radikoEo, finajxoEo, landkodo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format(
  'DELETE FROM `lando` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `lando` WHERE `id` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `lando`;');
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `lando` SET %s = %s WHERE `id` = %s',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert:_insert,
  delete:_delete,
  update: _update
}
