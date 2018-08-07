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
global.request = supertest(app);
global.expect = chai.expect;
global.should = chai.should();
global.readFileSync = readFileSync;

var administranto = { id: 1, uzantnomo: 'nomo', permesoj: [1], priskribo:'priskribo'};

global.generateToken = (permeso) => {
  if (permeso == undefined)
    return jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
  else {
    var uzanto = JSON.parse(JSON.stringify(administranto)) // Cloning object adminstranto
    uzanto["permesoj"] = permeso;
    return jwt.sign(uzanto, config.sekretoJWT, {expiresIn: 18000});
  }
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
