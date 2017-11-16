var config = require('../config');

var _getConfig = function(req, res) {
  switch(req.params.config) {
    case 'idLaborgrupo':
        res.status(200).send({'idLaborgrupo': config.idLaborgrupo});
        break;
    case 'idMembrecgrupo':
        res.status(200).send({'idMembrecgrupo': config.idMembrecgrupo});
        break;
    case 'idAldonaMembrecgrupo':
        res.status(200).send({'idAldonaMembrecgrupo': config.idAldonaMembrecgrupo});
        break;
    case 'idJunajGrupoj':
        res.status(200).send({'idJunajGrupoj': config.idJunajGrupoj});
        break;
    case 'idAdministranto':
        res.status(200).send({'idAdministranto': config.idAdministranto});
        break;
    case 'idJunaAdministranto':
        res.status(200).send({'idJunaAdministranto': config.idJunaAdministranto});
        break;
    case 'junaAgxo':
        res.status(200).send({'junaAgxo': config.junaAgxo});
        break;
    case 'idBazaMembreco':
        res.status(200).send({'idBazaMembreco': config.idBazaMembreco});
        break;
    default:
       res.status(404).send({'message': 'Ne trovita'});
  }
}

module.exports = {
  getConfig:_getConfig
}
