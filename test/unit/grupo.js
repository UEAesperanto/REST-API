describe('==== GRUPO ====', () => {
  tokenAdmin = '';
  grupoModel1 = {mallongigilo: 'mallongigilo' , nomo: 'nomo', priskribo: 'priskribo'};
  kategoriojModel1 = {nomo: 'laboro'};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('grupo');
      cleanTable('grupa_kategorio');
      cleanTable('ref_grupo_grupa_kategorio');
      tokenAdmin  =  generateToken();
      tokenUzanto = generateToken('uzanto');
      tokenMembro = generateToken('membro');
      generateKategorioj();
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
        .get('/grupoj/kategorioj/' + testConfig.idLaborgrupo + '/sub')
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

    it('it should GET a grupoj anoj', function (done) {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .get('/grupoj/' + res.body.insertId + '/anoj')
        .set('x-access-token', tokenAdmin)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the grupoj/:id/anoj laborgrupo', (done) => {
      var idGrupo;
      var idKategorio;
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      idGrupo = res.body.insertId;
      return request
        .post('/grupoj/kategorioj/'+ config.idLaborgrupo + '/sub/' + idGrupo)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      })
      .then((res) => {
      idKategorio = res.body.insertId;
      return request
        .get('/grupoj/' + idGrupo + '/anoj')
        .set('x-access-token', tokenMembro)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('it should GET all the grupoj/:id/anoj laborgrupo - uzanto sen membreco', (done) => {
      var idGrupo;
      var idKategorio;
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      idGrupo = res.body.insertId;
      return request
        .post('/grupoj/kategorioj/'+ config.idLaborgrupo + '/sub/' + idGrupo)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      })
      .then((res) => {
      idKategorio = res.body.insertId;
      return request
        .get('/grupoj/' + idGrupo + '/anoj')
        .set('x-access-token', tokenUzanto)
        .expect(403)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('DELETE /grupoj/kategorioj/:idKat/sub/:idGrupo', () => {
    it('it should delete ref_grupo_grupa_kategorio', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      idGrupo = res.body.insertId;
      return request
        .post('/grupoj/kategorioj/'+ config.idLaborgrupo + '/sub/' + idGrupo)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      })
      .then((res) => {
      return request
        .delete('/grupoj/kategorioj/2/sub/10')
        .set('x-access-token', tokenAdmin)
        .expect(204)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('POST /grupoj/:id/anoj', () => {
    it('it should POST all the grupoj/:id/anoj for membrecgrupo', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .set('x-access-token', tokenAdmin)
        .expect(201)
      .then((res) => {
      return request
        .post('/grupoj/' + res.body.insertId + '/anoj')
        .set('x-access-token', tokenAdmin)
        .send({"idAno":4})
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('POST /grupoj', () => {
    it('it should NOT POST a grupo without token', (done) => {
      request
        .post('/grupoj')
        .send(grupoModel1)
        .expect(400)
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('it should POST a grupoj', (done) => {
      request
        .post('/grupoj')
        .set('x-access-token', tokenAdmin)
        .send(grupoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('insertId');
          res.body.should.have.property('affectedRows');
          res.body.affectedRows.should.equal(1);
        })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('PUT /grupoj', () => {
    it('it should UPDATE a grupoj', (done) => {
      request
        .post('/grupoj')
        .set('x-access-token', tokenAdmin)
        .send(grupoModel1)
        .expect(201)
      .then((res) => {
      return request
        .put('/grupoj/' + res.body.insertId)
        .set('x-access-token', tokenAdmin)
        .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('message');
          res.body.message.should.equal('Ĝisdatigo sukcese farita');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('it should NOT UPDATE a grupoj', (done) => {
      request
        .post('/grupoj')
        .set('x-access-token', tokenAdmin)
        .send(grupoModel1)
        .expect(201)
      .then((res) => {
      return request
        .put('/grupoj/' + res.body.insertId)
        .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('DELETE /grupoj', () => {
    it('it should DELETE a grupoj', (done) => {
      request
        .post('/grupoj')
        .set('x-access-token', tokenAdmin)
        .send(grupoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/grupoj/' + res.body.insertId)
        .set('x-access-token', tokenAdmin)
        .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
        .expect(204)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('it should NOT DELETE a grupoj', (done) => {
      request
        .post('/grupoj')
        .set('x-access-token', tokenAdmin)
        .send(grupoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/grupoj/' + res.body.insertId)
        .send({kampo: 'mallongigilo', valoro: 'new mallongigilo'})
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })
});
