describe('TEKO', () => {
  var Teko = require('../../models/teko');
  tekoModel1 = {
    titolo: "titolo",
    elnomo: "elnomo",
    kodnomo: "kodnomo",
    jaro: 1,
    absnum: "absnum",
    vido: true
  }

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('teko');
      token = generateToken();
      done();
  });

  describe('GET /tekoj', () => {
    it('it should GET tekon - sen tekoj',(done) => {
      request
        .get('/tekoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equals(0);
          done();
        });
      });

    it('it should GET tekon - kun tekoj',(done) => {
      var teko = Teko.insertTeko(
        tekoModel1.titolo,
        tekoModel1.elnomo,
        tekoModel1.kodnomo,
        tekoModel1.jaro,
        tekoModel1.absnum,
        tekoModel1.vido
      );

      teko.then((success) => {
        request
          .get('/tekoj/' + success.insertId)
          .end((err,res) =>{
            res.status.should.be.equal(200);
            res.body[0].should.have.property('id');
            res.body[0].id.should.equal(success.insertId);
            res.body[0].should.have.property('titolo');
            res.body[0].titolo.should.equal(tekoModel1.titolo);
            res.body[0].should.have.property('elnomo');
            res.body[0].elnomo.should.equal(tekoModel1.elnomo);
            res.body[0].should.have.property('kodnomo');
            res.body[0].kodnomo.should.equal(tekoModel1.kodnomo);
            res.body[0].should.have.property('jaro');
            res.body[0].jaro.should.equal(tekoModel1.jaro);
            res.body[0].should.have.property('absnum');
            res.body[0].absnum.should.equal(tekoModel1.absnum);
            res.body[0].should.have.property('vido');
            res.body[0].vido.should.equal(tekoModel1.vido);
            done();
          });
        });
      });

    });

    describe('POST /tekoj',() => {
      it('it should NOT POST a lando - Sen ĵetono (token)',(done) => {
        request
          .post('/tekoj')
          .send(tekoModel1)
          .end((err, res) => {
            res.status.should.be.equal(400);
            done();
          });
        });

      it('it should POST tekon', (done) => {
        request
          .post('/tekoj')
          .set('x-access-token', token)
          .send(tekoModel1)
          .end((err, res) => {
            res.status.should.be.equal(201);
            request
              .get('/tekoj/' + res.body.insertId)
              .end((err,res) => {
                res.status.should.be.equal(200);
                res.body.length.should.equals(1);
                res.body[0].should.have.property('titolo');
                res.body[0].titolo.should.equal(tekoModel1.titolo);
                res.body[0].should.have.property('elnomo');
                res.body[0].elnomo.should.equal(tekoModel1.elnomo);
                res.body[0].should.have.property('kodnomo');
                res.body[0].kodnomo.should.equal(tekoModel1.kodnomo);
                res.body[0].should.have.property('jaro');
                res.body[0].jaro.should.equal(tekoModel1.jaro);
                res.body[0].should.have.property('absnum');
                res.body[0].absnum.should.equal(tekoModel1.absnum);
                res.body[0].should.have.property('vido');
                res.body[0].vido.should.equal(tekoModel1.vido);
                done();
              });
          });
        });

    });

    describe('DELETE /tekoj/:id', () => {
      it('it should NOT DELETE tekon - sen permeso',(done) => {
        var teko = Teko.insertTeko(
          tekoModel1.titolo,
          tekoModel1.elnomo,
          tekoModel1.kodnomo,
          tekoModel1.jaro,
          tekoModel1.absnum,
          tekoModel1.vido
        );

        teko.then((success) => {
          request
            .delete('/tekoj/' + success.insertId)
            .end((err,res) =>{
              res.status.should.be.equal(400);
              done();
            });
          });
      });


      it('it should DELETE tekon',(done) => {
        var teko = Teko.insertTeko(
          tekoModel1.titolo,
          tekoModel1.elnomo,
          tekoModel1.kodnomo,
          tekoModel1.jaro,
          tekoModel1.absnum,
          tekoModel1.vido
        );

        teko.then((success) => {
          request
            .delete('/tekoj/' + success.insertId)
            .set('x-access-token', token)
            .end((err,res) =>{
              res.status.should.be.equal(204);
              request
                .get('/tekoj/' + success.insertId)
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

    });

});
