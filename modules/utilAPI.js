var config = require('../config');
var Grupo = require('../models/grupo');
var Uzanto = require('../models/uzanto');

function _cxuMembro(id) {
  return Uzanto.findGrupoj(id).then(function(sucess){
    var uzantgrupoj = sucess;
    return Grupo.findKategorio(config.idMembrecgrupo).then(function(sucess){
        var grupoj = sucess.map(function(e){return e.id});
        for(var i = 0; i < uzantgrupoj.length; i++) {
          if(grupoj.indexOf(uzantgrupoj[i].idGrupo) > -1) {
            var date = new Date();
            var findato = new Date(uzantgrupoj[i].findato);
            if((!uzantgrupoj[i].findato) || (date < findato)) {
              return true;
            } else {
              return false
            }
          }
        }
        return false;
    });
  });
}

module.exports = {
  cxuMembro: _cxuMembro
}
