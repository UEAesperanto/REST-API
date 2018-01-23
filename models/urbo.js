var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id){
    var query = util.format('SELECT * FROM `urbo` WHERE `id` = %s;', id);
  } else
    var query = util.format('SELECT * FROM `urbo`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find
}
