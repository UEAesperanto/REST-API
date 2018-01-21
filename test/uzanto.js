//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
const {readFileSync} = require('fs');
var util = require('util');
var jwt  = require('jsonwebtoken');

var server = require('../server');
var db = require('../modules/db');
var Uzanto = require('../models/uzanto');
var Lando = require('../models/lando');
var config = require('../config');

var should = chai.should();


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
      beforeEach(function(done) {
        var query = util.format('DELETE FROM `uzantoAuxAsocio`;');
        db.mysqlExec(query);
        query = util.format('DELETE FROM `uzanto`;');
        db.mysqlExec(query);
        var administranto = {
          id: 1,
          uzantnomo: 'nomo',
          permesoj: [1]
        };
        token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
        done();
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

      it('should POST a bildo', function(done){
        chai.request(server)
        .post('/uzantoj/admin/1/bildo')
        .set('x-access-token', token)
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
          .get('/uzantoj/admin/1/bildo')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.to.be.a('string');
            res.text.substring(0,15).should.to.have.string('data:image/png');
            done();
          });
        });
      });

      it('should NOT POST a bildo - sen ĵetono', function(done){
        chai.request(server)
        .post('/uzantoj/admin/1/bildo')
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
    });
});
