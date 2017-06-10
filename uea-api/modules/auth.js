var jwt    = require('jsonwebtoken');
var config = require('../config.js');

var _authorizeID = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: 'La ĵetono (token) ne estas korekta.' });
      } else {
        if(req.originalUrl.split('/').includes(decoded.id.toString())) {
           req.decoded = decoded;
           next();
        } else {
          return res.status(403).send({ success: false, message: 'La ĵetono (token) ne estas korekta.' });
        }
      }
    });

  } else {
    // Se ne estas token
    // return an error
    return res.status(400).send({
        success: false,
        message: 'Sen ĵetono (token).'
    });
  }
}

module.exports = {
  authorizeID: _authorizeID
}
