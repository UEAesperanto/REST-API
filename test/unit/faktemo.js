describe('FAKTEMO', () => {
  var Faktemo = require('../../models/faktemo');
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
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equals(0);
          done();
        });
    });
  });

  describe('GET /faktemoj/:id', () => {
    it('it should GET faktemon - kun faktemoj', (done) => {
      faktemo = Faktemo.insertTable(
        faktemoModel1.nomo,
        faktemoModel1.priskribo
      );

      faktemo.then((success) => {
        request
          .get('/faktemoj/' + success.insertId)
          .end((err,res) => {
            res.status.should.be.equal(200);
            res.body[0].should.have.property('nomo');
            res.body[0].nomo.should.equal(faktemoModel1.nomo);
            res.body[0].should.have.property('priskribo');
            res.body[0].priskribo.should.equal(faktemoModel1.priskribo);
            done();
          });
        });
      });
  });

  describe('POST /faktemoj', () => {
    it('it should NOT POST faktemon - sen permeso', (done) => {
      request
        .post('/faktemoj')
        .send(faktemoModel1)
        .end((err, res) => {
          res.status.should.be.equal(400);
          done();
        });
     });

     it('it should POST faktemon', (done) => {
       request
        .post('/faktemoj')
        .set('x-access-token', token)
        .send(faktemoModel1)
        .end((err, res) => {
          res.status.should.be.equal(201);
          request
            .get('/faktemoj/' + res.body.insertId)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body[0].should.have.property('nomo');
              res.body[0].nomo.should.equal(faktemoModel1.nomo);
              res.body[0].should.have.property('priskribo');
              res.body[0].priskribo.should.equal(faktemoModel1.priskribo);
              done();
            });
        });
    });

    describe('DELETE /faktemoj/:id', () => {
      it('it should NOT DELETE faktemon - sen permeso', (done) => {
        faktemo = Faktemo.insertTable(
          faktemoModel1.nomo,
          faktemoModel1.priskribo
        );

        faktemo.then((success) => {
          request
            .delete('/faktemoj/' + success.insertId)
            .end((err, res) => {
              res.status.should.be.equal(400);
              done();
            });
        });
      });

      it('it should NOT DELETE faktemon - sen permeso', (done) => {
        faktemo = Faktemo.insertTable(
          faktemoModel1.nomo,
          faktemoModel1.priskribo
        );

        faktemo.then((success) => {
          request
            .delete('/faktemoj/' + success.insertId)
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.be.equal(204);
              request
                .get('/faktemoj/' + success.insertId)
                .end((err,res) => {
                  res.status.should.be.equal(200);
                  res.body.length.should.equals(0);
                  done();
                });
            });
        });
      });

    });

  });

});
