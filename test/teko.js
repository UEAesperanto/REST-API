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

describe('tekoj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `teko`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST tekon', function(done){
      chai.request(server)
          .post('/tekoj')
          .set('x-access-token', token)
          .send({"id":1,"titolo":"titolo","elnomo":"elnomo","kodnomo":"kodnomo","jaro":1,"absnum":"absnum","vido":true})
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST tekon - sen permeso', function(done){
       chai.request(server)
           .post('/tekoj')
           .send({"id":1,"titolo":"titolo","elnomo":"elnomo","kodnomo":"kodnomo","jaro":1,"absnum":"absnum","vido":true})
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET tekon - sen tekoj', function(done){
        chai.request(server)
            .get('/tekoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET tekon - kun tekoj', function(done){
         var query = util.format('INSERT INTO `teko` VALUES(1,"titolo","elnomo","kodnomo",1,"absnum",TRUE);');
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/tekoj/1')
             .end((err, res) => {
               res.should.have.status(200);
								res.body[0].should.have.property('id');
								res.body[0].id.should.equal(1);
								res.body[0].should.have.property('titolo');
								res.body[0].titolo.should.equal("titolo");
								res.body[0].should.have.property('elnomo');
								res.body[0].elnomo.should.equal("elnomo");
								res.body[0].should.have.property('kodnomo');
								res.body[0].kodnomo.should.equal("kodnomo");
								res.body[0].should.have.property('jaro');
								res.body[0].jaro.should.equal(1);
								res.body[0].should.have.property('absnum');
								res.body[0].absnum.should.equal("absnum");
								res.body[0].should.have.property('vido');
								res.body[0].vido.should.equal(true);

               done();
             });
           });
      });

      it('it should DELETE tekon', function(done) {
        var query = util.format('INSERT INTO `teko` VALUES(1,"titolo","elnomo","kodnomo",1,"absnum",true);');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/tekoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE tekon - sen permeso', function(done) {
        var query = util.format('INSERT INTO `teko` VALUES(1,"titolo","elnomo","kodnomo",1,"absnum",true);');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/tekoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
