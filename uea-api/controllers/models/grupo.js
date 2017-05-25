var util = require('util');
var db = require('../../modules/db');

var _asocioNull = function(){
  return {
    id : null,
    nomoLoka : null,
    nomoEo : null,
    landKodo : null
  }
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `grupo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `grupo`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find
}
