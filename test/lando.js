//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Lando = require('../models/lando');
var jwt  = require('jsonwebtoken');
var config = require('../config');

chai.use(chaiHttp);
describe('Landoj', function() {
    var token = '';
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `lando`');
      db.mysqlExec(query).then(function(result){
      });
      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    describe('GET /landoj', function(){
     it('it should GET all the landoj', function(done){
         Lando.insert("eur", "radiko", "finajxo", "lk");
         Lando.insert("eur", "radiko", "finajxo", "l2");
         Lando.insert("eur", "radiko", "finajxo", "l1");

       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(3);
               done();
           });
     });

     it('it should GET all the landoj with body', function(done){
       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(0)
               done();
           });
     });
   });

   describe('GET /landoj/:id', function(){
     it('it should GET a lando given id', function(done){
      Lando.insert("eur", "radiko", "finajxo", "lk").then(function(success){
        chai.request(server)
          .get('/landoj/' + success.insertId)
          .end(function(err, res){
              res.should.have.status(200);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal('finajxo');
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal('eur');
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal('radiko');
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal('lk');
              done();
          });
      });
    });

    it('it should NOT GET a landoj given id', function(done){
     Lando.insert("eur", "radiko", "finajxo", "lk").then(function(success){
       chai.request(server)
         .get('/landoj/' + success + 1)
         .end(function(err, res){
             var response = JSON.stringify(res.body);
             res.body.should.be.a('array');
             res.should.have.status(200);
             response.should.equal('[]');
             done();
         });
     });
   });
  });

  describe('POST /landoj', function(){

   it('it should NOT POST a lando - Sen ĵetono (token)', function(done){
     var lando = {valuto : "eur", nomoEo : "nomoEo",
                  finajxoEo: "finajxoEo", landKodo : "lk" };
     chai.request(server)
         .post('/landoj')
         .send(lando)
         .end(function(err, res){
             var error = JSON.parse(err.response.error.text);
             error.success.should.equal(false);
             error.message.should.equal("Sen ĵetono (token).");
             res.should.have.status(400);
             err.should.have.status(400);
             done();
         });
   });

      it('it should POST a lando - with token', function (done) {
          var lando = {valuto : "eur", nomoEo : "nomoEo",
              finajxoEo: "finajxoEo", landKodo : "lk" };
          chai.request(server)
              .post('/landoj')
              .set('x-access-token', token)
              .send(lando)
              .end(function (err, res) {
                  res.should.have.status(201);
                  done();
              });
      });
 });

    describe('DELETE /landoj', function(){
    it('it should NOT DELETE a lando - Sen ĵetono', function (done) {
         Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
             chai.request(server)
                 .delete('/landoj/' + success.insertId)
                 .end(function (err, res) {
                     var error = JSON.parse(err.response.error.text);
                     error.success.should.equal(false);
                     error.message.should.equal("Sen ĵetono (token).");
                     res.should.have.status(400);
                     err.should.have.status(400);
                     done();
                 });
         })
     });

    it('it should DELETE a lando - with token', function (done) {
                Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                    chai.request(server)
                        .delete('/landoj/' + success.insertId)
                        .set('x-access-token', token)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.message.should.equal("Ok");
                            done();
                        });
                });
        });
    });

    describe('PUT /landoj/:id', function () {
        it('it should NOT UPDATE a lando - Sen ĵetono', function (done) {
            Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                chai.request(server)
                    .delete('/landoj/' + success.insertId)
                    .send({kampo: 'valuto', valoro: 'new valuto'})
                    .end(function (err, res) {
                        var error = JSON.parse(err.response.error.text);
                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        res.should.have.status(400);
                        err.should.have.status(400);
                        done();
                    });
            });
        });

        it('it should UPDATE a lando valuto - with token', function (done) {
            Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'valuto', valoro: 'gbp'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                        done();
                    });
            });
        });

        it('it should UPDATE a lando radikoEo - with token', function (done) {
            Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'radikoEo', valoro: 'new radikoEo'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                        done();
                    });
            });
        });

        it('it should UPDATE a lando finajxoEo - with token', function (done) {
            Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'finajxoEo', valoro: 'new finajxoEo'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                        done();
                    });
            });
        });

        it('it should UPDATE a lando landkodo - with token', function (done) {
            Lando.insert("eur", "radiko", "finajxo", "lk").then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'landkodo', valoro: 'lk'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                        done();
                    });
            });
        });
    });
});
