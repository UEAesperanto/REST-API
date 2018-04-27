describe('==== GRUPO ====', () => {
  token = '';
  grupoModel1 = {mallongigilo: 'mallongigilo' , nomo: 'nomo', priskribo: 'priskribo'};
  kategoriojModel1 = {nomo: 'kategorio1'};

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

  describe('POST /grupoj/kategorioj', () => {
    it('it should POST a kategorio', (done) => {
      request
        .post('/grupoj/kategorioj')
        .send(kategoriojModel1)
        .set('x-access-token', token)
        .end((err,res) => {
          res.status.should.be.equal(201);
          done();
        });
    });
  });

  describe('GET /grupoj/kategorioj/:id/sub', () => {
    it('it should GET all the grupoj/laboroj with body', (done) => {
      request
        .get('/grupoj/kategorioj/1/sub')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });

    it('it should GET all the grupoj/membrecoj with body', () => {
      request
        .get('/grupoj/kategorioj/4/sub')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });

    it('it should GET all the aldonaj membrecoj with body', () => {
      request
        .get('/grupoj/kategorioj/5/sub')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('GET /grupoj/1/kotizoj', () => {
    it('', (done) => {
      request
        .get('/grupoj/1/kotizoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

});
