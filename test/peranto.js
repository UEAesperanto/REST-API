//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Peranto = require('../models/peranto');
var jwt  = require('jsonwebtoken');
var config = require('../config');

chai.use(chaiHttp);
describe('Peranto', function() {
    var token = '';

    beforeEach( function(done) { //Before each test we empty the database
        var query = util.format('DELETE FROM `peranto`');
        db.mysqlExec(query);

        var administranto = {
          id: 1,
          uzantnomo: 'nomo',
          permesoj: [1]
        };
        token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
        done();
    });

    describe('POST /perantoj', function () {

        var token = '';

        before(function (done) {
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
                .post('/admin/ensaluti')
                .send(uzanto)
                .end(function (err, res) {
                    token = res.body.token;
                })
                done();
        });

        var peranto = {publikaNomo: 'publikaNomo', retadreso: 'retadreso', idLando: '43'};

        it('it should NOT POST a peranto without token', function (done) {
            chai.request(server)
                .post('/perantoj')
                .send(peranto)
                .end((err, res) => {
                    var error = JSON.parse(err.response.error.text);

                    error.success.should.equal(false);
                    error.message.should.equal("Sen ĵetono (token).");
                    err.should.have.status(400);
                    res.should.have.status(400);
                    res.body.message.should.equal("Sen ĵetono (token).");
                });
                done();
        });


        it('it should POST a peranto', function (done) {
            chai.request(server)
                .post('/perantoj')
                .set('x-access-token', token)
                .send(peranto)
                .end((err, res) => {
                    res.should.have.status(201);
                  });
            done();
        })
    });

    describe('GET /perantoj en la sistemo', function(){

        var peranto = {publikaNomo: 'publikaNomo', retadreso: 'retadreso', idLando: '43'};


        it('it should GET all the peranto', function (done) {
            chai.request(server)
                .get('/perantoj')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.equals(0);
                });
                done();
        });



         it('it should GET all the peranto', function(done){

           Peranto.insert('publikaNomo', 'retadreso', '34');
           Peranto.insert('publikaNomo', 'retadreso', '31');

           chai.request(server)
               .get('/perantoj')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.length.should.equals(2);
               });
               done();
         });

   });



    describe('PUT /perantoj', function () {
        var token = '';

        var peranto = {publikaNomo: 'publikaNomo', retadreso: 'retadreso', idLando: '43'};

        before(function (done) {
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
                .post('/admin/ensaluti')
                .send(uzanto)
                .end(function (err, res) {
                    token = res.body.token;
                })
                done();
        });

        it('it should UPDATE a peranto with token', function (done) {
            Peranto.insert('publikaNomo', 'retadreso', '34').then(function (success) {
                chai.request(server)
                    .put('/perantoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.message.should.equal("Ĝisdatigo sukcese farita");
                    })
                    done();
            });
        })

        it('it should NOT UPDATE a peranto without token', function (done) {
            Peranto.insert('publikaNomo', 'retadreso', '34').then(function (success) {
                chai.request(server)
                    .put('/perantoj/' + success.insertId)
                    .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
                    .end((err, res) => {
                        var error = JSON.parse(err.response.error.text);

                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        err.should.have.status(400);
                        res.should.have.status(400);
                        res.body.message.should.equal("Sen ĵetono (token).");
                    })
                    done();
            });
        })
    });

    describe('DELETE /perantoj', function () {
        var token = '';

        var peranto = {publikaNomo: 'publikaNomo', retadreso: 'retadreso', idLando: '43'};

        before(function (done) {
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
                .post('/admin/ensaluti')
                .send(uzanto)
                .end(function (err, res) {
                    token = res.body.token;
                })
                done();
        });

        it('it should NOT DELETE a peranto without token', function (done) {
            Peranto.insert('publikaNomo', 'retadreso', '34').then(function (success) {
                chai.request(server)
                    .delete('/perantoj/' + success.insertId)
                    .end((err, res) => {
                        var error = JSON.parse(err.response.error.text);

                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        err.should.have.status(400);
                        res.should.have.status(400);
                        res.body.message.should.equal("Sen ĵetono (token).");
                    })
                    done();
            })
        });

        it('it should DELETE a peranto', function (done) {
            Peranto.insert('publikaNomo', 'retadreso', '34').then(function (success) {
                chai.request(server)
                    .delete('/perantoj/' + success.insertId)
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(204);
                    })
                    done();
            })
        })
    });
});
