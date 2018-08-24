describe('==== OPCIO ====', () => {

  var token = '';
  var opcioModel1 = {
    "priskribo":"priskribo",
    "idVocxdonado":1
  }
  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('opcio');
      token = generateToken();
      done();
  });

  describe('GET /opcioj', () => {
    it('it should POST opcion',(done) => {
      request
        .get('/opcioj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /opcioj', () => {
    it('it should POST opcion',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .expect(201)
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT POST opcion',(done) => {
      request
        .post('/opcioj')
        .send(opcioModel1)
        .expect(400)
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /opcioj/:id', () => {
    it('it should GET opcion - kun opcioj',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/opcioj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('priskribo');
          res.body[0].priskribo.should.equal(opcioModel1.priskribo);
          res.body[0].should.have.property('idVocxdonado');
          res.body[0].idVocxdonado.should.equal(opcioModel1.idVocxdonado);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /opcioj/:id', () => {
    it('it should DELETE opcion',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/opcioj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT DELETE opcion - sen permeso',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/opcioj/' + res.body.insertId)
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
