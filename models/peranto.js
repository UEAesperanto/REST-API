var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT id, publikaNomo, idLando, retadreso FROM \
                            `peranto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT id, publikaNomo, idLando, retadreso FROM `peranto`;');
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format('DELETE FROM `peranto` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _insert = function(publikaNomo, retadreso, idLando){
  var query = util.format('INSERT INTO `peranto` (publikaNomo, retadreso, idLando) \
                          VALUES ("%s", "%s", %s);', publikaNomo, retadreso, idLando);
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `peranto` SET `%s` = "%s" WHERE `id` = %s',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}


module.exports = {
  find:_find,
  delete:_delete,
  insert:_insert,
  update:_update
}
