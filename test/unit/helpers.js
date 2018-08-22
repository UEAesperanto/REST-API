var supertest = require('supertest');
var chai = require('chai');
var util = require('util');
var jwt  = require('jsonwebtoken');
var app = require('../../app').app;
var db = require('../../modules/db');
var config = require('../../config');
var {readFileSync} = require('fs');


global.app = app;
global.config = config;
global.testConfig = { idLaborgrupo: 1,
                  idMembrecgrupo: 2,
                  idAldonaMembrecgrupo: 3,
                  idJunajGrupoj: 4,
                  idBazaMembreco: 1,
                  idAdministranto: 1,
                  idJunaAdministranto: 2,
                  idKomunikisto: 3,
                  junaAgxo: 35
                };
global.request = supertest(app);
global.expect = chai.expect;
global.should = chai.should();
global.readFileSync = readFileSync;

var administranto = { id: 1, uzantnomo: 'nomo', permesoj: [1], priskribo:'priskribo'};
var uzanto = { id: 2, uzantnomo: 'nomo', permesoj: ['uzanto'], priskribo:'priskribo'};
var membro = { id: 3, uzantnomo: 'nomo', permesoj: ['uzanto', 'membro'], priskribo:'priskribo'};

global.generateToken = (permeso) => {
  var userToken;
  switch (permeso) {
    case 'uzanto':
      userToken = uzanto;
      break;
    case 'membro':
      userToken = membro;
      break;
    default:
      userToken = administranto;
  }
  return jwt.sign(userToken, config.sekretoJWT, {expiresIn: 18000});
}

global.cleanTable = (name, done) => {
  var query = util.format('DELETE FROM `%s`', name);
  db.mysqlExec(query).then((result) => {});
}

global.createAdmin = () => {
  cleanTable('administranto');
  cleanTable('adminrajto');
  var query = util.format('INSERT INTO adminrajto (id, nomo, priskribo)\
                                VALUES (%s, %s, %s);',
                                administranto.id, administranto.uzantnomo, administranto.priskribo);
  db.mysqlExec(query);
}

global.generateKategorioj = () => {
  db.mysqlExec('INSERT INTO grupa_kategorio () VALUES(1, "laboro")');
  db.mysqlExec('INSERT INTO grupa_kategorio () VALUES(2, "membreco");');
  db.mysqlExec('INSERT INTO grupa_kategorio () VALUES(3, "krommembreco");');
}
