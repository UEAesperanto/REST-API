//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Admin = require('../controllers/models/admin');


chai.use(chaiHttp);
describe('Admin', function() {
    before(function(done) { //Antaux cxiuj testoj, oni purigas la datumbazon
      var query = util.format('DELETE FROM `administranto`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    /*describe('GET /admin/agordita sen agordoj', function(){
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

    describe('GET /admin/agordita sen agordoj', function() {

      before (function(done){
         var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
         chai.request(server)
           .post('/admin')
           .send(uzanto)
           .end(function(err, res){
               res.should.have.status(201);
               res.body.should.have.property('message');
            done();
          });
        });

        it('kun administrantoj en la sistemo', function(done){
         chai.request(server)
             .get('/admin/agordita')
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.have.property('agordita', true);
               done();
             });
         });

         it ('senrajte enmeti iun kun administrantoj en la sistemo', function(done){
            var uzanto = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
            chai.request(server)
              .post('/admin')
              .send(uzanto)
              .end(function(err, res){
                  res.should.have.status(403);
               done();
             });
           });

    });*/

});
