/*config*/
var config = require('../config.js');

/*modules*/
var mail = require('../modules/mail');

var _mesagxi = function(req, res) {
  var mailOptions = {
      from: 'reto@uea.org',
      to: config.financaretadreso,
      subject: req.body.temo,
      html: req.body.mesagxo
    }
  mail.sendiRetmesagxo(mailOptions);
  res.status(200).send({message: 'Sendita'});
}

module.exports = {
  mesagxi:_mesagxi
}
