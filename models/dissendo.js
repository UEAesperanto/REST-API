var util = require('util');
var db = require('../modules/db');

var _find = function(id){
  if(id){
    id = db.escape(id);
    var query = util.format('SELECT * FROM `dissendo` WHERE `id` = %s;', id);
    console.log(query)
  }
  else
    var query = util.format('SELECT * FROM `dissendo`;');
  return db.mysqlExec(query);
}

var _insert = function(idRetlisto, dissendanto, dato, temo, teksto){
  db.escapeArgs(arguments);
  var query = util.format( 'INSERT INTO dissendo (idRetlisto, dissendanto, dato, temo, teksto)\
                            VALUES (%s, %s, %s, %s, %s);',
                            idRetlisto, dissendanto, dato, temo, teksto );

  return db.mysqlExec(query);
}

module.exports = {
  find: _find,
  insert: _insert
}
