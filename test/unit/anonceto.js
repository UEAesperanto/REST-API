describe('==== ANONCETO ====', () => {

  var anoncetoModel1 = {
    'titolo': 'Anoncu ĉi tie',
    'ligilo': '/pliaj-informoj',
    'priskribo': 'xyzkwrlkdjf lkjasd',
    'butono': 'Vidu pli',
    'gxis': '2018-03-03'
  };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('anonceto');
      token = generateToken();
      done();
  });

  describe('POST /anoncetoj', () => {
    it('it should POST Anonceton', (done) => {
      request
        .post('/anoncetoj')
        .set('x-access-token', token)
        .send(anoncetoModel1)
        .expect(201)
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT POST Anonceton - sen permeson', (done) => {
      request
        .post('/anoncetoj')
        .send(anoncetoModel1)
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /anoncetoj', () => {
    it('it should POST Anonceton', (done) => {
      request
        .get('/anoncetoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should GET anonceton - kun anoncetoj', (done) => {
      request
        .post('/anoncetoj')
        .set('x-access-token', token)
        .send(anoncetoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/anoncetoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('priskribo');
          res.body[0].priskribo.should.equal('xyzkwrlkdjf lkjasd');
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /anoncetoj', () => {
    it('it should DELETE anonceton', (done) => {
      request
        .post('/anoncetoj')
        .set('x-access-token', token)
        .send(anoncetoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/anoncetoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT DELETE anonceton - sen permeso', (done) => {
      request
        .post('/anoncetoj')
        .set('x-access-token', token)
        .send(anoncetoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/anoncetoj/' + res.body.insertId)
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

});
