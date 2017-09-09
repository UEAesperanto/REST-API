var jwt    = require('jsonwebtoken');
var config = require('../config.js');

var _authorizeID = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
           message: 'La ĵetono (token) ne estas korekta.' });
      } else {
        if(req.originalUrl.split('/').includes(decoded.id.toString())) {
           req.decoded = decoded;
           next();
        } else {
          return res.status(403).send({ success: false,
             message: 'La ĵetono (token) ne estas korekta.' });
        }
      }
    });

  } else {
    // Se ne estas ĵetono
    // redonas eraron
    return res.status(400).send({
        success: false,
        message: 'Sen ĵetono (token).'
    });
  }
}

var _authorizeAdminPost = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        if(req.method == "GET") {
          req.decoded = decoded;
          next();
        }
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas korekta.' });
      } else {
        console.log(decoded.permesoj);
        if(1 == 1) {
           req.decoded = decoded;
           next();
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas korekta.'});
        }
      }
    });
  } else {
    if(req.method == "GET") {
      next();
    }
    else {
    // Se ne estas ĵetono
    // redonas eraron
    return res.status(400).send({
        success: false,
        message: 'Sen ĵetono (token).'
    });
  }
  }
}

module.exports = {
  authorizeID: _authorizeID,
  authorizeAdminPost: _authorizeAdminPost
}
