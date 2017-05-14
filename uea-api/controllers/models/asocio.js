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

var _findTejo = function(id){
  if(id){
    var query = util.format('SELECT * FROM `asocio` WHERE `id` = %s AND `junulara` = 1;', id);
  }
  else{
    var query = util.format('SELECT * FROM `asocio` WHERE `junulara` = 1;');
  }
  return db.mysqlExec(query);
}

var _findUea = function(id){
  if(id){
    var query = util.format('SELECT * FROM `asocio` WHERE `id` = %s AND `junulara` = 0;', id);
  }
  else{
    var query = util.format('SELECT * FROM `asocio` WHERE `junulara` = 0;');
  }
  return db.mysqlExec(query);
}

var _findLando = function(id){
  var query = util.format('SELECT * FROM `asocio` WHERE `landokodo` = %s;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `asocio` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `asocio`;');
  return db.mysqlExec(query);
}

module.exports = {
  find:_find,
  findTejo:_findTejo,
  findUea:_findUea,
  findLando:_findLando
}
