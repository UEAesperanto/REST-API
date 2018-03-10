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

describe('opcioj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `opcio`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST opcion', function(done){
      chai.request(server)
          .post('/opcioj')
          .set('x-access-token', token)
          .send({"id":1,"priskribo":"priskribo","idVocxdonado":1})
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST opcion - sen permeso', function(done){
       chai.request(server)
           .post('/opcioj')
           .send({"id":1,"priskribo":"priskribo","idVocxdonado":1})
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET opcion - sen opcioj', function(done){
        chai.request(server)
            .get('/opcioj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET opcion - kun opcioj', function(done){
         var query = util.format('INSERT INTO `opcio` VALUES(1,"priskribo",1);');
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/opcioj/1')
             .end((err, res) => {
               res.should.have.status(200);
								res.body[0].should.have.property('id');
								res.body[0].id.should.equal(1);
								res.body[0].should.have.property('priskribo');
								res.body[0].priskribo.should.equal("priskribo");
								res.body[0].should.have.property('idVocxdonado');
								res.body[0].idVocxdonado.should.equal(1);
               
               done();
             });
           });
      });

      it('it should DELETE opcion', function(done) {
        var query = util.format('INSERT INTO `opcio` VALUES(1,"priskribo",1);');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/opcioj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE opcion - sen permeso', function(done) {
        var query = util.format('INSERT INTO `opcio` VALUES(1,"priskribo",1);');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/opcioj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
