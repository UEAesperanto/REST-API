//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Lando = require('../models/dissendo');
var jwt  = require('jsonwebtoken');
var config = require('../config');

chai.use(chaiHttp);
describe('Dissendoj', function() {
    var token = '';
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `dissendo`');
      db.mysqlExec(query).then(function(result){
      })
      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    describe('GET /dissendoj', function(){
     it('it should GET empty dissendoj', function(done){
       chai.request(server)
           .get('/dissendoj')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.length.should.equals(0);
               done();
           });
     });


     describe('POST /dissendoj', function(){
         it('it should POST a dissendo - with token', function (done) {
            var dissendo = { dissendanto: 1, dato: '1996-05-05', temo:'temo', teksto:'teksto'}

             chai.request(server)
                 .post('/dissendoj')
                 .set('x-access-token', token)
                 .send(dissendo)
                 .end(function (err, res) {
                     res.should.have.status(201)
                     done();
                 });
            });
      });


   });

});
