var util = require('util');
var db = require('../../modules/db');
var hash = require('../../modules/hash');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `administranto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `administranto`;');
  return db.mysqlExec(query);
}


var _insert = function(idUzantoAuxAsocio, uzantnomo, pasvorto) {
    var pasvortajDatumoj = hash.sha512(pasvorto, null);
    var query = util.format('INSERT INTO `administranto` (idUzantoAuxAsocio, uzantnomo, pasvortoHash, pasvortoSalt) \
                             VALUES (%s, "%s", "%s", "%s");', idUzantoAuxAsocio, uzantnomo,
                             pasvortajDatumoj.hash, pasvortajDatumoj.salt);
    query = query.replace(/undefined/g, 'NULL');
    return db.mysqlExec(query);
}

var _insertRajto = function (idAdmin, idRajto) {
  var query = util.format('INSERT INTO `ref_administranto_adminrajto` (idAdministranto, idAdminrajto)\
                           VALUES (%s, %s);', idAdmin, idRajto);
  return db.mysqlExec(query);
}

module.exports = {
  insert: _insert,
  insertRajto: _insertRajto,
  find:_find
}
