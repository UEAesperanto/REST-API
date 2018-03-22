var util = require('util');
var db = require('../modules/db');

var _insertRevuo = function(titolo, fondjaro, issn) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `revuo`(titolo, fondjaro, issn)\
                             VALUES(%s, %s, %s);', titolo, fondjaro, issn);

    return db.mysqlExec(query);
}

var _insertVolumo = function(numeroJaro, numeroEntute, enhavlisto, eldondato, idRevuo) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `volumo`(numeroJaro, numeroEntute, \
                             enhavlisto, eldondato, idRevuo) VALUES(%s, %s, %s, %s, %s);',
                             numeroJaro, numeroEntute, enhavlisto, eldondato,idRevuo);
    return db.mysqlExec(query);
}

var _findRevuoj = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `revuo` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `revuo`;';
  }
  return db.mysqlExec(query);
}

var _findVolumoj = function(id, idKio) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `volumo` WHERE %s = %s;', idKio, id);
  } else {
    var query = 'SELECT * FROM `volumo`;';
  }
  return db.mysqlExec(query);
}

var _deleteRevuo = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `revuo` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _deleteVolumo = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `volumo` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateVolumo = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `volumo` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertRevuo: _insertRevuo,
  deleteVolumo: _deleteVolumo,
  insertVolumo: _insertVolumo,
  findRevuoj: _findRevuoj,
  findVolumoj: _findVolumoj,
  updateVolumo: _updateVolumo,
  deleteRevuo: _deleteRevuo
}
