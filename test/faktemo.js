var chai = require('chai');
var chaiHttp = require('chai-http');
const {readFileSync} = require('fs');
var util = require('util');
var jwt  = require('jsonwebtoken');

var server = require('../server');
var config = require('../config');
var db = require('../modules/db');

var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe('faktemoj', function() {
    var token = '';
    var faktemo = {"nomo": "Edukado", "priskribo": "priskribo"}

    beforeEach(function(done){
      var query = util.format('DELETE FROM `faktemo`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST faktemon', function(done){
      chai.request(server)
          .post('/faktemoj')
          .set('x-access-token', token)
          .send(faktemo)
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST faktemon - sen permeso', function(done){
       chai.request(server)
           .post('/faktemoj')
           .send(faktemo)
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET faktemon - sen faktemoj', function(done){
        chai.request(server)
            .get('/faktemoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET faktemon - kun faktemoj', function(done){
         var query = "INSERT INTO `faktemo`(id, nomo, priskribo)\
                                  VALUES(1, 'a', 'b')";
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/faktemoj/1')
             .end((err, res) => {
               res.should.have.status(200);
               res.body[0].nomo.should.be.equal("a");
               res.body[0].priskribo.should.be.equal("b");
               done();
             });
           });
      });

      it('it should DELETE faktemon', function(done) {
        var query = "INSERT INTO `faktemo`(id, nomo, priskribo)\
                                 VALUES(1, 'a', 'b')";
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/faktemoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE faktemon - sen permeso', function(done) {
        var query = "INSERT INTO `faktemo`(id, nomo, priskribo)\
                                 VALUES(1, 'a', 'b')";
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/faktemoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
