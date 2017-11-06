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

var _authorizeAdmin = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas korekta.'});
      } else {
        if(decoded.permesoj.indexOf(config.idAdministranto) > -1) {
           req.decoded = decoded;
           next();
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas korekta.'});
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

var _authorizeAdminJuna = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas korekta.'});
      } else {
        if(decoded.permesoj.indexOf(config.idAdministranto) > -1) {
           req.decoded = decoded;
           next();
        } else if (decoded.permesoj.indexOf(config.idJunaAdministranto) > -1) {
          var jaro = parseInt((new Date()).getFullYear());
          var junaJaro = jaro - config.junaAgxo;
          req.query.naskigxtago = new Date(junaJaro + '-01-01');
          req.decoded = decoded;
          next();
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas korekta.'});
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

var _authorizeSenKondicxo = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        req.decoded = null;
      } else {
        req.decoded = decoded;
      }
    });
  } else {
      req.decoded = null;
    }
    next();
  }

module.exports = {
  authorizeID: _authorizeID,
  authorizeSenKondicxo: _authorizeSenKondicxo,
  authorizeAdminJuna: _authorizeAdminJuna,
  authorizeAdmin: _authorizeAdmin
}
