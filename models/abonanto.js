var util = require('util');
var db = require('../modules/db');

var _abonantoNull = function(){
  return {
    ekde: null,
    formato_html: null,
    kodigxo_utf8: null,
    retadreso: null,
    idRetlisto: null
  };
}

var _create = function(obj){
  var abonanto = _abonantoNull();
  keys = Object.keys(abonanto);
  for(i=0; i < keys.length; i++){
    abonanto[keys[i]] = obj[keys[i]];
  }
  return abonanto;
}

var _find = function(id){
  if(id)
    var query = util.format('SELECT * FROM `retlist_abono` WHERE `id` = %s;', id);
  else
    var query = util.format('SELECT * FROM `retlist_abono`;');
  return db.mysqlExec(query);
}

var _insert = function(abonanto){
  var query = util.format(
    'INSERT INTO retlist_abono (ekde, formato_html, kodigxo_utf8, retadreso, idRetlisto)\
   VALUES ("%s", "%s", "%s","%s","%s");',
  abonanto.ekde, abonanto.formato_html, abonanto.kodigxo_utf8,abonanto.retadreso,abonanto.idRetlisto);
  return db.mysqlExec(query);
}

var _delete = function(id){
  var query = util.format(
  'DELETE FROM `retlist_abono` WHERE `id` = %s ;', id);
  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  create: _create,
  insert: _insert,
  delete: _delete
}
