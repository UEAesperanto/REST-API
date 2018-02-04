var util = require('util');
var db = require('../modules/db');
 
var _insertOpcio = function(priskribo, idVocxdonado) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `opcio`(priskribo, idVocxdonado)\
                             VALUES(%s, %s);', priskribo, idVocxdonado);

    return db.mysqlExec(query);
}

var _findOpcioj = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `opcio` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `opcio`;';
  }
  return db.mysqlExec(query);
}

var _deleteOpcio = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `opcio` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateOpcio = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `opcio` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertOpcio: _insertOpcio,
  findOpcioj: _findOpcioj,
  deleteOpcio: _deleteOpcio,
  updateOpcio: _updateOpcio
}
