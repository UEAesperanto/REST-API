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

describe('Anoncetoj', function() {
    var token = '';
    var insert_sql = "INSERT INTO `anonceto`(id, titolo, ligilo, priskribo, butono, gxis) \
                      VALUES(1, 'Anoncu ĉi tie', '/pliaj-informoj', 'xyz', 'Vidu pli',  '2018-03-03');"
    var  anonceto = {'titolo': 'Anoncu ĉi tie',
      'ligilo': '/pliaj-informoj',
      'priskribo': 'xyzkwrlkdjf lkjasd',
      'butono': 'Vidu pli',
      'gxis': '2018-03-03'};

    beforeEach(function(done){
      var query = util.format('DELETE FROM `anonceto`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [3]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });
    //req.body.titolo, req.body.ligilo, req.body.priskribo,
                      //req.body.butono, req.body.gxis

    it('it should POST Anonceton', function(done){
      chai.request(server)
          .post('/anoncetoj')
          .set('x-access-token', token)
          .send(anonceto)
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST Anonceton - sen permeso', function(done){
       chai.request(server)
           .post('/anoncetoj')
           .send(anonceto)
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET anonceton - sen anoncetoj', function(done){
        chai.request(server)
            .get('/anoncetoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET anonceton - kun anoncetoj', function(done){
         var query = util.format(insert_sql);
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/anoncetoj/1')
             .end((err, res) => {
               res.should.have.status(200);
               res.body[0].should.have.property('id');
               res.body[0].id.should.equal(1);
               res.body[0].should.have.property('priskribo');
               res.body[0].priskribo.should.equal('xyz');
               done();
             });
           });
      });

      it('it should DELETE anonceton', function(done) {
        var query = util.format(insert_sql);
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/anoncetoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE anonceton - sen permeso', function(done) {
        var query = util.format(insert_sql);
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/anoncetoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
