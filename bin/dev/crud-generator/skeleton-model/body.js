var _insertTable = function(CONLUMS_NAME) {
    db.escapeArgs(arguments);
    var query = util.format('INSERT INTO `table`(CONLUMS_NAME)\
                             VALUES(ESCAPE_STR);', CONLUMS_NAME);

    return db.mysqlExec(query);
}

var _findTablej = function(id) {
  if(id) {
    id = db.escape(id);
    var query = util.format('SELECT * FROM `table` WHERE id = %s;', id);
  } else {
    var query = 'SELECT * FROM `table`;';
  }
  return db.mysqlExec(query);
}

var _deleteTable = function(id) {
  id = db.escape(id);
  var query = util.format('DELETE FROM `table` WHERE id = %s;', id);
  return db.mysqlExec(query);
}

var _updateTable = function(id, kampo, valoro) {
  id = db.escape(id);
  kampo = db.escapeId(kampo);
  valoro = db.escape(valoro);

  var query = util.format('UPDATE `table` SET %s = %s WHERE `id` = %s;',
                           kampo, valoro, id);

  return db.mysqlExec(query);
}

module.exports = {
  insertTable: _insertTable,
  findTablej: _findTablej,
  deleteTable: _deleteTable,
  updateTable: _updateTable
}
