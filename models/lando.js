var util = require('util');
var db = require('../modules/db');

var _landoNull = function(){
  return {
    valuto : null,
    radikoEo : null,
    finajxoEo: null,
    landkodo : null
  }
}

var _create = function(obj){
  var lando = _landoNull();
  keys = Object.keys(lando);
  for(i=0; i < keys.length; i++){
    lando[keys[i]] = obj[keys[i]];
  }
  return lando;
}

var _insert = function(lando){
  var query = util.format(
  'INSERT INTO lando (valuto, radikoEO, finajxoEO, landkodo)\
   VALUES ("%s", "%s", "%s", "%s");',
  lando.valuto, lando.radikoEo, lando.finajxoEo, lando.landkodo);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format(
  'DELETE FROM `lando` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `lando` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `lando`;');
  return db.mysqlExec(query);
}

var _update = function(id, kampo, valoro) {
  var query = util.format('UPDATE `lando` SET `%s` = "%s" WHERE `id` = %s',
                           kampo, valoro, id);
  return db.mysqlExec(query);
}


module.exports = {
  find:_find,
  create:_create,
  insert:_insert,
  delete:_delete,
  update: _update
}
