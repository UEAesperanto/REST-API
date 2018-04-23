var util = require('util');
var Table = require('../models/anonceto');
var query = require('../modules/query');


/*
  GET /tablej
*/
var _getTablej = function(req, res) {
  Table.findTablej().then(function(sucess) {
    var tablej = sucess;
    tablej = tablej.filter(query.search(req.query));
    res.status(200).send(tablej);
  });
}

/*
  GET /tablej/:id
*/
var _getTable = function(req, res){
  Table.findTablej(req.params.id).then(function(sucess){
      var table = sucess;
      table = table.filter(query.search(req.query));
      res.status(200).send(table);
  });
}

/*
  POST /tablej
*/
var _postTable = function(req, res) {
    Table.insertTable(req.body.titolo, req.body.ligilo, req.body.priskribo,
                      req.body.butono, req.body.gxis).then(
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
  DELETE /tablej/:id
*/
var _deleteTable = function(req, res) {
  Table.deleteTable(req.params.id).then(function(sucess){
    Table.findTablej(req.params.id).then(function(sucess){
      if(sucess.length <= 0)
        res.status(204).send({message: 'Ok'});
      else
        res.status(500).send({message: 'Internal Error'});
    });
  });
}

/*
  PUT tablej/:id
*/
var _putTable = function(req, res) {
  if (req.body.kampo == 'id') {
    res.status(403).send({message: "vi ne povas ŝanĝi la ID"});
  } else {
    Table.updateTable(req.params.id, req.body.kampo, req.body.valoro).then(
      function(sucess) {
        if (sucess) {
          res.status(200).send({message: "Ĝisdatigo sukcese farita"});
        } else {
          res.status(500).send({message: "Eraro en la servilo"});
        }
    });
  }
}

module.exports = {
  getTablej: _getTablej,
  getTable: _getTable,
  postTable: _postTable,
  deleteTable: _deleteTable,
  putTable: _putTable
}
