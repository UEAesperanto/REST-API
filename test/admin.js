//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Admin = require('../models/admin');


chai.use(chaiHttp);
describe('Admin', function() {
    before(function(done) { //Antaux cxiuj testoj, oni purigas la datumbazon
      var query1 = 'INSERT INTO adminrajto ()\
                    VALUES (\
                      1, /*id int(11) PRIMARY KEY AUTO_INCREMENT*/\
                      "administranto",/*nomo varchar(255)*/\
                      "Rajtos aliri al datumoj de membroj, aldoni novajn administrantojn, ktp"\
                    );'
      var query = util.format('DELETE FROM `administranto`');
      db.mysqlExec(query);
      db.mysqlExec(query1).then(function(result){
        done();
      });
    });

  describe('GET /admin/agordita sen agordoj', function(){
      it('sen administrantoj en la sistemo', function(done){
       chai.request(server)
           .get('/admin/agordita')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('agordita', false);
               done();
           });
       });
     });

    describe('Admin kun agordo', function() {

      before (function(done){
        var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
         chai.request(server)
           .post('/admin/ensaluti')
           .send(uzanto)
           .end(function(err, res){
               res.should.have.status(201);
               res.body.should.have.property('message');
               done();
          });
        });

        it('GET Admin/Agordita kun administrantoj en la sistemo', function(done){
         chai.request(server)
             .get('/admin/agordita')
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.have.property('agordita', true);
                 done();
             });
         });

         it ('Enmeti iun kun administrantoj en la sistemo', function(done){
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            var uzanto2 = {"uzantnomo":"duauzanto", "pasvorto": "iupasvort"};

            chai.request(server)
              .post('/admin/ensaluti')
              .send(uzanto)
              .end(function(err, res){
                  res.should.have.status(200);
                  res.body.should.have.property('token');
                  chai.request(server)
                    .post('/admin')
                    .set('x-access-token',  res.body.token)
                    .send(uzanto2)
                    .end(function(err, res){
                        res.should.have.status(201);
                        done();
                   });
             });
           });

          it('korekte ensaluti', function(done){
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};

            chai.request(server)
              .post('/admin/ensaluti')
              .send(uzanto)
              .end(function(err, res){
                  res.should.have.status(200);
                  res.body.should.have.property('token');
                  done();
                });
          });

          it('ensaluti kun malkorekta pasvorto', function(done){
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "malkorekta"};
            chai.request(server)
              .post('/admin/ensaluti')
              .send(uzanto)
              .end(function(err, res){
                  res.should.have.status(401);
                  res.body.should.have.property('message', 'Malkorekta pasvorto');
                  done();
             });
          });

          it('ensaluti kun malkorekta uzantnomo', function(done){
            var uzanto = {"uzantnomo":"malkorekta", "pasvorto": "malkorekta"};
            chai.request(server)
              .post('/admin/ensaluti')
              .send(uzanto)
              .end(function(err, res){
                  res.should.have.status(401);
                  res.body.should.have.property('message', 'La uzantnomo ne ekzistas');
                  done();
             });
          });
    });
});
