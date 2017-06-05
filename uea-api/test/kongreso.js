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
describe('Kongresoj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `kongreso`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /kongresoj sen kongresoj en la sistemo', function(){
     it('it should GET all the kongresoj', function(done){
       chai.request(server)
           .get('/kongresoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

      it('it should GET all the kromaj kongresoj', function(done){
        chai.request(server)
            .get('/kongresoj/1/kromaj')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
       });

       it('it should GET all the aligxintoj to kongresoj', function(done){
         chai.request(server)
             .get('/kongresoj/1/aligxintoj')
             .end((err, res) => {
                 res.should.have.status(200);
               done();
             });
        });

        it('it should GET all the aligxikotizoj to kongresoj', function(done){
          chai.request(server)
              .get('/kongresoj/1/aligxkotizoj')
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
         });

         it('it should GET all the programeroj to kongresoj', function(done){
           chai.request(server)
               .get('/kongresoj/1/programeroj')
               .end((err, res) => {
                   res.should.have.status(200);
                 done();
               });
          });
    });
});
