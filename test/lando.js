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
      })
      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    describe('GET /landoj', function(){
        var lando = {id : 1, valuto : "valuto", radikoEo : "radikoEo", finajxoEo: "finajxoEo", landkodo : "landKodo" };
        var lando2 = {id : 2, valuto : "valuto2", radikoEo : "radikoEo2", finajxoEo: "finajxoEo2", landkodo : "landKodo2" };
        var lando3 = {id : 3, valuto : "valuto3", radikoEo : "radikoEo3", finajxoEo: "finajxoEo3", landkodo : "landKodo3" };

     it('it should GET all the landoj', function(done){
         Lando.insert(lando);
         Lando.insert(lando2);
         Lando.insert(lando3);

       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(3);
           });
           done();
     });

     it('it should GET all the landoj with body', function(done){
       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(0)
           });
           done();
     });
   });

   describe('GET /landoj/:id', function(){
     it('it should GET a lando given id', function(done){
      var lando = {id : 1, valuto : "valuto", radikoEo : "radikoEo", finajxoEo: "finajxoEo", landkodo : "landKodo" };
      Lando.insert(lando).then(function(success){
        chai.request(server)
          .get('/landoj/' + success.insertId)
          .end(function(err, res){
              res.should.have.status(200);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal('finajxoEo');
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal('valuto');
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal('radikoEo');
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal('landKodo');
          });
          done();
      });
    });

    it('it should NOT GET a landoj given id', function(done){
     var lando = {id : 2, valuto : "valuto", nomoEo : "nomoEo", finajxoEo: "finajxoEo", landKodo : "landKodo" };
     Lando.insert(lando).then(function(success){
       chai.request(server)
         .get('/landoj/' + success + 1)
         .end(function(err, res){
             var response = JSON.stringify(res.body);
             res.body.should.be.a('object');
             res.should.have.status(200);
             response.should.equal('{}');
         });
         done();
     });
   });
  });

  describe('POST /landoj', function(){

   it('it should NOT POST a lando - Sen ĵetono (token)', function(done){
     var lando = {valuto : "valuto", nomoEo : "nomoEo",
                  finajxoEo: "finajxoEo", landKodo : "landKodo" };
     chai.request(server)
         .post('/landoj')
         .send(lando)
         .end(function(err, res){
             var error = JSON.parse(err.response.error.text);

             error.success.should.equal(false);
             error.message.should.equal("Sen ĵetono (token).");
             res.should.have.status(400);
             err.should.have.status(400);

         });
         done();
   });

      it('it should POST a lando - with token', function (done) {
          var lando = {valuto : "valuto", nomoEo : "nomoEo",
              finajxoEo: "finajxoEo", landKodo : "landKodo" };

          chai.request(server)
              .post('/landoj')
              .set('x-access-token', token)
              .send(lando)
              .end(function (err, res) {
                  res.should.have.status(201)
                  res.body.should.have.property('valuto');
                  res.body.should.have.property('finajxoEo');
                  res.body.valuto.should.equal('valuto');
                  res.body.finajxoEo.should.equal('finajxoEo');
              });
              done();

      });
 });

    describe('DELETE /landoj', function(){
    it('it should NOT DELETE a lando - Sen ĵetono', function (done) {
         var lando = {valuto : "valuto", radikoEo : "radikoEo",
         finajxoEo: "finajxoEo", landkodo : "landKodo" };

         Lando.insert(lando).then(function (success) {
             chai.request(server)
                 .delete('/landoj/' + success.insertId)
                 .send(lando)
                 .end(function (err, res) {
                     var error = JSON.parse(err.response.error.text);

                     error.success.should.equal(false);
                     error.message.should.equal("Sen ĵetono (token).");
                     res.should.have.status(400);
                     err.should.have.status(400);

                 });
                 done();
         })
     });

        it('it should DELETE a lando - with token', function (done) {
            var lando = {valuto : "valutogega", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

                Lando.insert(lando).then(function (success) {
                    chai.request(server)
                        .delete('/landoj/' + success.insertId)
                        .set('x-access-token', token)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.message.should.equal("Ok");
                        });
                        done();
                })
        });


    });

    describe('PUT /landoj/:id', function () {
        it('it should NOT UPDATE a lando - Sen ĵetono', function (done) {
            var lando = {valuto : "valuto", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

            Lando.insert(lando).then(function (success) {
                chai.request(server)
                    .delete('/landoj/' + success.insertId)
                    .send({kampo: 'valuto', valoro: 'new valuto'})
                    .end(function (err, res) {
                        var error = JSON.parse(err.response.error.text);

                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        res.should.have.status(400);
                        err.should.have.status(400);

                    });
                    done();
            })
        });


        it('it should UPDATE a lando valuto - with token', function (done) {
            var lando = {valuto : "valutogega", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

            Lando.insert(lando).then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'valuto', valoro: 'new valuto'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                    });
                    done();
            })
        });

        it('it should UPDATE a lando radikoEo - with token', function (done) {
            var lando = {valuto : "valutogega", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

            Lando.insert(lando).then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'radikoEo', valoro: 'new radikoEo'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                    });
                    done();
            })
        });

        it('it should UPDATE a lando finajxoEo - with token', function (done) {
            var lando = {valuto : "valutogega", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

            Lando.insert(lando).then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'finajxoEo', valoro: 'new finajxoEo'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                    });
                    done();
            })
        });

        it('it should UPDATE a lando landkodo - with token', function (done) {
            var lando = {valuto : "valutogega", radikoEo : "radikoEo",
                finajxoEo: "finajxoEo", landkodo : "landKodo" };

            Lando.insert(lando).then(function (success) {
                chai.request(server)
                    .put('/landoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'landkodo', valoro: 'new landkodo'})
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                    });
                    done();
            })
        });
    })

});
