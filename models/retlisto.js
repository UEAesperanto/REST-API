var util = require('util');
var db = require('../modules/db');

var _retlistoNull = function(){
  return {
    nomo: null,
    priskribo : null,
  }
}

var _create = function(obj){
  var retlisto = _retlistoNull();
  keys = Object.keys(retlisto);
  for(i=0; i < keys.length; i++){
    retlisto[keys[i]] = obj[keys[i]];
  }
  return retlisto;
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `retlisto` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `retlisto`;');
  return db.mysqlExec(query);
}

var _insert = function(retlisto){
  var query = util.format(
    'INSERT INTO retlisto (nomo, priskribo)\
   VALUES ("%s", "%s");',
  retlisto.nomo, retlisto.priskribo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format(
  'DELETE FROM `retlisto` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  create: _create,
  insert: _insert,
  delete: _delete
}
