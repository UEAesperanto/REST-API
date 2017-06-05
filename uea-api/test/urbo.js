//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Urbo = require('../controllers/models/urbo');

chai.use(chaiHttp);
describe('Urboj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `urbo`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /urboj sen urboj en la sistemo', function(){
     it('it should GET all the urboj', function(done){
       chai.request(server)
           .get('/urboj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

     it('it should GET all the urboj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/urboj')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });
   });
});
