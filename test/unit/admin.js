/*
  INCOMPLETE
*/
describe('==== ADMIN ====', () => {
  var token = ''
  var uzantoModel1 = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
  var uzantoModel2   = {"uzantnomo":"duauzanto", "pasvorto": "iupasvort"};

  //Before each test we empty the database
  before((done) => {
      createAdmin();
      cleanTable('administranto');
      token = generateToken();
      done();
  });

  describe('Admin sen agordo', () => {

    describe('GET /admin/agordita', () => {
      it('sen administrantoj en la sistemo',(done) => {
        request
          .get('/admin/agordita')
          .end((err,res) => {
            res.status.should.be.equal(200);
            res.body.should.have.property('agordita', false);
            done();
          });
      });
    });

  });

  describe('Admin kun agordo', () => {
    before((done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          res.body.should.have.property('message');
          done();
        });
    });

    describe('GET /admin/agordita', () => {
      it('kun administrantoj en la sistemo', (done) => {
        request
        .get('/admin/agordita')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.should.have.property('agordita', true);
          done();
        });
      });
    });

  });

});
