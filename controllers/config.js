var config = require('../config');

var _getConfig = function(req, res) {
  //console.log(config.get(req.params.id));
  res.status(200).send({message:'farota'});
}

module.exports = {
  getConfig:_getConfig
}
