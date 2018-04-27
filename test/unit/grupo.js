describe('==== GRUPO ====', () => {
  token = '';
  grupoModel1 = {mallongigilo: 'mallongigilo' , nomo: 'nomo', priskribo: 'priskribo'};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('grupo');
      token = generateToken();
      done();
  });

  describe('GET /grupoj', () => {
    it('it should GET all the grupoj',(done) => {
      request
        .get('/grupoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equal(0);
          done();
        });
    });

    it('it should GET all the grupoj with body', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', token)
        .end((err,res) => {
          request
            .get('/grupoj')
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equal(1);
              done();
            });
        });
    });
  });

  describe('GET /grupoj/:id', () => {
    it('it should GET all the grupoj with body', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', token)
        .end((err,res) => {
          request
            .get('/grupoj/' + res.body.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body[0].should.have.property('mallongigilo');
              res.body[0].should.have.property('nomo');
              res.body[0].should.have.property('priskribo');
              res.body[0].mallongigilo.should.equal(grupoModel1.mallongigilo);
              res.body[0].nomo.should.equal(grupoModel1.nomo);
              res.body[0].priskribo.should.equal(grupoModel1.priskribo);
              done();
            });
        });
    });
  });

});
