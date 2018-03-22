var util = require('util');
var db = require('../modules/db');
var hash = require('../modules/hash');

var _find = function(id){
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `administranto` WHERE `id` = %s;', id);
  }
  else
    var query = util.format('SELECT * FROM `administranto`;');
  return db.mysqlExec(query);
}

var _findUzantnomo = function(uzantnomo) {
  uzantnomo = db.escape(uzantnomo);
  var query = util.format('SELECT * FROM `administranto` WHERE `uzantnomo` = %s;',
                          uzantnomo);
  return db.mysqlExec(query);
}

var _insert = function(idUzantoAuxAsocio, uzantnomo, pasvorto) {
    var pasvortajDatumoj = hash.sha512(pasvorto, null);
    idUzantoAuxAsocio = db.escape(idUzantoAuxAsocio);
    uzantnomo = db.escape(uzantnomo);
    pasvortajDatumoj.hash = db.escape(pasvortajDatumoj.hash);
    pasvortajDatumoj.salt = db.escape(pasvortajDatumoj.salt);
    var query = util.format('INSERT INTO `administranto` (idUzantoAuxAsocio,\
                             uzantnomo, pasvortoHash, pasvortoSalt) \
                             VALUES (%s, %s, %s, %s);', idUzantoAuxAsocio, uzantnomo,
                             pasvortajDatumoj.hash, pasvortajDatumoj.salt);
    return db.mysqlExec(query);
}

var _insertRajto = function (idAdmin, idRajto) {
  db.escapeArgs(arguments);
  var query = util.format('INSERT INTO `ref_administranto_adminrajto`\
                          (idAdministranto, idAdminrajto)\
                           VALUES (%s, %s);', idAdmin, idRajto);
  return db.mysqlExec(query);
}

var _getRajtojAdmin = function (idAdmin) {
  idAdmin = db.escape(idAdmin);

  var query = util.format('SELECT * FROM `ref_administranto_adminrajto` r JOIN\
                           `adminrajto` a ON r.idAdminrajto = a.id \
                           WHERE `idAdministranto` = %s;', idAdmin);
  return db.mysqlExec(query);
}

var _findRajtoj = function() {
  var query = util.format('SELECT * FROM `adminrajto`;');
  return db.mysqlExec(query);
}

var _delete = function(id){
  id = db.escape(id);
  var query = util.format('DELETE FROM `administranto` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `administranto` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}

module.exports = {
  insert: _insert,
  insertRajto: _insertRajto,
  find:_find,
  findRajtoj: _findRajtoj,
  getRajtojAdmin: _getRajtojAdmin,
  update: _update,
  delete: _delete,
  findUzantnomo:_findUzantnomo
}
