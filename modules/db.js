var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: 'root',
  database: 'uea',
  typeCast: function castField( field, useDefaultTypeCasting ) {

        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

            var bytes = field.buffer();

            // A Buffer in Node represents a collection of 8-bit unsigned integers.
            // Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            return( bytes[ 0 ] === 1 );

        }

        return( useDefaultTypeCasting() );

}
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
