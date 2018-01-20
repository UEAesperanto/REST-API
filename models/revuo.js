var util = require('util');
var db = require('../modules/db');

var _insertRevuo = function(titolo, fondjaro, issn) {
    titolo = db.escape(titolo);
    fondjaro = db.escape(fondjaro);
    issn = db.escape(issn);

    var query = util.format('INSERT INTO `revuo`(titolo, fondjaro, issn)\
                             VALUES(%s, %s, %s);', titolo, fondjaro, issn);

    return db.mysqlExec(query);
}

var _insertVolumo = function(numeroJaro, numeroEntute, enhavlisto, idRevuo) {
    numeroJaro = db.escape(numeroJaro);
    numeroEntute = db.escape(numeroEntute);
    enhavlisto = db.escape(enhavlisto);
    idRevuo = db.escape(idRevuo);

    var query = util.format('INSERT INTO `volumo`(numeroJaro, numeroEntute, \
                             enhavlisto, idRevuo) VALUES(%s, %s, %s, %s);',
                             numeroJaro, numeroEntute, enhavlisto, idRevuo);

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

var _deleteRevuo = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `revuo` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

module.exports = {
  insertRevuo: _insertRevuo,
  insertVolumo: _insertVolumo,
  findRevuoj: _findRevuoj,
  deleteRevuo: _deleteRevuo
}
