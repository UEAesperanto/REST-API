var util = require('util');

/*models*/
var Dissendo = require('../models/dissendo');
var Retlisto = require('../models/retlisto');
var Abonanto = require('../models/abonanto');
var query = require('../modules/query');
var mail = require('../modules/mail');

/*
  GET /dissendoj
*/
var _getDissendoj = function(req, res){
  Dissendo.find().then(function(sucess){
         var dissendoj = sucess;
         dissendoj = dissendoj.filter(query.search(req.query));
         res.status(200).send(dissendoj);
  });
}

/*
  GET /dissendoj/:id
*/
var _getDissendo = function(req, res){
  Dissendo.find(req.params.id).then(function(sucess){
      var lando = sucess;
      res.status(200).send(lando);
  });
}

/*
  POST /dissendoj
  body:
  @idRetlisto
  @dissendanto
  @html
  @temo
  @dato
  @text
*/
var _postDissendo = function(req, res){
  Dissendo.insert(req.body.idRetlisto, req.body.dissendanto,
                  req.body.dato, req.body.temo, req.body.teksto).then(function(sucess){
    if(sucess){
      Retlisto.getEmails(req.body.idRetlisto).then(function(list){ //Get All emails from Retlisto ID
        var keys = Object.keys(list);
        for(i=0; i < list.length; i++){
          var retadreso = list[keys[i]].retadreso;
          var to = util.format('{"%s" : "UEA-membro"}', retadreso);
          var mailOptions = {
              to: JSON.parse(to),
              subject: req.body.temo,
              html: req.body.teksto
            }

          mail.sendiRetmesagxo(mailOptions);
        }
        res.status(201).send(sucess);
      })
    }else{
      res.status(500).send({message: 'Internal Error'});
    }
  });
}


/*
  GET /dissendo/retlistoj
*/
var _getRetlistoj = function(req, res) {
  Retlisto.find().then(function(sucess){
         var retlistoj = sucess;
         retlistoj = retlistoj.filter(query.search(req.query));
         res.status(200).send(retlistoj);
  });
}

/*
  POST /dissendo/retlistoj
*/
var _postRetlisto = function(req, res) {
  Retlisto.insert(req.body.nomo, req.body.priskribo).then(function(sucess){
    if(sucess){
      res.status(201).send(sucess);
    }else{
      res.status(500).send({message: 'Internal Error'});
    }
  });
}

/*
  DELETE /dissendo/retlistoj/:id
*/
var _deleteRetlisto = function(req, res) {
  Retlisto.delete(req.params.id).then(function(sucess){
    Retlisto.find(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(200).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  POST /dissendo/retlistoj/:id/abonantoj
*/
var _postAbonanto = function(req, res) {
  Abonanto.insert(req.params.id, req.body.ekde, req.body.formato_html,
                  req.body.kodigxo_utf8, req.body.retadreso).then(function(sucess) {
    if(sucess) {
      res.status(201).send(sucess);
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}

var _getAbonantoj = function(req, res) {
  Abonanto.find('idRetlisto', req.params.id).then(function(sucess){
    if(sucess){
      res.status(201).send(sucess);
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}


var _getAbonanto = function(req, res) {
  Abonanto.find('idRetlisto', req.params.id).then(function(sucess){
    if(sucess){
      req.query.retadreso = req.params.retposxto;
      res.status(201).send(sucess.filter(query.search(req.query)));
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}


/*
  DELETE /dissendo/retlistoj/abonantoj/:idAbonanto
*/
var _deleteAbonanto = function(req, res) {
  Abonanto.delete(req.params.idAbonanto).then(function(sucess){
    if(sucess){
      res.status(202).send();
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}

module.exports = {
  getDissendoj: _getDissendoj,
  getDissendo:_getDissendo,
  postDissendo: _postDissendo,
  getAbonanto: _getAbonanto,
  getRetlistoj: _getRetlistoj,
  deleteRetlisto: _deleteRetlisto,
  postRetlisto: _postRetlisto,
  postAbonanto: _postAbonanto,
  getAbonantoj: _getAbonantoj,
  deleteAbonanto: _deleteAbonanto
}
