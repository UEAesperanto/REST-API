var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `grupo` WHERE `id` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `grupo`;');
  return db.mysqlExec(query);
}

var _insert = function(mallongigilo, nomo, priskribo) {
  db.escapeArgs(arguments);
  var query = util.format('INSERT into `grupo` (mallongigilo, nomo, priskribo)\
                           VALUES(%s, %s, %s);',
                           mallongigilo, nomo, priskribo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format('DELETE FROM `grupo` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `grupo` SET %s = %s WHERE `id` = %s',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

var _findKategorio = function(kategorio){
  if(kategorio) {
    kategorio = db.escape(kategorio);
    var query = util.format('SELECT * FROM `grupo` A INNER JOIN `ref_grupo_grupa_kategorio`\
                           B ON (A.id = B.idGrupo) WHERE B.idGrupaKategorio=%s;', kategorio);
  } else
    var query = 'SELECT * FROM grupa_kategorio;';
  return db.mysqlExec(query);
}

var _findLaboranoj = function(id) {
  id =  db.escape(id);
  var query = util.format('SELECT A.personanomo, A.familianomo, A.titolo, A.bildo, A.idNacialando,\
                           A.retposxto, B.respondeco, B.tasko FROM uzanto A INNER JOIN aneco B \
                           ON (A.id = B.idAno) WHERE B.idGrupo = %s;', id);
  return db.mysqlExec(query);
}

var _insertRefKategorio = function(idGrupo, idKategorio) {
  db.escapeArgs(arguments);
  var query = util.format('INSERT INTO ref_grupo_grupa_kategorio ()\
                            VALUES (%s, %s);', idGrupo, idKategorio);
  return db.mysqlExec(query);
}

var _findAnoj = function(idGrupo) {
  if(idGrupo) {
    idGrupo = db.escape(idGrupo);
    var query = util.format("SELECT * FROM `uzanto` JOIN `uzantoAuxAsocio`\
                             ON uzanto.id = uzantoAuxAsocio.id \
                             JOIN `aneco` ON aneco.idAno\
                             = uzanto.id WHERE aneco.idGrupo = %s;", idGrupo);
  } else
    var query = "SELECT * FROM `uzanto` JOIN `aneco` on aneco.idAno = uzanto.id;";
  return db.mysqlExec(query);
}


module.exports = {
  find:_find,
  findAnoj: _findAnoj,
  insert: _insert,
  delete: _delete,
  update: _update,
  insertRefKategorio: _insertRefKategorio,
  findKategorio: _findKategorio,
  findLaboranoj: _findLaboranoj
}
