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
        .end((err,res) => {
          res.status.should.be.equal(400);
          done();
        });
    });

    it('it should POST a peranto',(done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          done();
        });
    });
  });

  describe('GET /perantoj', () => {
    it('it should GET all the peranto',(done) => {
      request
        .get('/perantoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equals(0);
          done();
        });
    });

    it('it should GET all the peranto',(done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .get('/perantoj/')
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              done();
            });
        });
    });
  });

  describe('PUT /perantoj', () => {
    it('it should UPDATE a peranto with token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .put('/perantoj/' + res.body.insertId)
            .set('x-access-token', token)
            .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.message.should.equal("Ĝisdatigo sukcese farita");
              done();
          });
        });
    });

    it('it should NOT UPDATE a peranto without token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .put('/perantoj/' + res.body.insertId)
            .send({kampo: 'publikaNomo', valoro: 'new publikaNomo'})
            .end((err,res) => {
              res.status.should.be.equal(400);
              done();
          });
        });
    });
  });

  describe('DELETE /perantoj', () => {
    it('it should DELETE a peranto', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .delete('/perantoj/' + res.body.insertId)
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(204);
              done();
          });
        });
    });

    it('it should NOT DELETE a peranto without token', (done) => {
      request
        .post('/perantoj')
        .send(perantoModel)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .delete('/perantoj/' + res.body.insertId)
            .end((err,res) => {
              res.status.should.be.equal(400);
              done();
          });
        });
    });
  });

});
