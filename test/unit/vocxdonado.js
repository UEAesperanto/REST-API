describe('==== VOCXDONADOJ  ====', () => {

  var vocxdonadoModel1 = {
    "id":1,
    "titolo":"titolo",
    "priskribo":"priskribo",
    "pluraj_opcioj":true,
    "anonima":true,
    "aperdato":"1996-05-05",
    "limdato":"1996-05-05"
  }

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('vocxdonado');
      token = generateToken();
      done();
  });

  describe('POST /vocxdonadoj', () => {
    it('it should GET all the urboj', (done) => {
      request
        .post('/vocxdonadoj')
        .set('x-access-token', token)
        .send(vocxdonadoModel1)
        .expect(201)
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT POST vocxdonadon - sen permeso', (done) => {
      request
        .post('/vocxdonadoj')
        .send(vocxdonadoModel1)
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /vocxdonadoj', () => {
    it('it should GET vocxdonadon - sen vocxdonadoj', (done) => {
      request
        .get('/vocxdonadoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should GET vocxdonadon - kun vocxdonadoj', (done) => {
      request
        .post('/vocxdonadoj')
        .set('x-access-token', token)
        .send(vocxdonadoModel1)
        .expect(201)
      .then((res) => {
      return request
        .get('/vocxdonadoj/' + res.body.insertId)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('titolo');
          res.body[0].titolo.should.equal("titolo");
          res.body[0].should.have.property('priskribo');
          res.body[0].priskribo.should.equal("priskribo");
          res.body[0].should.have.property('pluraj_opcioj');
          res.body[0].pluraj_opcioj.should.equal(true);
          res.body[0].should.have.property('anonima');
          res.body[0].anonima.should.equal(true);
          res.body[0].should.have.property('aperdato');
          res.body[0].aperdato.should.equal("1996-05-05" + "T00:00:00.000Z");
          res.body[0].should.have.property('limdato');
          res.body[0].limdato.should.equal("1996-05-05" + "T00:00:00.000Z");
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });


  describe('DELETE /vocxdonadoj', () => {
    it('it should DELETE vocxdonadon', (done) => {
      request
        .post('/vocxdonadoj')
        .set('x-access-token', token)
        .send(vocxdonadoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/vocxdonadoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should GET all the urboj', (done) => {
      request
        .post('/vocxdonadoj')
        .set('x-access-token', token)
        .send(vocxdonadoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/vocxdonadoj/' + res.body.insertId)
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });


});
