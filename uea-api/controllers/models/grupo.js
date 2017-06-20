var util = require('util');
var db = require('../../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `grupo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `grupo`;');
  return db.mysqlExec(query);
}

var _findKategorio = function(kategorio){
  var query = util.format('SELECT A.id, A.nomo, A.priskribo FROM `grupo` A INNER JOIN `ref_grupo_grupa_kategorio`\
                           B ON (A.id = B.idGrupo) WHERE B.idGrupaKategorio=%s;', kategorio);
  return db.mysqlExec(query);
}

var _findLaboranoj = function(id) {
  var query = util.format('SELECT A.personanomo, A.familianomo, A.titolo, A.bildo, A.idNacialando,\
                           A.retposxto, B.respondeco, B.tasko FROM uzanto A INNER JOIN aneco B \
                           ON (A.id = B.idAno) WHERE B.idGrupo = %s;', id);
  return db.mysqlExec(query);
}

var _findAligxKotizoj = function(id){
  var query = util.format(' SELECT * FROM aneckotizo WHERE idGrupo=%s;', id);
  return db.mysqlExec(query);
}

var _insertMembreco = function(idAno, idGrupo, komencdato, findato, dumviva,
                               tasko, respondeco, idAsocio, idUrbo, idFako, observoj) {
  var query = util.format ('INSERT into aneco (idAno, idgrupo, komencdato, findato,\
                            dumviva, tasko, respondeco, idAsocio, idUrbo, idFako, observoj)\
                            VALUES(%s, %s, "%s", "%s", %s, "%s", "%s", %s, %s, %s, "%s");',
                            idAno, idGrupo, komencdato, findato, dumviva, tasko,
                            respondeco, idAsocio, idUrbo, idFako, observoj);
  query = query.replace(/undefined/g, 'NULL');
  query = query.replace(/"NULL"/g, 'NULL');
  console.log(query);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  findKategorio: _findKategorio,
  findAligxKotizoj: _findAligxKotizoj,
  findLaboranoj: _findLaboranoj,
  insertMembreco: _insertMembreco
}
