//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Lando = require('../models/lando');

chai.use(chaiHttp);
describe('Landoj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `lando`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /landoj', function(){
     it('it should GET all the landoj', function(done){
       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });

     it('it should GET all the landoj with body', function(done){
       chai.request(server)
           .get('/landoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });
   });

   describe('GET /landoj/:id', function(){
     it('it should GET a lando given id', function(done){
      var lando = {id : 1, nomoLoka : "nomoLoka", nomoEo : "nomoEo", finajxoEo: "finajxoEo", landKodo : "landKodo" };
      Lando.insert(lando).then(function(sucess){
        chai.request(server)
          .get('/landoj/' + lando.id)
          .end(function(err, res){
            res.should.have.status(200);
            //expect(res.body).to.deep.equal({message: 'sucess'})
            //res.body.should.be.a('object');s
            done();
          });
      });
    });

    it('it NOT should GET a landoj given id', function(done){
     var lando = {id : 2, nomoLoka : "nomoLoka", nomoEo : "nomoEo", finajxoEo: "finajxoEo", landKodo : "landKodo" };
     Lando.insert(lando).then(function(sucess){
       chai.request(server)
         .get('/landoj/' + lando.id + 1)
         .end(function(err, res){
           res.should.have.status(200);
           //expect(res.body).to.deep.equal({message: 'sucess'})
           //res.body.should.be.a('object');
           done();
         });
     });
   });
  });

  describe('POST /landoj', function(){
   it('it NOT should POST a lando - Sen ĵetono (token)', function(done){
     var lando = {nomoLoka : "nomoLoka", nomoEo : "nomoEo", finajxoEo: "finajxoEo", landKodo : "landKodo" };
     chai.request(server)
         .post('/landoj')
         .send(lando)
         .end(function(err, res){
             res.should.have.status(400);
             /*res.body.should.have.property('nomoLoka');
             res.body.should.have.property('nomoEo');
             res.body.should.have.property('landKodo');
             //res.body.should.be.a('object');*/
           done();
         });
   });
 });


 describe('DELETE /landoj', function(){
  it('it NOT should DELETE a landoj given id - Sen ĵetono (token)', function(done){
    var lando = {id : 1, nomoLoka : "nomoLoka", nomoEo : "nomoEo",landKodo : "landKodo" };
    chai.request(server)
        .post('/landoj')
        .send(lando)
        .end(function(err, res){
          chai.request(server)
              .delete('/landoj/' + lando.id)
              .end(function(err,res){
                res.should.have.status(400);
                done();
              })
        })
    });
  });

});
