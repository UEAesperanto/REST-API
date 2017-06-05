var util = require('util');
var db = require('../../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `kongreso` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `kongreso`;');
  return db.mysqlExec(query);
}

var _findKromaj = function(id){
  var query = util.format('SELECT * FROM kongreso A INNER JOIN ref_kongreso_kroma_kongreso B on (A.id = B.id_kroma_kongreso) WHERE B.id_cxefa_kongreso = %s;', id);
  return db.mysqlExec(query);
}

var _findAligxintoj = function(id){
  var query = util.format('SELECT A.personanomo,  A.familianomo,  A.titolo, A.nacialando  FROM uzanto A INNER JOIN kongresa_aligxinto B on (A.id = B.idUzanto) WHERE B.idKongreso = %s;', id);
  return db.mysqlExec(query);
}

var _findAligxikotizoj = function(id){
  var query = util.format('SELECT *  FROM kongresa_aligxkotizo WHERE idKongreso = %s;', id);
  return db.mysqlExec(query);
}

var _findProgrameroj = function(id) {
  var query = util.format('SELECT *  FROM kongresa_programo WHERE idKongreso = %s;', id);
  return db.mysqlExec(query);
}

var _findProgramejoj = function(id) {
  var query = util.format('SELECT *  FROM kongresa_programejo WHERE idKongreso = %s;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  findKromaj: _findKromaj,
  findAligxintoj: _findAligxintoj,
  findProgrameroj: _findProgrameroj,
  findProgramejoj: _findProgramejoj,
  findAligxikotizoj: _findAligxikotizoj
}
