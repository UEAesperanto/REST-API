'use strict';
var crypto = require('crypto');


var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var _sha512 = function(password, salt){
    if (!salt) {
      var salt = genRandomString(16); /** Gives us salt of length 16 */
    }
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        hash:value
    };
};

function _valigiPasvorto (salt, password, hash) {
  var passwordData = _sha512(password, salt);
  if (passwordData.passwordHash == hash) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  valigiPasvorto : _valigiPasvorto,
  sha512: _sha512
}
