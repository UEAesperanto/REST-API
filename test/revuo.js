var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var jwt  = require('jsonwebtoken');
var config = require('../config');
var Grupo = require('../models/grupo');

chai.use(chaiHttp);


describe('Revuoj', function() {
    var token = '';

    beforeEach(function(done){
      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should post revuon', function(done){
      chai.request(server)
          .post('/revuoj')
          .set('x-access-token', token)
          .send({"titolo":"Revuo Esperanto"})
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT post revuon - sen permeso', function(done){
       chai.request(server)
           .post('/revuoj')
           .send({"titolo":"Revuo Esperanto"})
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

});
