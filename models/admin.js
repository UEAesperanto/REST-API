var util = require('util');
var db = require('../modules/db');
var hash = require('../modules/hash');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `administranto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `administranto`;');
  return db.mysqlExec(query);
}

var _findUzantnomo = function(uzantnomo) {
  var query = util.format('SELECT * FROM `administranto` WHERE `uzantnomo` = "%s";',
                          uzantnomo);
  return db.mysqlExec(query);
}

var _insert = function(idUzantoAuxAsocio, uzantnomo, pasvorto) {
    var pasvortajDatumoj = hash.sha512(pasvorto, null);
    var query = util.format('INSERT INTO `administranto` (idUzantoAuxAsocio,\
                             uzantnomo, pasvortoHash, pasvortoSalt) \
                             VALUES (%s, "%s", "%s", "%s");', idUzantoAuxAsocio, uzantnomo,
                             pasvortajDatumoj.hash, pasvortajDatumoj.salt);
    query = query.replace(/undefined/g, 'NULL');
    return db.mysqlExec(query);
}

var _insertRajto = function (idAdmin, idRajto) {
  var query = util.format('INSERT INTO `ref_administranto_adminrajto`\
                          (idAdministranto, idAdminrajto)\
                           VALUES (%s, %s);', idAdmin, idRajto);
  return db.mysqlExec(query);
}

var _getRajtoj = function (idAdmin) {
  var query = util.format('SELECT * FROM `ref_administranto_adminrajto`\
                           WHERE `idAdministranto` = "%s";', idAdmin);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format('DELETE FROM `administranto` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `administranto` SET `%s` = "%s" WHERE `id` = %s;',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

module.exports = {
  insert: _insert,
  insertRajto: _insertRajto,
  find:_find,
  getRajtoj: _getRajtoj,
  update: _update,
  delete: _delete,
  findUzantnomo:_findUzantnomo
}
