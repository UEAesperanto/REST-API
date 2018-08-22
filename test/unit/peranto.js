describe('==== PERANTO ====', () => {
  var token = '';
  var uzantoModel = {"uzantnomo":"unuauzanto", "pasvorto": "iupasvort"};
  var perantoModel = {publikaNomo: 'publikaNomo', retadreso: 'retadreso', idLando: '43'};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('peranto');
      token = generateToken();
      done();
  });

  describe('POST /perantoj', () => {
    it('it should NOT POST a peranto without token',(done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should POST a peranto',(done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /perantoj', () => {
    it('it should GET all the peranto',(done) => {
      request
        .get('/perantoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the peranto',(done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((res) => {
      return request
        .get('/perantoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('PUT /perantoj', () => {
    it('it should UPDATE a peranto with token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((res) => {
      return request
        .put('/perantoj/' + res.body.insertId)
        .set('x-access-token', token)
        .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
        .expect(200)
        .expect((res) => {
          res.body.message.should.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT UPDATE a peranto without token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((res) => {
      return request
        .put('/perantoj/' + res.body.insertId)
        .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /perantoj', () => {
    it('it should DELETE a peranto', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((res) => {
      return request
        .delete('/perantoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT DELETE a peranto without token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .expect(201)
      .then((res) => {
      return request
        .delete('/perantoj/' + res.body.insertId)
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

});
