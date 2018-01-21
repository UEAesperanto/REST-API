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

describe('Revuoj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `revuo`;');
      var query2 = util.format('DELETE FROM `volumo`;');

      db.mysqlExec(query);
      db.mysqlExec(query2);

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

      it('it should POST volumon', function(done){
         chai.request(server)
         .post('/revuoj/1/volumoj')
         .set('x-access-token', token)
         .end((err, res) => {
           res.should.have.status(201);
           done();
         });
      });

      it('it should POST volumon files - bildo', function(done){
        chai.request(server)
        .post('/revuoj/volumoj/1/bildo')
        .set('x-access-token', token)
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
          .get('/revuoj/volumoj/1/bildo')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.to.be.a('string');
            res.text.substring(0,15).should.to.have.string('data:image/png');
            done();
          });
        });
      });

      it('it should NOT POST volumon files - sen ĵetono', function(done){
        chai.request(server)
        .post('/revuoj/volumoj/1/bildo')
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err, res) => {
          res.should.have.status(400);
          chai.request(server)
          done();
        });
      });

      it('it should POST volumon files - PDF', function(done){
        chai.request(server)
        .post('/revuoj/volumoj/1/kvalita')
        .set('x-access-token', token)
        .attach("file", readFileSync("test/files/LIBRO.pdf"), "file.test")
        .end((err, res) => {
          res.should.have.status(201);
          chai.request(server)
          .get('/revuoj/volumoj/1/kvalita')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.to.be.a('string');
            res.text.substring(0,20).should.to.have.string('data:application/pdf');
            done();
          });
        });
      });

      it('it should UPDATE a volumo', function (done) {
        var query = util.format('INSERT INTO `volumo`(id, numeroJaro, numeroEntute, \
                                 enhavlisto, idRevuo) VALUES(1, 2, 3, "enhavo", 2);');
         db.mysqlExec(query).then(function(result){
              chai.request(server)
                  .put('/revuoj/volumoj/1')
                  .set('x-access-token', token)
                  .send({kampo: 'enhavlisto', valoro: 'new valuto'})
                  .end(function (err, res) {
                      res.should.have.status(200);
                      res.body.message.should.equal("Ĝisdatigo sukcese farita");
                      done();
                  });
          });
      });

      it('it should NOT UPDATE a volumo - ID', function (done) {
        var query = util.format('INSERT INTO `volumo`(id, numeroJaro, numeroEntute, \
                                 enhavlisto, idRevuo) VALUES(1, 2, 3, "enhavo", 2);');
         db.mysqlExec(query).then(function(result){
              chai.request(server)
                  .put('/revuoj/volumoj/1')
                  .set('x-access-token', token)
                  .send({kampo: 'id', valoro: 2})
                  .end(function (err, res) {
                      res.should.have.status(403);
                      done();
                  });
          });
      });

      it('it should NOT UPDATE a volumo - Sen ĵetono', function (done) {
        var query = util.format('INSERT INTO `volumo`(id, numeroJaro, numeroEntute, \
                                 enhavlisto, idRevuo) VALUES(1, 2, 3, "enhavo", 2);');
         db.mysqlExec(query).then(function(result){
              chai.request(server)
                  .put('/revuoj/volumoj/1')
                  .send({kampo: 'enhavlisto', valoro: 'sei lá'})
                  .end(function (err, res) {
                      res.should.have.status(400);
                      done();
                  });
          });
      });
});
