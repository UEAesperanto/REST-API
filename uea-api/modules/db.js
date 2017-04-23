var mysql = require('mysql2');

var _connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'uea'
});

var _mysqlExec = function(query){
  return new Promise(function(resolve, reject){
    _connection.query(query, function (err, results, fields) {
      resolve(results);
    });
  });
}

module.exports = {
  mysqlExec:_mysqlExec,
  connection:_connection
}
