var util = require('util');
var db = require('../modules/db');
 
var _insertGxiro = function(idGxiranto, idRicevanto, kialo, traktita, aligxo, kvanto, valuto, pagmaniero) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `gxirpropono`\
    (idGxiranto, idRicevanto, kialo, traktita, aligxo, kvanto, valuto, pagmaniero)\
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s);', 
    idGxiranto, idRicevanto, kialo, traktita, aligxo,
    kvanto, valuto, pagmaniero);
    return db.mysqlExec(query);
}

var _findGxiroj = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `gxirpropono` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `gxirpropono`;';
  }
  return db.mysqlExec(query);
}

var _deleteGxiro = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `gxirpropono` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateGxiro = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `gxirpropono` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertGxiro: _insertGxiro,
  findGxiroj: _findGxiroj,
  deleteGxiro: _deleteGxiro,
  updateGxiro: _updateGxiro
}
