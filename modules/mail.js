var config = require('../config');
var request = require('request');

var headers = {
    'api-key': config.sendInBlueKey
};

var _sendiRetmesagxo = function(data) {
  data.from = [config.fromDefault, "UEA - Universala Esperanto-Asocio"];
  // var req = {
  //     hostname: 'api.sendinblue.com',
  //     path:'/v2.0/email',
  //     method: 'POST',
  //     headers: {'api-key': config.sendInBlueKey},
  //     body: data
  // };
  // console.log(req);
  //
  // var request = https.request(req);
  // request.on('error', function(err) {
  //   console.log(err);
  // });

  var options = {
      url: 'https://api.sendinblue.com/v2.0/email',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
  };

  function callback(error, response, body) {
      if (error) {
          console.log(error);
      }
  }

  request(options, callback);
}

module.exports = {
  sendiRetmesagxo:_sendiRetmesagxo
}
