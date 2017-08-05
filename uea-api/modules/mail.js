/*Libraries*/
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

/*Config*/
var config = require('../config');


var transporter = nodemailer.createTransport(smtpTransport({
    host : config.sisRetServer,
    port: config.sisRetPorto,
    auth : {
        user : config.sisRetadreso,
        pass : config.sisRetPasvorto
    }
}));

/*var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  html: 'That was easy!'
};*/
var _sendiRetmesagxo = function(mailOptions) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  sendiRetmesagxo:_sendiRetmesagxo
}
