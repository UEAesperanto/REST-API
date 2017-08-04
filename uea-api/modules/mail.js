/*Libraries*/
var nodemailer = require('nodemailer');

/*Config*/
var config = require('../config');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.sisRetadreso,
    pass: config.sisPasvorto
  }
});

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
