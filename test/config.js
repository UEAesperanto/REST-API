//Require the dev-dependencies
var chai = require('chai');
var async = require('async');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var config = [{idLaborgrupo: 1},
              {idMembrecgrupo: 2},
              {idAldonaMembrecgrupo: 3},
              {idJunajGrupoj: 4},
              {idBazaMembreco: 1},
              {idAdministranto: 1},
              {idJunaAdministranto: 2},
              {idKomunikisto: 3},
              {junaAgxo: 35}];

async.each(config, function(item, callback) {
  describe('GET /config # ' + Object.keys(item)[0], function () {
    it('Devus preni config', function (done) {
      var key = Object.keys(item)[0];
      var value = Object.values(item)[0];
      var request = util.format('/config/%s', key);
      chai.request(server)
      .get(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(key, value);
        done()
      });
    });
  });
  callback()
});

describe('GET /config ne trovita', function() {
  it('Devus ne trovi config', function(done) {
    chai.request(server)
    .get('/config/ajnaAfero')
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.have.property('message', 'Ne trovita');
      done()
    });
  });
});
