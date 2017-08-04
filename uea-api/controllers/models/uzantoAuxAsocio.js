var util = require('util');
var db = require('../../modules/db');
var hash = require('../../modules/hash');


var _insert = function(uzantnomo, pasvorto) {
    var pasvortajDatumoj = hash.sha512(pasvorto, null);
    var query = util.format('INSERT INTO `uzantoAuxAsocio` (ueakodo, uzantnomo, pasvortoHash, pasvortoSalt) \
                             VALUES (NULL, "%s", "%s", "%s");', uzantnomo, pasvortajDatumoj.hash, pasvortajDatumoj.salt);
    return db.mysqlExec(query);
}

var _findUzantnomo = function(uzantnomo) {
  var query = util.format('SELECT * FROM `uzantoAuxAsocio` WHERE `uzantnomo` = "%s";', uzantnomo);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `uzantoAuxAsocio` SET `%s` = "%s" WHERE `id` = %s', kampo, valoro, id);
  return db.mysqlExec(query);
}

module.exports = {
  insert:_insert,
  findUzantnomo: _findUzantnomo,
  update: _update
}
