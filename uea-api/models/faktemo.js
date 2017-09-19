var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `faktemo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `faktemo`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find
}
