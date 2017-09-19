var util = require('util');
var db = require('../modules/db');

var _insert = function(id, personanomo, familianomo, titolo,
                       bildo, adreso, posxtkodo, idNacialando,
                       naskigxtago, notoj, retposxto, telhejmo,
                       teloficejo, telportebla,  tttpagxo) {
    var query = util.format('INSERT INTO uzanto(id, personanomo, familianomo, titolo,\
                            bildo, adreso, posxtkodo, idNacialando,\
                            naskigxtago, notoj, retposxto, telhejmo,\
                            teloficejo, telportebla,  tttpagxo, validaKonto)\
                            VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", %s, "%s",\
                            "%s", "%s", "%s", "%s", "%s", "%s", 0);', //Novaj kontoj ne estas validitaj
                            id, personanomo, familianomo, titolo,
                            bildo, adreso, posxtkodo, idNacialando,
                            naskigxtago, notoj, retposxto, telhejmo,
                            teloficejo, telportebla,  tttpagxo);

    query = query.replace(/undefined/g, 'NULL');
    query = query.replace(/"NULL"/g, 'NULL');
    return db.mysqlExec(query);
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT  * FROM `uzanto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `uzanto`;');
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

module.exports = {
  find:_find,
  insert: _insert,
  update: _update,
  findForgesis: _findForgesis
}
