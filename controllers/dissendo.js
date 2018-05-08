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
  Abonanto.insert(req.params.id, new Date(req.body.ekde), req.body.formato_html,
                  req.body.kodigxo_utf8, req.body.retadreso).then(function(sucess) {
    if(sucess) {
      res.status(201).send(sucess);
    } else {
      res.status(500).send({message: 'Internal Error'});
    }
  });
}


var _getAbonanto = function (req, res) {
  Abonanto.find().then(function(sucess){
    var retlistoj = sucess;
    retlistoj = retlistoj.filter(query.search(req.query));
    res.status(200).send(retlistoj);
  });
}

/*
  DELETE /dissendo/retlistoj/:id/abonantoj
*/
var _deleteAbonanto = function(req, res) {
 //fari
}

module.exports = {
  getDissendoj: _getDissendoj,
  postDissendo: _postDissendo,
  getRetlistoj: _getRetlistoj,
  deleteRetlisto: _deleteRetlisto,
  postRetlisto: _postRetlisto,
  postAbonanto: _postAbonanto,
  deleteAbonanto: _deleteAbonanto,
  getAbonanto: _getAbonanto
}
