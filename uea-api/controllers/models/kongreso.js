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

module.exports = {
  find:_find,
  findKromaj: _findKromaj
}
