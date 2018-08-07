/*
      INCOMPLETE
*/
describe('==== GRUPO ====', () => {
  tokenAdmin = '';
  grupoModel1 = {mallongigilo: 'mallongigilo' , nomo: 'nomo', priskribo: 'priskribo'};
  kategoriojModel1 = {nomo: 'kategorio1'};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('grupo');
      cleanTable('grupa_kategorio');
      cleanTable('ref_grupo_grupa_kategorio');
      tokenAdmin  =  generateToken();
      tokenUzanto = generateToken(['uzanto']);
      tokenMembro = generateToken(['uzanto','membro']);
      done();
  });


  describe('GET /grupoj', () => {
    it('it should GET all the grupoj',(done) => {
      request
        .get('/grupoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equal(0);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the grupoj with body', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equal(1);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /grupoj/:id', () => {
    it('it should GET a grupoj with a given id', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.status.should.be.equal(200);
          res.body[0].should.have.property('mallongigilo');
          res.body[0].should.have.property('nomo');
          res.body[0].should.have.property('priskribo');
          res.body[0].mallongigilo.should.equal(grupoModel1.mallongigilo);
          res.body[0].nomo.should.equal(grupoModel1.nomo);
          res.body[0].priskribo.should.equal(grupoModel1.priskribo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /grupoj/kategorioj', () => {
    it('it should POST a kategorio', (done) => {
      request
        .post('/grupoj/kategorioj')
        .send(kategoriojModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /grupoj/kategorioj/:id/sub', () => {
    it('it should GET all the grupoj/laboroj with body', (done) => {
      request
        .post('/grupoj/kategorioj')
        .send(kategoriojModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/kategorioj/' + res.body.insertId + '/sub')
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /grupoj/:id/kotizoj', () => {
    it('it should GET all the grupoj/:id/kotizoj with body', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/' + res.body.insertId + '/kotizoj')
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET grupoj/:id/anoj', () => {
    it('it NOT should GET all grupoj/:id/anoj - sen ĵetono', (done) => {
      var idGrupo;
      var idKategorio;
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/' + res.body.insertId + '/anoj')
        .expect(403)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('it NOT should GET all grupoj/:id/anoj - uzanto sen membreco', (done) => {
      var idGrupo;
      var idKategorio;
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/' + res.body.insertId + '/anoj')
        .set('x-access-token', tokenUzanto)
        .expect(403)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

});
