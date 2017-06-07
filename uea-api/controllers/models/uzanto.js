var util = require('util');
var db = require('../../modules/db');

var _insert = function(id, personanomo, familianomo, titolo,
                       bildo, adreso, posxtkodo, idNacialando, idUrbo,
                       naskigxtago, notoj, retposxto, telhejmo,
                       teloficejo, telportebla,  tttpagxo) {
    var query = util.format('INSERT INTO uzanto(id, personanomo, familianomo, titolo,\
                            bildo, adreso, posxtkodo, idNacialando, idUrbo\
                            naskigxtago, notoj, retposxto, telhejmo,\
                            teloficejo, telportebla,  tttpagxo, validaKonto)\
                            VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s",\
                            "%s", "%s", "%s", "%s", "%s", "%s", 1)',
                            id, personanomo, familianomo, titolo,
                            bildo, adreso, posxtkodo, idNacialando, idUrbo,
                            naskigxtago, notoj, retposxto, telhejmo,
                            teloficejo, telportebla,  tttpagxo);

    return db.mysqlExec(query);
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `uzanto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `uzanto`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  insert: _insert,
}
