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


module.exports = {
  find:_find,
  findKategorio: _findKategorio
}
