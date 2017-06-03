//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Grupo = require('../controllers/models/grupo');

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
               res.should.have.status(404);
             done();
           });
     });

     it('it should GET all the grupoj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/grupoj')
           .send(user)
           .end((err, res) => {
               res.should.have.status(404);
             done();
           });
     });

     it('it should GET all the grupoj/laboroj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/grupoj/laboroj')
           .send(user)
           .end((err, res) => {
               res.should.have.status(404);
             done();
           });
     });
   });
});
