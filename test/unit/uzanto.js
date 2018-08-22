describe('==== UZANTO ====', () => {

  var uzanto = {
    "uzantnomo" : "retposxto@io.com",
    "pasvorto" : "nomoLoka",
    "personanomo": "personanomo",
    "titolo":"titolo",
    "adreso":"adreso",
    "posxtkodo":"idNacialando",
    "idLando": 1,
    "naskigxtago": "1996-05-05",
    "retposxto":"retposxto@io.com"
  };

  var uzantoSenUzantnomo = {
    "personanomo": "personanomo",
    "titolo":"titolo",
    "adreso":"adreso",
    "posxtkodo":"idNacialando",
    "idLando": 1,
    "naskigxtago": "1996-05-05"
  };

  var uzanto_ueakodo = {
    "uzantnomo" : "retposxto@io.com",
     "pasvorto" : "nomoLoka",
     "personanomo": "personanomo",
     "titolo":"titolo",
     "adreso":"adreso",
     "posxtkodo":"idNacialando",
     "idLando": 1,
     "naskigxtago": "1996-05-05",
     "ueakodo":"aamcf"
   };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('uzantoAuxAsocio');
      cleanTable('uzanto');
      token = generateToken();
      tokenUzanto = generateToken('uzanto');
      done();
  });

  describe('POST /uzantoj', () => {
    it('it should POST a uzanto', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto_ueakodo)
        .expect(201)
      .then((res) => {
      uzanto_ueakodo["id"] = res.body.id;
      return request
        .get('/uzantoj/' + res.body.id)
        .expect(200)
        .set('x-access-token', getToken(uzanto_ueakodo))
        .expect((res) => {
          res.body[0].ueakodo.should.equals('aamcf');
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should POST a uzanto kun UEA-kodo', (done) => {
      request
        .post('/uzantoj')
        .send(uzantoSenUzantnomo)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('id');
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

    it('it should POST a uzanto sen uzantnomo', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('id');
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

  });

  describe('POST /uzantoj/forgesisPasvorton', () => {
    it('forgesis pasvorton sen uzanto', (done) => {
      request
        .post('/uzantoj/forgesisPasvorton')
        .send({"retposxto": "retposxto@io.com", "naskigxtago": "1996-05-05"})
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe('GET /uzantoj/cxuMembro/:retposxto', () => {
    it('should get false email', (done) => {
      request
        .get('/uzantoj/cxuMembro/retposxto@io.com')
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('membro');
          res.body.membro.should.equal(false);
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

});
