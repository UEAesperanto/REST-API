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

describe('vocxdonadoj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `vocxdonado`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST vocxdonadon', function(done){
      chai.request(server)
          .post('/vocxdonadoj')
          .set('x-access-token', token)
          .send({"id":1,"titolo":"titolo","priskribo":"priskribo","pluraj_opcioj":true,"anonima":true,"aperdato":"1996-05-05","limdato":"1996-05-05"})
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST vocxdonadon - sen permeso', function(done){
       chai.request(server)
           .post('/vocxdonadoj')
           .send({"id":1,"titolo":"titolo","priskribo":"priskribo","pluraj_opcioj":true,"anonima":true,"aperdato":"1996-05-05","limdato":"1996-05-05"})
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET vocxdonadon - sen vocxdonadoj', function(done){
        chai.request(server)
            .get('/vocxdonadoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET vocxdonadon - kun vocxdonadoj', function(done){
         var query = util.format('INSERT INTO `vocxdonado` VALUES(1,"titolo","priskribo",true,true,"1996-05-05","1996-05-05");');
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/vocxdonadoj/1')
             .end((err, res) => {
               res.should.have.status(200);
								res.body[0].should.have.property('id');
								res.body[0].id.should.equal(1);
								res.body[0].should.have.property('titolo');
								res.body[0].titolo.should.equal("titolo");
								res.body[0].should.have.property('priskribo');
								res.body[0].priskribo.should.equal("priskribo");
								res.body[0].should.have.property('pluraj_opcioj');
								res.body[0].pluraj_opcioj.should.equal(true);
								res.body[0].should.have.property('anonima');
								res.body[0].anonima.should.equal(true);
								res.body[0].should.have.property('aperdato');
								res.body[0].aperdato.should.equal("1996-05-05" + "T00:00:00.000Z");
								res.body[0].should.have.property('limdato');
								res.body[0].limdato.should.equal("1996-05-05" + "T00:00:00.000Z");
               
               done();
             });
           });
      });

      it('it should DELETE vocxdonadon', function(done) {
        var query = util.format('INSERT INTO `vocxdonado` VALUES(1,"titolo","priskribo",true,true,"1996-05-05","1996-05-05");');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/vocxdonadoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE vocxdonadon - sen permeso', function(done) {
        var query = util.format('INSERT INTO `vocxdonado` VALUES(1,"titolo","priskribo",true,true,"1996-05-05","1996-05-05");');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/vocxdonadoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
