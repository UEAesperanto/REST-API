var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `grupo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `grupo`;');
  return db.mysqlExec(query);
}

var _insert = function(mallongigilo, nomo, priskribo) {
  var query = util.format('INSERT into `grupo` (mallongigilo, nomo, priskribo)\
                           VALUES("%s", "%s", "%s");',
                           mallongigilo, nomo, priskribo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format('DELETE FROM `grupo` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `grupo` SET `%s` = "%s" WHERE `id` = %s',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

var _findKategorio = function(kategorio){
  var query = util.format('SELECT A.id, A.mallongigilo, A.nomo, A.priskribo FROM `grupo` A INNER JOIN `ref_grupo_grupa_kategorio`\
                           B ON (A.id = B.idGrupo) WHERE B.idGrupaKategorio=%s;', kategorio);
  return db.mysqlExec(query);
}

var _findLaboranoj = function(id) {
  var query = util.format('SELECT A.personanomo, A.familianomo, A.titolo, A.bildo, A.idNacialando,\
                           A.retposxto, B.respondeco, B.tasko FROM uzanto A INNER JOIN aneco B \
                           ON (A.id = B.idAno) WHERE B.idGrupo = %s;', id);
  return db.mysqlExec(query);
}

var _insertRefKategorio = function(idGrupo, idKategorio) {
  var query = util.format('INSERT INTO ref_grupo_grupa_kategorio ()\
                            VALUES (%s, %s);', idGrupo, idKategorio);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert: _insert,
  delete: _delete,
  update: _update,
  insertRefKategorio: _insertRefKategorio,
  findKategorio: _findKategorio,
  findLaboranoj: _findLaboranoj
}
