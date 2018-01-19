/*libraries*/
var util = require('util');

/*models*/
var Revuo = require('../models/revuo');

/*Modules*/
var query = require('../modules/query');

/*
  GET /revuoj
*/
var _getRevuoj = function(req, res) {
  Revuo.findRevuoj().then(function(sucess) {
    var revuoj = sucess;
    revuoj = revuoj.filter(query.search(req.query));
    res.status(200).send(revuoj);
  });
}

/*
  POST /revuoj
*/
var _postRevuo = function(req, res) {
    Revuo.insertRevuo(req.body.titolo, req.body.fondjaro, req.body.issn).then(
      function(sucess){
        if(sucess) {
          res.status(201).send({insertId: sucess.insertId});
        } else {
          res.status(500).send({message: 'Internal Error'});
        }
      },
      function(fail){
        res.status(500).send({message: 'Internal Error'});
      }
    );
}

/*
  PUT /revuoj
*/
var _updateRevuo = function(req, res) {

}

/*
  DELETE /revuoj
*/
var _deleteRevuo = function(req, res) {

}

/*
  POST revuoj/:id/volumoj
*/
var _postVolumo = function(req, res) {

}

/*
  GET /revuoj/:id/volumoj
*/
var _getVolumo = function(req, res) {

}

/*
  PUT revuoj/volumoj/:id
*/
var _updateVolumo = function(req, res) {

}

/*
  DELETE revuoj/volumoj/:id
*/
var _deleteVolumo = function(req, res) {

}

var _getVolumojInfo = function(req, res) {

}

module.exports = {
  getRevuoj: _getRevuoj,
  postRevuo: _postRevuo,
  updateRevuo: _updateRevuo,
  deleteRevuo: _deleteRevuo,
  postVolumo: _postVolumo,
  getVolumojInfo: _getVolumojInfo,
  getVolumo: _getVolumo,
  updateVolumo: _updateVolumo,
  deleteVolumo: _deleteVolumo
}
