var util = require('util');
var db = require('../modules/db');
var hash = require('../modules/hash');


var _insert = function(uzantnomo, pasvorto, ueakodo) {
  ueakodo = db.escape(ueakodo);
  if(uzantnomo && pasvorto) {
      uzantnomo = db.escape(uzantnomo);
      var pasvortajDatumoj = hash.sha512(pasvorto, null);
      pasvortajDatumoj.hash = db.escape(pasvortajDatumoj.hash);
      pasvortajDatumoj.salt = db.escape(pasvortajDatumoj.salt);
      var query = util.format('INSERT INTO `uzantoAuxAsocio` \
                               (ueakodo, uzantnomo, pasvortoHash, pasvortoSalt) \
                               VALUES (%s, %s, "%s", "%s");', ueakodo,
                               uzantnomo, pasvortajDatumoj.hash, pasvortajDatumoj.salt);
  } else {
      var query = util.format("INSERT INTO `uzantoAuxAsocio`(ueakodo) VALUES(%s);", ueakodo);
  }

  return db.mysqlExec(query);
}

var _find = function(ueakodo) {
  if (ueakodo) {
    ueakodo = db.escape(ueakodo);
    var query = util.format('SELECT * FROM `uzantoAuxAsocio` WHERE `ueakodo` = %s;', ueakodo);
  } else {
    var query = util.format('SELECT * FROM `uzantoAuxAsocio`;');
  }
  return db.mysqlExec(query);
}

var _findUzantnomo = function(uzantnomo) {
  uzantnomo = db.escape(uzantnomo);
  var query = util.format('SELECT * FROM `uzantoAuxAsocio` WHERE `uzantnomo` = %s;', uzantnomo);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);
  var query = util.format('UPDATE `uzantoAuxAsocio` SET %s = %s WHERE `id` = %s;', kampo, valoro, id);
  return db.mysqlExec(query);
}

var _delete = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `uzantoAuxAsocio` WHERE `id` = %s;', id);
  return db.mysqlExec(query);
}

module.exports = {
  insert: _insert,
  findUzantnomo: _findUzantnomo,
  delete: _delete,
  update: _update,
  find: _find
}
