var util = require('util');
var db = require('../modules/db');

var _insertKotizo = function(idLando, prezo, idGrupo, junaRabato) {
  db.escapeArgs(arguments);
  var query = util.format('INSERT INTO `aneckotizo`\
                           (idLando, prezo, idGrupo, junaRabato)\
                           VALUES (%s, %s, %s, %s);',
                          idLando, prezo, idGrupo, junaRabato);

  return db.mysqlExec(query);
}

var _insertFaktemo  = function(idAneco, idFaktemo) {
  db.escapeArgs(arguments);
  var query = util.format('INSERT INTO `ref_faktemo_aneco`\
                           (idAneco, idFaktemo)\
                           VALUES (%s, %s);',
                          idAneco, idFaktemo);
   return db.mysqlExec(query);
}

var _findGrupo = function(idGrupo){
  idGrupo = db.escape(idGrupo);
  var query = util.format('SELECT * FROM `aneckotizo` JOIN `grupo`\
                           ON aneckotizo.idGrupo = grupo.id \
                           WHERE idGrupo = %s;', idGrupo);
  return db.mysqlExec(query);
}

var _updateKotizo = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `aneckotizo` SET %s = %s WHERE id = %s;',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}


var _insertAneco = function(idAno, idGrupo, komencdato, findato, dumviva, tasko,
                            respondeco, idAsocio, idUrbo, observoj, aprobita) {
  db.escapeArgs(arguments);
  var query = util.format ('INSERT into aneco (idAno, idGrupo, komencdato, findato,\
                            dumviva, tasko, respondeco, idAsocio, idUrbo, observoj, aprobita)\
                            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);',
                            idAno, idGrupo, komencdato, findato, dumviva, tasko,
                            respondeco, idAsocio, idUrbo, observoj, aprobita);
  return db.mysqlExec(query);
}

var _findAnecGrupo = function(idGrupo){
  idGrupo = db.escape(idGrupo);
  var query = util.format('SELECT grupo.* FROM `aneco` JOIN `grupo` ON \
                           aneco.idGrupo = grupo.id WHERE aneco.id = %s;',
                           idGrupo);
  return db.mysqlExec(query);
}

var _updateAneco = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `aneco` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

var _deleteAneco = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `aneco` WHERE `id` = %s;', id);
  return db.mysqlExec(query);
}

module.exports = {
  insertKotizo: _insertKotizo,
  findGrupo: _findGrupo,
  deleteAneco: _deleteAneco,
  updateKotizo: _updateKotizo,
  updateAneco: _updateAneco,
  insertFaktemo: _insertFaktemo,
  findAnecGrupo: _findAnecGrupo,
  insertAneco: _insertAneco
}
