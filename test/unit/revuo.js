/*
  INCOMPLETE
*/
describe('==== REVUO ====', () => {
  var revuoModel1 = {
    "titolo":"Revuo Esperanto",
    fondjaro:1920,
    issn:"333"
  };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('revuo');
      cleanTable('volumo');
      token = generateToken();
      done();
  });

  describe('POST /revuoj', () => {
    it('it should POST revuon',(done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          done();
        });
    });

    it('it should POST revuon - sen permeso',(done) => {
      request
        .post('/revuoj')
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(400);
          done();
        });
    });
  });

  describe('GET /revuoj', () => {
    it('it should GET revuon - sen revuoj', (done) => {
      request
        .get('/revuoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equals(0);
          done();
        });
    });

    it('it should GET revuon - kun revuoj', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .get('/revuoj')
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              res.body[0].should.have.property('titolo');
              res.body[0].should.have.property('fondjaro');
              res.body[0].should.have.property('issn');
              done();
            });
        });
    });
  });

  describe('DELETE /revuoj/:id', () => {
    it('it should DELETE revuon', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .delete('/revuoj/' + res.body.insertId)
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(204);
              done();
            });
        });
    });

    it('it should NOT DELETE revuon - sen permeso', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .delete('/revuoj/' + res.body.insertId)
            .end((err,res) => {
              res.status.should.be.equal(400);
              done();
            });
        });
    });
  });

  describe('POST /revuoj/:id/volumoj', () => {
    it('it should POST volumon', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .post('/revuoj/' + res.body.insertId + '/volumoj')
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(201);
              done();
            });
        });
    });
  });

  describe('POST /revuoj/volumoj/:id/bildo', () => {
    it('it should POST volumon files - bildo', (done) => {
      request
        .post('/revuoj/volumoj/1/bildo')
        .set('x-access-token', token)
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .get('/revuoj/volumoj/1/bildo')
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.text.should.to.be.a('string');
              res.text.substring(0,15).should.to.have.string('data:image/png');
              done();
            })
        });
    });

    it('it should NOT POST volumon files - sen ĵetono', (done) => {
      request
        .post('/revuoj/volumoj/1/bildo')
        .attach("file", readFileSync("test/files/logoo.png"), "file.test")
        .end((err,res) => {
          res.status.should.be.equal(400);
          done();
        });
    });

  });

  describe('POST /revuoj/volumoj/1/kvalita', () => {
    it('it should POST volumon files - PDF', (done) => {
      request
        .post('/revuoj/volumoj/1/kvalita')
        .set('x-access-token', token)
        .attach("file", readFileSync("test/files/LIBRO.pdf"), "file.test")
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
            .get('/revuoj/volumoj/1/kvalita')
            .set('x-access-token', token)
            .end((err,res) => {
              res.status.should.be.equal(200);
              res.text.should.to.be.a('string');
              res.text.substring(0,20).should.to.have.string('data:application/pdf');
              done();
            });
        });
    });
  });

});
