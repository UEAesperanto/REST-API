//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var Uzanto = require('../controllers/models/uzanto');

chai.use(chaiHttp);
describe('Uzantoj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `uzantoAuxAsocio`;');
      db.mysqlExec(query);
      query = util.format('DELETE FROM `uzanto`;');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('POST /uzantoj', function(){

      var insertQuery = util.format('INSERT INTO uzanto (id, personanomo, familianomo, titolo)\
      VALUES (2, /* id */ "Victor Hugo", /*  personanomo */\
      "de Sousa", /* familianomo   */ "titolo", /* titolo  */);')

      it('it should POST a uzanto', function(done){
        var uzanto = {"uzantnomo" : "uzantnomo",
        "pasvorto" : "nomoLoka",
        "personanomo": "personanomo",
        "titolo":"titolo",
        "bildo":"bildo",
        "adreso":"adreso",
        "posxtkodo":"idNacialando",
        "idNacialando": 25,
        "naskigxtago": "1996-05-05",
        "retposxto":"retposxto"};

        chai.request(server)
        .post('/uzantoj')
        .send(uzanto)
        .end(function(err, res){
          res.should.have.status(201);
          res.body.should.have.property('id');
          done();
        });
      });

      it('forgesis pasvorton sen uzanto', function(done) {
        chai.request(server)
        .post('/uzantoj/forgesisPasvorton')
        .end(function(err, res){
          res.should.have.status(400);
          done();
        });
      });

    });
});
