//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Asocio = require('../controllers/models/asocio');

chai.use(chaiHttp);
describe('Asocio', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `asocio`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /asocio', function(){
     it('it should GET all the asocioj', function(done){
       chai.request(server)
           .get('/asocio')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });

     it('it should GET all the asocioj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/asocio')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });
   });
});
