//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Asocio = require('../models/asocio');

chai.use(chaiHttp);
describe('Asocioj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `asocio`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /asocioj sen asocioj en la sistemo', function(){
     it('it should GET all the asocioj', function(done){
       chai.request(server)
           .get('/asocioj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

     it('it should GET all the asocioj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/asocioj')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });
   });
});
