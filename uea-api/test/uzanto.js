//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var Uzanto = require('../controllers/models/uzanto');

chai.use(chaiHttp);
describe('Uzanto', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `uzanto`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /uzanto', function(){
     it('it should GET all the uzantoj', function(done){
       chai.request(server)
           .get('/uzanto')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });
   });


   describe('GET /uzanto', function(){
    it('it should GET all the uzantoj with body', function(done){
      var user = {
        message : "Teste"
      }
      chai.request(server)
          .get('/uzanto')
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
