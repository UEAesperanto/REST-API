var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var jwt  = require('jsonwebtoken');
var config = require('../config');
var Grupo = require('../models/grupo');

chai.use(chaiHttp);


describe('Revuoj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `revuo`;');
      db.mysqlExec(query).then(function(result){
      });

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST revuon', function(done){
      chai.request(server)
          .post('/revuoj')
          .set('x-access-token', token)
          .send({"titolo":"Revuo Esperanto"})
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST revuon - sen permeso', function(done){
       chai.request(server)
           .post('/revuoj')
           .send({"titolo":"Revuo Esperanto"})
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET revuon - sen revuoj', function(done){
        chai.request(server)
            .get('/revuoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET revuon - kun revuoj', function(done){
         var query = util.format('INSERT INTO `revuo`\
                                  VALUES(1, "ESPERANTO", "1920", "333");');
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/revuoj')
             .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(1);
               res.body[0].should.have.property('id');
               res.body[0].id.should.equal(1);
               res.body[0].should.have.property('titolo');
               res.body[0].titolo.should.equal('ESPERANTO');
               res.body[0].should.have.property('fondjaro');
               res.body[0].fondjaro.should.equal(1920);
               res.body[0].should.have.property('issn');
               res.body[0].issn.should.equal('333');
               done();
             });
           });
      });

      it('it should DELETE revuon', function(done) {
        var query = util.format('INSERT INTO `revuo`\
                                 VALUES(1, "ESPERANTO", "1920", "333");');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/revuoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE revuon - sen permeso', function(done) {
        var query = util.format('INSERT INTO `revuo`\
                                 VALUES(1, "ESPERANTO", "1920", "333");');
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/revuoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
      });

});
