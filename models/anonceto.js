var util = require('util');
var db = require('../modules/db');

var _insertTable = function(titolo, ligilo, priskribo, butono, gxis) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `anonceto`(titolo, ligilo, priskribo, \
                             butono, gxis)\
                             VALUES(%s, %s, %s, %s, %s);',
                             titolo, ligilo, priskribo, butono, gxis);
    return db.mysqlExec(query);
}

var _findTablej = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `anonceto` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `anonceto`;';
  }
  return db.mysqlExec(query);
}

var _deleteTable = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `anonceto` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateTable = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `anonceto` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertTable: _insertTable,
  findTablej: _findTablej,
  deleteTable: _deleteTable,
  updateTable: _updateTable
}
