//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Peranto = require('../controllers/models/peranto');

chai.use(chaiHttp);
describe('Peranto', function() {
    describe('GET /perantoj en la sistemo', function(){
     it('it should GET all the urboj', function(done){
       chai.request(server)
           .get('/perantoj')
           .end((err, res) => {
               res.should.have.status(200);
             done();
           });
     });
   });
});
