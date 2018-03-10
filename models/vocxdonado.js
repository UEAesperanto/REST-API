var util = require('util');
var db = require('../modules/db');
 
var _insertVocxdonado = function(titolo, priskribo, pluraj_opcioj, anonima, aperdato, limdato) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `vocxdonado`(titolo, priskribo, pluraj_opcioj, anonima, aperdato, limdato)\
                             VALUES(%s, %s, %s, %s, %s, %s);', titolo, priskribo, pluraj_opcioj, anonima, aperdato, limdato);

    return db.mysqlExec(query);
}

var _findVocxdonadoj = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `vocxdonado` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `vocxdonado`;';
  }
  return db.mysqlExec(query);
}

var _deleteVocxdonado = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `vocxdonado` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateVocxdonado = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `vocxdonado` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertVocxdonado: _insertVocxdonado,
  findVocxdonadoj: _findVocxdonadoj,
  deleteVocxdonado: _deleteVocxdonado,
  updateVocxdonado: _updateVocxdonado
}
