var util = require('util');

/*config*/
var config = require('../config.js');

/*modules*/
var mail = require('../modules/mail');

var _mesagxi = function(req, res) {
  var to = util.format('{"%s" : "UEA-financoj"}', config.financaretadreso);
  var mailOptions = {
      to: JSON.parse(to),
      subject: req.body.temo,
      html: req.body.mesagxo
    }
  mail.sendiRetmesagxo(mailOptions);
  res.status(200).send({message: 'Sendita'});
}

module.exports = {
  mesagxi:_mesagxi
}
