var util = require('util');
var db = require('../modules/db');

var _insertKotizo = function(idLando, prezo, monero, idGrupo, junaRabato) {
  var query = util.format('INSERT INTO `aneckotizo`\
                           (idLando, prezo, monero, idGrupo, junaRabato)\
                           VALUES (%s, %s, "%s", %s, %s);',
                          idLando, prezo, monero, idGrupo, junaRabato);

  query = query.replace(/undefined/g, 'NULL');
  query = query.replace(/"NULL"/g, 'NULL');
  return db.mysqlExec(query);
}

var _findGrupo = function(idGrupo){
  var query = util.format('SELECT * FROM `aneckotizo` JOIN `grupo`\
                           ON aneckotizo.idGrupo = grupo.id \
                           WHERE idGrupo=%s;', idGrupo);
  return db.mysqlExec(query);
}

var _updateKotizo = function(id, kampo, valoro) {
  var query = util.format('UPDATE `aneckotizo` SET `%s` = "%s" WHERE `id` = %s;',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}


var _insertAneco = function(idAno, idGrupo, komencdato, findato, dumviva, tasko,
                            respondeco, idAsocio, idUrbo, idFako, observoj, aprobita) {
  var query = util.format ('INSERT into aneco (idAno, idgrupo, komencdato, findato,\
                            dumviva, tasko, respondeco, idAsocio, idUrbo, idFako, observoj, aprobita)\
                            VALUES(%s, %s, "%s", "%s", %s, "%s", "%s", %s, %s, %s, "%s", 0);',
                            idAno, idGrupo, komencdato, findato, dumviva, tasko, respondeco, idAsocio,
                            idUrbo, idFako, observoj);
  query = query.replace(/undefined/g, 'NULL');
  query = query.replace(/"NULL"/g, 'NULL');
  return db.mysqlExec(query);
}

var _findAnecpetoj = function() {
  var query = "SELECT * FROM `uzanto` JOIN `aneco` on aneco.idAno = uzanto.id;";
  return db.mysqlExec(query);
}

var _updateAneco = function(id, kampo, valoro) {
  var query = util.format('UPDATE `aneco` SET `%s` = "%s" WHERE `id` = %s;',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

module.exports = {
  insertKotizo: _insertKotizo,
  findGrupo: _findGrupo,
  updateKotizo: _updateKotizo,
  updateAneco: _updateAneco,
  findAnecpetoj: _findAnecpetoj,
  insertAneco: _insertAneco
}
