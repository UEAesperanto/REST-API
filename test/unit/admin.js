/*
  INCOMPLETE
*/
describe('==== ADMIN ====', () => {
  var token = ''
  var uzantoModel1 = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
  var uzantoModel2   = {"uzantnomo":"duauzanto", "pasvorto": "iupasvort"};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('administranto');
      cleanTable('ref_administranto_adminrajto')
      token = generateToken();
      done();
  });

  describe('Admin sen agordo', () => {

    describe('GET /admin/agordita', () => {
      it('sen administrantoj en la sistemo',(done) => {
        request
          .get('/admin/agordita')
          .expect(200)
          .expect((res) => {
            res.body.should.have.property('agordita', false);
          })
        .then((success) => {done()}, (error) => {done(error)});
      });
    });
  });

  describe('Admin kun agordo', () => {

    describe('GET /admin/agordita', () => {
      it('kun administrantoj en la sistemo', (done) => {
        request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(201)
          .expect((res) => {
            res.body.should.have.property('message');
          })
        .then((res) => {
        return request
          .get('/admin/agordita')
          .expect(200)
          .expect((res) => {
            res.body.should.have.property('agordita', true);
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      });
    });

    describe('POST /admin/ensaluti', () => {
      it('Enmeti iun kun administrantoj en la sistemo', (done) => {
        request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(201)
          .expect((res) => {
            res.body.should.have.property('message');
          })
        .then((res) => {
        return request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(200)
          .expect((res) => {
            res.body.should.have.property('token');
          })
        })
        .then((res) => {
        return request
          .post('/admin')
          .set('x-access-token', res.body.token)
          .send(uzantoModel2)
          .expect(201)
        })
        .then((success) => {done()}, (error) => {done(error)});
      })

      it('korekte ensaluti', (done) => {
        request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(201)
          .expect((res) => {
            res.body.should.have.property('message');
          })
        .then((res) => {
        return request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(200)
          .expect((res) => {
            res.body.should.have.property('token')
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      })

      it('ensaluti kun malkorekta pasvorto', (done) => {
        request
          .post('/admin/ensaluti')
          .send(uzantoModel1)
          .expect(201)
          .expect((res) => {
            res.body.should.have.property('message');
          })
        .then((res) => {
        var uzanto = uzantoModel1;
        uzanto["pasvorto"] = "malkorekta"
        return request
          .post('/admin/ensaluti')
          .send(uzanto)
          .expect(401)
          .expect((res) => {
              res.body.should.have.property('message', 'Malkorekta pasvorto');
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      })
    })

  });

});
