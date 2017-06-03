var util = require('util');
var db = require('../../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `grupo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `grupo`');
  return db.mysqlExec(query);
}


var _findKategorio = function(kategorio){
  var query = util.format('SELECT A.id, A.nomo, A.priskribo FROM `grupo` A INNER JOIN `ref_grupo_grupa_kategorio` B ON (A.id = B.idGrupo) WHERE B.idGrupaKategorio=%s;', kategorio);
  return db.mysqlExec(query);
}

var _findEstraranoj = function() {
  var query = util.format('SELECT A.personanomo, A.familianomo, A.titolo, A.bildo, A.nacialando, A.retposxto, B.respondeco, B.tasko FROM uzanto A INNER JOIN aneco B ON (A.id = B.idAno) WHERE B.idGrupo = 1;');
  return db.mysqlExec(query);
}


module.exports = {
  find:_find,
  findKategorio: _findKategorio,
  findEstraranoj: _findEstraranoj
}
