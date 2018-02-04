var util = require('util');
var db = require('../modules/db');
 
var _insertTeko = function(titolo, elnomo, kodnomo, jaro, absnum, vido) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `teko`(titolo, elnomo, kodnomo, jaro, absnum, vido)\
                             VALUES(%s, %s, %s, %s, %s, %s);', titolo, elnomo, kodnomo, jaro, absnum, vido);

    return db.mysqlExec(query);
}

var _findTekoj = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `teko` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `teko`;';
  }
  return db.mysqlExec(query);
}

var _deleteTeko = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `teko` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateTeko = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `teko` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertTeko: _insertTeko,
  findTekoj: _findTekoj,
  deleteTeko: _deleteTeko,
  updateTeko: _updateTeko
}
