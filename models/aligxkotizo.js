
var util = require('util');
var db = require('../modules/db');

var _insert = function(idLando, prezo, monero, idGrupo) {
  var query = util.format('INSERT INTO `aneckotizo`(idLando, prezo, monero, idGrupo)\
                           VALUES (%s, %s, "%s", %s);', idLando, prezo, monero, idGrupo);
  return db.mysqlExec(query);
}

var _findGrupo = function(idGrupo){
  var query = util.format(' SELECT * FROM `aneckotizo` WHERE idGrupo=%s;', idGrupo);
  return db.mysqlExec(query);
}

module.exports = {
  insert: _insert,
  findGrupo: _findGrupo
}
