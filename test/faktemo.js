describe('==== FAKTEMO ====', () => {

  var token = '';
  var faktemoModel1 = {
    nomo : "Edukado",
    priskribo : "priskribo"
  };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('faktemo');
      token = generateToken();
      done();
  });

  describe('GET /faktemoj', () => {
    it('it should GET faktemon - sen faktemoj', (done) => {
      request
        .get('/faktemoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /faktemoj/:id', () => {
    it('it should GET faktemon - kun faktemoj', (done) => {
      request
        .post('/faktemoj')
        .set('x-access-token', token)
        .send(faktemoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/faktemoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('nomo');
          res.body[0].nomo.should.equal(faktemoModel1.nomo);
          res.body[0].should.have.property('priskribo');
          res.body[0].priskribo.should.equal(faktemoModel1.priskribo);
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /faktemoj', () => {
    it('it should NOT POST faktemon - sen permeso', (done) => {
      request
        .post('/faktemoj')
        .send(faktemoModel1)
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
     });

     it('it should POST faktemon', (done) => {
       request
        .post('/faktemoj')
        .set('x-access-token', token)
        .send(faktemoModel1)
        .expect(201)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /faktemoj/:id', () => {
    it('it should NOT DELETE faktemon - sen permeso', (done) => {
      request
        .post('/faktemoj')
        .set('x-access-token', token)
        .send(faktemoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/faktemoj/' + res.body.insertId)
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT DELETE faktemon - sen permeso', (done) => {
      var faktemoId;
      request
        .post('/faktemoj')
        .set('x-access-token', token)
        .send(faktemoModel1)
        .expect(201)
      .then((res) => {
      faktemoId = res.body.insertId;
      return request
        .delete('/faktemoj/' + faktemoId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((res) => {
      return request
        .get('/faktemoj/' + faktemoId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

});
