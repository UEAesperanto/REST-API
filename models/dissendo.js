var util = require('util');
var db = require('../modules/db');



var _dissendoNull = function(){
  return {
    dissendanto : null,
    idRetlisto : null,
    dato : null,
    temo: null,
    teksto : null
  }
}

var _create = function(obj){
  var dissendo = _dissendoNull();
  keys = Object.keys(dissendo);
  for(i=0; i < keys.length; i++){
    dissendo[keys[i]] = obj[keys[i]];
  }
  return dissendo;
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `dissendo` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `dissendo`;');
  return db.mysqlExec(query);
}

var _insert = function(dissendo){
  var query = util.format(
  'INSERT INTO dissendo (dissendanto, dato, temo, teksto)\
   VALUES ("%s", "%s", "%s", "%s");',
  dissendo.dissendanto, dissendo.dato, dissendo.temo, dissendo.teksto);
  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  create: _create,
  insert: _insert
}
