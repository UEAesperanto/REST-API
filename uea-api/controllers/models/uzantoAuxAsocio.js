var util = require('util');
var db = require('../../modules/db');


var _insert = function(uzantnomo, pasvorto) {
    var query = util.format('INSERT INTO uzantoAuxAsocio (ueakodo, uzantnomo, pasvorto) \
                             VALUES (NULL, "%s", "%s");', uzantnomo, pasvorto);
    return db.mysqlExec(query);
}



module.exports = {
  insert:_insert
}
