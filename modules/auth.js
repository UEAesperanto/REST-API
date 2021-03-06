var jwt    = require('jsonwebtoken');
var config = require('../config.js');

var _authorizeID = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
           message: 'La ĵetono (token) ne estas ĝusta.' });
      } else {
        if(req.originalUrl.split('/').includes(decoded.id.toString())) {
           if(req.method == "PUT"){
             var permesatajKampoj = ["uzantnomo", "pasvorto", "retposxto",
                                     "tttpagxo", "telhejmo", "teloficejo",
                                     "telportebla", "titolo"];
             if(permesatajKampoj.indexOf(req.body.kampo) > -1) {
               req.decoded = decoded;
               next();
             } else {
               return res.status(403).send({ success: false,
                  message: 'Vi ne rajtas ĝisdatigi tiun kampon.' });
             }
           } else {
             req.decoded = decoded;
             next();
           }
        } else {
          return res.status(403).send({ success: false,
             message: 'La ĵetono (token) ne estas ĝusta.' });
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

var _authorizeUzanto = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
           message: 'La ĵetono (token) ne estas ĝusta.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

var _authorizeMembro = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas ĝusta.'});
      } else {
        if(decoded.permesoj) {
          if((decoded.permesoj.indexOf('membro') > -1)
             ||(decoded.permesoj.indexOf(config.idAdministranto) > -1)
             || (decoded.permesoj.indexOf(config.idKomunikisto) > -1)) {
             req.decoded = decoded;
             next();
          } else {
            return res.status(403).send({ success: false,
              message: 'La ĵetono (token) ne estas ĝusta.'});
          }
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas ĝusta.'});
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
          message: 'La ĵetono (token) ne estas ĝusta.'});
      } else {
        if(decoded.permesoj) {
          if(decoded.permesoj.indexOf(config.idAdministranto) > -1) {
             req.decoded = decoded;
             next();
          } else {
            return res.status(403).send({ success: false,
              message: 'La ĵetono (token) ne estas ĝusta.'});
          }
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas ĝusta.'});
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

var _authorizeAdminKomunikisto = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas ĝusta.'});
      } else {
        if(decoded.permesoj) {
          if((decoded.permesoj.indexOf(config.idAdministranto) > -1) ||
             (decoded.permesoj.indexOf(config.idKomunikisto) > -1)) {
             req.decoded = decoded;
             next();
          } else {
            return res.status(403).send({ success: false,
              message: 'La ĵetono (token) ne estas ĝusta.'});
          }
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas ĝusta.'});
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

var _authorizeAdminFinancoj = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.sekretoJWT, function(err, decoded) {
      if (err) {
        return res.status(403).send({ success: false,
          message: 'La ĵetono (token) ne estas ĝusta.'});
      } else {
        if(decoded.permesoj) {
          if((decoded.permesoj.indexOf(config.idAdministranto) > -1) ||
             (decoded.permesoj.indexOf(config.idFinancoj) > -1)) {
             req.decoded = decoded;
             next();
          } else {
            return res.status(403).send({ success: false,
              message: 'La ĵetono (token) ne estas ĝusta.'});
          }
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas ĝusta.'});
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
          message: 'La ĵetono (token) ne estas ĝusta.'});
      } else {
        if(decoded.permesoj) {
          if((decoded.permesoj.indexOf(config.idAdministranto) > -1) ||
            (decoded.permesoj.indexOf(config.idFinancoj) > -1)) {
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
              message: 'La ĵetono (token) ne estas ĝusta.'});
          }
        } else {
          return res.status(403).send({ success: false,
            message: 'La ĵetono (token) ne estas ĝusta.'});
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
  authorizeAdmin: _authorizeAdmin,
  authorizeAdminKomunikisto: _authorizeAdminKomunikisto,
  authorizeUzanto: _authorizeUzanto,
  authorizeMembro: _authorizeMembro,
  authorizeAdminFinancoj: _authorizeAdminFinancoj
}
