var util = require('util');
var db = require('../modules/db');

var _insertTable = function(nomo, priskribo) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `faktemo`(nomo, priskribo)\
                             VALUES(%s, %s);', nomo, priskribo);

    return db.mysqlExec(query);
}

var _findTablej = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `faktemo` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `faktemo`;';
  }
  return db.mysqlExec(query);
}

var _deleteTable = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `faktemo` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateTable = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `faktemo` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertTable: _insertTable,
  findTablej: _findTablej,
  deleteTable: _deleteTable,
  updateTable: _updateTable
}
