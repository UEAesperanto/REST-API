var util = require('util');
var db = require('../modules/db');

var _insertRevuo = function(titolo, fondjaro, ssn) {
    titolo = db.escape(titolo);
    fondjaro = db.escape(fondjaro);
    ssn = db.escape(ssn);

    var query = util.format('INSERT into `revuo`(titolo, fondjaro, ssn)\
                             VALUES(%s, %s, %s);', titolo, fondjaro, ssn);

    return db.mysqlExec(query);
}

module.exports = {
  insertRevuo:_insertRevuo
}
