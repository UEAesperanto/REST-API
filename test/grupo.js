//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Grupo = require('../models/grupo');

chai.use(chaiHttp);
describe('Grupoj', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `grupo`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /grupoj sen grupoj en la sistemo', function(){
         it('it should GET all the grupoj', function(done){
           chai.request(server)
               .get('/grupoj')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.length.should.equal(0);
               });
               done();
         });

         it('it should GET all the grupoj with body', function(done){
             Grupo.insert('mallongigilo', 'nomo', 'priskribo');
           chai.request(server)
               .get('/grupoj')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.length.should.equal(1);
               });
               done();
         });

        it('it should GET a grupoj with a given id', function (done) {
            Grupo.insert('mallongigilo', 'nomo', 'priskribo').then(function (success) {
                chai.request(server)
                    .get('/grupoj/' + success.insertId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.equal(1);
                        res.body[0].should.have.property('mallongigilo');
                        res.body[0].should.have.property('nomo');
                        res.body[0].should.have.property('priskribo');
                        res.body[0].mallongigilo.should.equal('mallongigilo');
                        res.body[0].nomo.should.equal('nomo');
                        res.body[0].priskribo.should.equal('priskribo');
                    })
                    done();
            });
        })

         it('it should GET all the grupoj/laboroj with body', function(done){
           chai.request(server)
               .get('/grupoj/laboroj')
               .end((err, res) => {
                   res.should.have.status(200);
               });
               done();
         });

         it('it should GET all the grupoj/membrecoj with body', function(done){
           chai.request(server)
               .get('/grupoj/membrecoj')
               .end((err, res) => {
                   res.should.have.status(200);
               });
               done();
         });

         it('it should GET all the grupoj/membrecoj with body', function(done){
           chai.request(server)
               .get('/grupoj/membrecoj/aldonoj')
               .end((err, res) => {
                   res.should.have.status(200);
               });
               done();
         });

         it('it should GET all the grupoj/laboroj/:id/anoj with body', function(done){
           chai.request(server)
               .get('/grupoj/laboroj/1/anoj')
               .end((err, res) => {
                   res.should.have.status(400);
               });
               done();
         });

         it('it should GET all the grupoj/:id/kotizoj with body', function(done){
           chai.request(server)
               .get('/grupoj/1/kotizoj')
               .end((err, res) => {
                   res.should.have.status(200);
                done();
            });
          });
   });

   describe('POST /grupoj', function(){

       var token = '';

       before(function (done) {
           var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
           chai.request(server)
               .post('/admin/ensaluti')
               .send(uzanto)
               .end(function (err, res) {
                   token = res.body.token;
               });
               done();
       });

       it('it should NOT POST a grupo without token', function (done) {

           var grupo = {mallongigilo: 'mallongigilo', nomo: 'nomo', priskribo: 'priskribo'}

           chai.request(server)
               .post('/grupoj')
               .send(grupo)
               .end((err, res) => {
                    var error = JSON.parse(err.response.error.text);

                    error.success.should.equal(false);
                    error.message.should.equal("Sen ĵetono (token).");
                    res.should.have.status(400);
                    err.should.have.status(400);
                })
                done();
       })

       it('it should POST a grupoj', function (done) {
           var grupo = {mallongigilo: 'mallongigilo', nomo: 'nomo', priskribo: 'priskribo'}

           chai.request(server)
               .post('/grupoj')
               .set('x-access-token', token)
               .send(grupo)
               .end((err, res) => {
                    res.body.should.have.property('insertId');
                    res.body.should.have.property('affectedRows');
                    res.body.affectedRows.should.equal(1);
                    done();
                })
       })

   });


    describe('PUT /grupoj', function () {
        var token = '';

        before(function (done) {
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
                .post('/admin/ensaluti')
                .send(uzanto)
                .end(function (err, res) {
                    token = res.body.token;
                    done();
                });

        });


        it('it should UPDATE a grupoj', function (done) {

            Grupo.insert('mallongigilo', 'nomo', 'priskribo').then(function (success) {
                chai.request(server)
                    .put('/grupoj/' + success.insertId)
                    .set('x-access-token', token)
                    .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.message.should.equal('Ĝisdatigo sukcese farita');
                        done();
                    })
            });

        })

        it('it should NOT UPDATE a grupoj', function (done) {

            Grupo.insert('mallongigilo', 'nomo', 'priskribo').then(function (success) {
                chai.request(server)
                    .put('/grupoj/' + success.insertId)
                    .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
                    .end((err, res) => {
                        var error = JSON.parse(err.response.error.text);

                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        res.should.have.status(400);
                        err.should.have.status(400);
                        done();
                    })
            });

        })
    })


    describe('DELETE /grupoj', function () {
        var token = '';

        before(function (done) {
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
                .post('/admin/ensaluti')
                .send(uzanto)
                .end(function (err, res) {
                    token = res.body.token;
                    done();
                });

        });

        it('it should DELETE a grupoj', function (done) {
            Grupo.insert('mallongigilo', 'nomo', 'priskribo').then(function (success) {
                chai.request(server)
                    .delete('/grupoj/' + success.insertId)
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    })
            });
        })

        it('it should NOT DELETE a grupoj', function (done) {
            Grupo.insert('mallongigilo', 'nomo', 'priskribo').then(function (success) {
                chai.request(server)
                    .delete('/grupoj/' + success.insertId)
                    .end((err, res) => {
                        var error = JSON.parse(err.response.error.text);

                        error.success.should.equal(false);
                        error.message.should.equal("Sen ĵetono (token).");
                        res.should.have.status(400);
                        err.should.have.status(400);
                        done();
                    })
            });
        })
    })
});
