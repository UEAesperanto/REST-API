var util = require('util');
var db = require('../modules/db');

var _insert = function(id, personanomo, familianomo, titolo,
                       bildo, adreso, posxtkodo, idLando,
                       naskigxtago, notoj, retposxto, telhejmo,
                       teloficejo, telportebla,  tttpagxo) {
    var query = util.format('INSERT INTO uzanto(id, personanomo, familianomo, titolo,\
                            bildo, adreso, posxtkodo, idLando,\
                            naskigxtago, notoj, retposxto, telhejmo,\
                            teloficejo, telportebla,  tttpagxo)\
                            VALUES(%s, "%s", "%s", "%s",\
                                   "%s", "%s", "%s", %s,\
                                   "%s", "%s", "%s", "%s",\
                                    "%s", "%s", "%s");',
                            id, personanomo, familianomo, titolo,
                            bildo, adreso, posxtkodo, idLando,
                            naskigxtago, notoj, retposxto, telhejmo,
                            teloficejo, telportebla,  tttpagxo);

    query = query.replace(/undefined/g, 'NULL');
    query = query.replace(/"NULL"/g, 'NULL');
    return db.mysqlExec(query);
}

var _find = function(kampo, valoro){
  if(kampo)
    var query = util.format('SELECT uzanto.*, lando.landkodo, lando.radikoEo, lando.finajxoEo, \
                             uzantoAuxAsocio.uzantnomo, uzantoAuxAsocio.ueakodo\
                             FROM `uzanto` JOIN `uzantoAuxAsocio` ON \
                             uzanto.id = uzantoAuxAsocio.id\
                             JOIN `lando` ON \
                             uzanto.idLando = lando.id WHERE uzanto.%s = "%s";', kampo, valoro);
  else
    var query = util.format('SELECT uzanto.*, lando.landkodo, lando.radikoEo, lando.finajxoEo,\
                             uzantoAuxAsocio.uzantnomo, uzantoAuxAsocio.ueakodo\
                             FROM `uzanto` JOIN `uzantoAuxAsocio` ON \
                             uzanto.id = uzantoAuxAsocio.id\
                             JOIN `lando` ON \
                             uzanto.idLando = lando.id;');
  return db.mysqlExec(query);
}

var _findForgesis = function(retposxto, naskigxtago) {
  var query = util.format('SELECT id FROM `uzanto` WHERE `retposxto` = "%s"\
                           AND `naskigxtago` = "%s";', retposxto, naskigxtago);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `uzanto` SET `%s` = "%s" WHERE `id` = %s', kampo, valoro, id);
  return db.mysqlExec(query);
}

var _findGrupoj = function(id) {
  var query = util.format('SELECT aneco.*, grupo.nomo  FROM `aneco` \
                           JOIN `uzanto` ON uzanto.id = aneco.idAno \
                           JOIN `grupo` ON grupo.id = aneco.idGrupo \
                           WHERE uzanto.id = %s;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert: _insert,
  update: _update,
  findGrupoj:_findGrupoj,
  findForgesis: _findForgesis
}
