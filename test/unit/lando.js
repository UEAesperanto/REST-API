describe('==== LANDO ====', () => {
  var Lando = require('../../models/lando');
  var token = '';
  var landoModel1 = {
    valuto : "eur",
    radikoEo : "radiko",
    finajxoEo: "finajxo",
    landkodo : "l1"
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
      Lando.insert("eur", "radiko", "finajxo", "lk");
      Lando.insert("eur", "radiko", "finajxo", "l2");
      Lando.insert("eur", "radiko", "finajxo", "l1");

      request
      .get('/landoj')
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.length.should.equals(3);
        done(err);
      });
    });

    it('it should GET all the landoj', (done) => {
      request
      .get('/landoj')
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.length.should.equals(0)
        done();
      });
    });

  });

  describe('GET /landoj/:id', () => {
    it('it should GET a lando given id', function(done){
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .get('/landoj/' + success.insertId)
        .end((err,res) =>{
          res.status.should.be.equal(200);
          res.body[0].should.have.property('finajxoEo');
          res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
          res.body[0].should.have.property('valuto');
          res.body[0].valuto.should.equal(landoModel1.valuto);
          res.body[0].should.have.property('radikoEo');
          res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
          res.body[0].should.have.property('landkodo');
          res.body[0].landkodo.should.equal(landoModel1.landkodo);
          done();
        });
      });
    });

    it('it should NOT GET a landoj given id', function(done){
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
          .get('/landoj/' + success.insertId + 1)
          .end((err,res) => {
            var response = JSON.stringify(res.body);
            res.status.should.be.equal(200);
            res.body.length.should.equals(0);
            res.body.should.be.a('array');
            response.should.equal('[]');
            done();
          });
        });
      });
  });

  describe('POST /landoj', () => {
    it('it should NOT POST a lando - Sen ĵetono (token)',(done) => {
      request
        .post('/landoj')
        .send(landoModel1)
        .end((err, res) => {
          res.status.should.be.equal(400);
          res.clientError.should.be.equal(true);
          res.serverError.should.be.equal(false);
          res.body.success.should.be.equal(false);
          res.body.message.should.be.equal("Sen ĵetono (token).");
          done();
        });
    });

    it('it should POST a lando - with token', (done) => {
      request
        .post('/landoj')
        .set('x-access-token', token)
        .send(landoModel1)
        .end((err, res) => {
          res.status.should.be.equal(201);
          request
            .get('/landoj/' + res.body.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal(landoModel1.valuto);
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal(landoModel1.landkodo);
              done();
            });
        });
      });

  });

  describe('DELETE /landoj/:id', () => {
    it('it should NOT DELETE a lando - Sen ĵetono', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
          .delete('/landoj/' + success.insertId)
          .end((err,res) => {
            var response = JSON.stringify(res.body);
            res.status.should.be.equal(400);
            res.clientError.should.be.equal(true);
            res.serverError.should.be.equal(false);
            res.body.success.should.be.equal(false);
            res.body.message.should.be.equal("Sen ĵetono (token).");
            done();
          });
        });
      });

      it('it should DELETE a lando - with token', (done) => {
        var lando = Lando.insert(
          landoModel1.valuto,
          landoModel1.radikoEo,
          landoModel1.finajxoEo,
          landoModel1.landkodo
        );

        lando.then((success) => {
          request
            .delete('/landoj/' + success.insertId)
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.clientError.should.be.equal(false);
              res.serverError.should.be.equal(false);
              res.body.message.should.be.equal("Ok");
              done();
            });
          });
        });
  });

  describe('PUT /landoj/:id', () => {


    it('it should NOT UPDATE a lando - Sen ĵetono', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .put('/landoj/' + success.insertId)
        .send({kampo: 'valuto', valoro: 'new valuto'})
        .end((err, res) => {
          res.status.should.be.equal(400);
          res.clientError.should.be.equal(true);
          res.serverError.should.be.equal(false);
          res.body.success.should.be.equal(false);
          res.body.message.should.be.equal("Sen ĵetono (token).");
          done();
        });
      });
    });


    it('it should UPDATE a lando valuto - with token', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .put('/landoj/' + success.insertId)
        .set('x-access-token', token)
        .send({kampo: 'valuto', valoro: 'gbp'})
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
          request
            .get('/landoj/' + success.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal('gbp');
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal(landoModel1.landkodo);
              done();
            });
        });
      });
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .put('/landoj/' + success.insertId)
        .set('x-access-token', token)
        .send({kampo: 'radikoEo', valoro: 'new radikoEo'})
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
          request
            .get('/landoj/' + success.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal(landoModel1.valuto);
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal('new radikoEo');
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal(landoModel1.landkodo);
              done();
            });
        });
      });
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .put('/landoj/' + success.insertId)
        .set('x-access-token', token)
        .send({kampo: 'finajxoEo', valoro: 'new finajxoEo'})
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
          request
            .get('/landoj/' + success.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal('new finajxoEo');
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal(landoModel1.valuto);
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal(landoModel1.landkodo);
              done();
            });
        });
      });
    });

    it('it should UPDATE a lando valuto - with token', (done) => {
      var lando = Lando.insert(
        landoModel1.valuto,
        landoModel1.radikoEo,
        landoModel1.finajxoEo,
        landoModel1.landkodo
      );

      lando.then((success) => {
        request
        .put('/landoj/' + success.insertId)
        .set('x-access-token', token)
        .send({kampo: 'landkodo', valoro: 'lk'})
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
          request
            .get('/landoj/' + success.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('finajxoEo');
              res.body[0].finajxoEo.should.equal(landoModel1.finajxoEo);
              res.body[0].should.have.property('valuto');
              res.body[0].valuto.should.equal(landoModel1.valuto);
              res.body[0].should.have.property('radikoEo');
              res.body[0].radikoEo.should.equal(landoModel1.radikoEo);
              res.body[0].should.have.property('landkodo');
              res.body[0].landkodo.should.equal('lk');
              done();
            });
        });
      });
    });

  });

});
