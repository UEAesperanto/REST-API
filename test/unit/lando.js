describe('==== LANDO ====', () => {
  var Lando = require('../../models/lando');
  var token = '';
  var landoModel1 = {
    valuto : "eur",
    radikoEo : "radiko",
    finajxoEo: "finajxo",
    landkodo : "l1"
  };

  var landoModel2 = {
    valuto : "eur",
    radikoEo : "radiko",
    finajxoEo: "finajxo",
    landkodo : "lk"
  };

  var landoModel3 = {
    valuto : "eur",
    radikoEo : "radiko",
    finajxoEo: "finajxo",
    landkodo : "l2"
  };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('lando');
      token = generateToken();
      done();
  });

  describe('GET /landoj', () => {
    it('it should GET all the landoj',(done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel2)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel3)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/landoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(3);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the landoj', (done) => {
      request
      .get('/landoj')
      .expect(200)
      .expect((res) => {
        res.body.length.should.equals(0)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('GET /landoj/:id', () => {
    it('it should GET a lando given id', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/landoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET a landoj given id', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/landoj/' + res.body.insertId + 1)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
          res.body.should.be.a('array');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('POST /landoj', () => {
    it('it should NOT POST a lando - Sen ĵetono (token)',(done) => {
      request
        .post('/landoj')
        .send(landoModel1)
        .expect(400)
        .expect((res) => {
          res.clientError.should.be.equal(true);
          res.serverError.should.be.equal(false);
          res.body.success.should.be.equal(false);
          res.body.message.should.be.equal("Sen ĵetono (token).");
        })
        .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST a lando - with token', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/landoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('DELETE /landoj/:id', () => {
    it('it should NOT DELETE a lando - Sen ĵetono', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/landoj/' + res.body.insertId)
        .expect(400)
        .expect((res) => {
          res.clientError.should.be.equal(true);
          res.serverError.should.be.equal(false);
          res.body.success.should.be.equal(false);
          res.body.message.should.be.equal("Sen ĵetono (token).");
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

      it('it should DELETE a lando - with token', (done) => {
        request
          .post('/landoj')
          .set('x-access-token', token)
          .send(landoModel1)
          .expect(201)
        .then((res) => {
        return request
          .delete('/landoj/' + res.body.insertId)
          .set('x-access-token', token)
          .expect(200)
          .expect((res) => {
            res.clientError.should.be.equal(false);
            res.serverError.should.be.equal(false);
            res.body.message.should.be.equal("Ok");
          })
        })
        .then((success) => {done()}, (error) => {done(error)});
      });
  });

  describe('PUT /landoj/:id', () => {
    it('it should NOT UPDATE a lando - Sen ĵetono', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      return request
        .put('/landoj/' + res.body.insertId)
        .send({kampo: 'valuto', valoro: 'new valuto'})
        .expect(400)
        .expect((res) => {
          res.clientError.should.be.equal(true);
          res.serverError.should.be.equal(false);
          res.body.success.should.be.equal(false);
          res.body.message.should.be.equal("Sen ĵetono (token).");
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });


    it('it should UPDATE a lando valuto - with token', (done) => {
      var landoId;
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      landoId = res.body.insertId
      return request
        .put('/landoj/' + landoId)
        .set('x-access-token', token)
        .send({kampo: 'valuto', valoro: 'gbp'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((res) => {
      return request
        .get('/landoj/' + landoId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal('gbp');
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var landoId;
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      landoId = res.body.insertId
      return request
        .put('/landoj/' + landoId)
        .set('x-access-token', token)
        .send({kampo: 'radikoEo', valoro: 'new radikoEo'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((res) => {
      return request
        .get('/landoj/' + landoId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal('new radikoEo');
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var landoId;
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      landoId = res.body.insertId
      return request
        .put('/landoj/' + landoId)
        .set('x-access-token', token)
        .send({kampo: 'finajxoEo', valoro: 'new finajxoEo'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((res) => {
      return request
        .get('/landoj/' + landoId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal('new finajxoEo');
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var landoId;
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .expect(201)
      .then((res) => {
      landoId = res.body.insertId
      return request
        .put('/landoj/' + landoId)
        .set('x-access-token', token)
        .send({kampo: 'landkodo', valoro: 'lk'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((res) => {
      return request
        .get('/landoj/' + landoId)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal('lk');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

});
