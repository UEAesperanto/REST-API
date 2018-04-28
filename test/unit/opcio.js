describe('==== OPCIO ====', () => {
  var token = '';
  var opcioModel1 = {
    "priskribo":"priskribo",
    "idVocxdonado":1
  }
  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('opcio');
      token = generateToken();
      done();
  });

  describe('GET /opcioj', () => {
    it('it should POST opcion',(done) => {
      request
        .get('/opcioj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          res.body.length.should.equals(0);
          done();
        });
    });
  });

  describe('POST /opcioj', () => {
    it('it should POST opcion',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          done();
        });
    });

    it('it should NOT POST opcion',(done) => {
      request
        .post('/opcioj')
        .send(opcioModel1)
        .end((err,res) => {
          res.status.should.be.equal(400);
          done();
        });
    });
  });

  describe('GET /opcioj/:id', () => {
    it('it should GET opcion - kun opcioj',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
          .get('/opcioj/' + res.body.insertId)
          .end((err,res) => {
            res.status.should.be.equal(200);
            res.body[0].should.have.property('priskribo');
            res.body[0].priskribo.should.equal(opcioModel1.priskribo);
            res.body[0].should.have.property('idVocxdonado');
            res.body[0].idVocxdonado.should.equal(opcioModel1.idVocxdonado);
            done();
          });
        });
    });
  });

  describe('DELETE /opcioj/:id', () => {
    it('it should DELETE opcion',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
          .delete('/opcioj/' + res.body.insertId)
          .set('x-access-token', token)
          .end((err,res) => {
            res.status.should.be.equal(204);
            done();
          });
        });
    });

    it('it should NOT DELETE opcion - sen permeso',(done) => {
      request
        .post('/opcioj')
        .set('x-access-token', token)
        .send(opcioModel1)
        .end((err,res) => {
          res.status.should.be.equal(201);
          request
          .delete('/opcioj/' + res.body.insertId)
          .end((err,res) => {
            res.status.should.be.equal(400);
            done();
          });
        });
    });
  });

});
