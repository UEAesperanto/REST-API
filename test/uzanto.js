//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var Uzanto = require('../models/uzanto');
var Lando = require('../models/lando');

chai.use(chaiHttp);
describe('Uzantoj', function() {
    var uzanto = {"uzantnomo" : "retposxto@io.com",
                  "pasvorto" : "nomoLoka",
                  "personanomo": "personanomo",
                  "titolo":"titolo",
                  "bildo":"bildo",
                  "adreso":"adreso",
                  "posxtkodo":"idNacialando",
                  "idLando": 1,
                  "naskigxtago": "1996-05-05",
                  "retposxto":"retposxto@io.com"};

    describe('Testoj sen Uzantoj /uzantoj', function(){
      beforeEach(function(done) { //Before each test we empty the database
        var query = util.format('DELETE FROM `uzantoAuxAsocio`;');
        db.mysqlExec(query);
        query = util.format('DELETE FROM `uzanto`;');
        db.mysqlExec(query).then(function(result){
          done();
        })
      });

      it('it should POST a uzanto', function(done){
        chai.request(server)
        .post('/uzantoj')
        .send(uzanto)
        .end(function(err, res){
          res.should.have.status(201);
          res.body.should.have.property('id');
          done();
        });
      });

      it('forgesis pasvorton sen uzanto', function(done){
        chai.request(server)
        .post('/uzantoj/forgesisPasvorton')
        .send({"retposxto": "retposxto@io.com", "naskigxtago": "1996-05-05"})
        .end(function(err, res){
          res.should.have.status(400);
          done();
        });
      });

      it('should get false email', function(done){
        chai.request(server)
        .get('/uzantoj/cxuMembro/retposxto@io.com')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('uzantoID');
          res.body.uzantoID.should.equal(-1);
          done();
        });
      });
    });

    describe('Testoj kun uzantoj en la sistemo', function(){
      it('forgesis pasvorton kun uzanto', function(done){
        chai.request(server)
        .post('/uzantoj')
        .send(uzanto).then(function(result){
          chai.request(server)
          .post('/uzantoj/forgesisPasvorton')
          .send({"retposxto": "retposxto@io.com", "naskigxtago": "1996-05-05"})
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
        });
      });

      it('should get true email', function(done){
        chai.request(server)
        .post('/uzantoj')
        .send(uzanto).then(function(result){
          var id = result.body.id;
          chai.request(server)
            .get('/uzantoj/cxuMembro/retposxto@io.com')
            .end(function(err, res) {
              res.should.have.status(200);
              res.body.should.have.property('uzantoID');
              //res.body.uzantoID.should.equal(id); - korekti 
              done();
            });
          });
        });
     });
});
