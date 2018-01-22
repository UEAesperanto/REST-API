var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'uea'
});

var _escape = function(uzantQuery) {
  return connection.escape(uzantQuery);
}

var _escapeId = function(uzantQuery) {
  return connection.escapeId(uzantQuery);
}

var _escapeArgs = function(args) {
  for(var i = 0; i < args.length; i ++) {
    args[i] = _escape(args[i]);
  }
}

var _mysqlExec = function(query){
  return new Promise(function(resolve, reject){
    connection.query(query, function (err, results, fields) {
      resolve(results);
      return results;
    });
  });
}

module.exports = {
  mysqlExec:_mysqlExec,
  escape: _escape,
  escapeArgs: _escapeArgs,
  escapeId: _escapeId
}
