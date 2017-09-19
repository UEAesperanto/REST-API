//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Grupo = require('../models/grupo');

chai.use(chaiHttp);
describe('Grupoj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `grupo`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /grupoj sen grupoj en la sistemo', function(){
     it('it should GET all the grupoj', function(done){
       chai.request(server)
           .get('/grupoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

     it('it should GET all the grupoj with body', function(done){
       chai.request(server)
           .get('/grupoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

     it('it should GET all the grupoj/laboroj with body', function(done){
       chai.request(server)
           .get('/grupoj/laboroj')
           .end((err, res) => {
               res.should.have.status(200);
            done();
           });
     });

     it('it should GET all the grupoj/membrecoj with body', function(done){
       chai.request(server)
           .get('/grupoj/membrecoj')
           .end((err, res) => {
               res.should.have.status(200);
            done();
           });
     });

     it('it should GET all the grupoj/membrecoj with body', function(done){
       chai.request(server)
           .get('/grupoj/membrecoj/aldonoj')
           .end((err, res) => {
               res.should.have.status(200);
            done();
           });
     });

     it('it should GET all the grupoj/laboroj/:id/anoj with body', function(done){
       chai.request(server)
           .get('/grupoj/laboroj/1/anoj')
           .end((err, res) => {
               res.should.have.status(400);
            done();
           });
     });

     it('it should GET all the grupoj/:id/kotizoj with body', function(done){
       chai.request(server)
           .get('/grupoj/1/kotizoj')
           .end((err, res) => {
               res.should.have.status(200);
            done();
        });
      });
   });

   describe('post grupoj en la sistemo', function(){
     it('it should GET all the grupoj/:id/kotizoj with body', function(done){
       chai.request(server)
           .post('/grupoj/1/anoj')
           .end((err, res) => {
               res.should.have.status(403);
            done();
           });
      });
   });
});
