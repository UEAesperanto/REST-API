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

   var permesatajKampoj = [
     "uzantnomo",
     "retposxto",
     "tttpagxo",
     "telhejmo",
     "teloficejo",
     "telportebla",
     "titolo"
   ];

   var uzantoUpdate = [
     {"uzantnomo" : "retposxto@io.com"},
     {"pasvorto" : "nmoLoka"},
     {"personanomo": "prsonanomo"},
     {"titolo":"titol"},
     {"adreso":"adreo"},
     {"posxtkodo":"iNacialando"},
     {"idLando": 2},
     {"naskigxtago": "1995-05-05"},
     {"retposxto":"retposxto@io.com"}
   ];

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

  describe('PUT /uzantoj/:id', () => {
    async.each(permesatajKampoj, (item, callback) => {
      it('Devus ĝisdatigi uzanton - Kampo:' + item, (done) => {
        var uzantoId;
        request
          .post('/uzantoj')
          .send(uzanto_ueakodo)
          .expect(201)
        .then((res) => {
        uzantoId = res.body.id;
        uzanto["id"] = uzantoId;
        return request
          .put('/uzantoj/' + uzantoId)
          .set('x-access-token', getToken(uzanto))
          .send({kampo: item, valoro: "valoro"})
          .expect(200)
        })
        .then((res) => {
        return request
          .get('/uzantoj/' + uzantoId)
          .set('x-access-token', getToken(uzanto))
          .expect(200)
          .expect((res) => {
            res.body[0][item].should.equals("valoro");
          })
        })
        .then((sucess) => {done()}, (error) => {done(error)});
      })
      callback();
    })

    it('Devus ĝisdatigi uzanton - Kampo: pasvorto', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto_ueakodo)
        .expect(201)
      .then((res) => {
      uzantoId = res.body.id;
      uzanto["id"] = uzantoId;
      return request
        .put('/uzantoj/' + uzantoId)
        .set('x-access-token', getToken(uzanto))
        .send({kampo: "pasvorto", valoro: "valoro"})
        .expect(200)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

    it('It should NOT ĝisdatigi uzanton - Malpermesata kampo', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto_ueakodo)
        .expect(201)
      .then((res) => {
      uzantoId = res.body.id;
      uzanto["id"] = uzantoId;
      return request
        .put('/uzantoj/' + uzantoId)
        .set('x-access-token', getToken(uzanto))
        .send({kampo: "adreso", valoro: "valoro"})
        .expect(403)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe('GET /uzantoj/:id', () => {
    it('it should NOT GET uzanto - Alia ID', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .get('/uzantoj/' + uzanto["id"] + 1)
        .set('x-access-token', getToken(uzanto))
        .expect(403)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  })

  describe('GET /uzantoj/:id/grupoj', () => {
    it('it should GET uzantgrupoj', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .get('/uzantoj/' + uzanto["id"])
        .set('x-access-token', getToken(uzanto))
        .expect(200)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  })

  describe('GET /uzantoj/admin/:id/grupoj', () => {
    it('it should GET uzantgrupoj', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .get('/uzantoj/admin/' + uzanto["id"] + '/grupoj')
        .set('x-access-token', token)
        .expect(200)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT GET uzantgrupoj', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .get('/uzantoj/admin/' + uzanto["id"] + '/grupoj')
        .set('x-access-token', getToken(uzanto))
        .expect(403)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  })

  describe('DELETE /uzantoj/:id', () => {
    it('it should delete uzanton - ADMIN', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .delete('/uzantoj/admin/' + uzanto["id"])
        .set('x-access-token', token)
        .expect(204)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });

    it('it should NOT delete uzanton - Sen ĵetono - ADMIN', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .delete('/uzantoj/admin/' + uzanto["id"])
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  })

  describe('POST /uzantoj/forgesisPasvorton', () => {
    it('forgesis pasvorton kun uzanto', (done) => {
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .post('/uzantoj/forgesisPasvorton')
        .send({"retposxto": "retposxto@io.com", "naskigxtago": "1996-05-05"})
        .expect(200)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

    it('forgesis pasvorton sen uzanto', (done) => {
      request
        .post('/uzantoj/forgesisPasvorton')
        .send({"retposxto": "retposxto@io.com", "naskigxtago": "1996-05-05"})
        .expect(400)
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe("PUT /uzantoj/admin/:id", () => {
    async.each(uzantoUpdate, (item, callback) => {
      it('it should update uzanto - ' + Object.keys(item)[0], (done) => {
        var uzantoId, key, value;
        request
          .post('/uzantoj')
          .send(uzanto_ueakodo)
          .expect(201)
        .then((res) => {
        uzantoId = res.body.id;
        uzanto["id"] = uzantoId;
        key = Object.keys(item)[0];
        value = Object.values(item)[0];
        return request
          .put('/uzantoj/admin/' + uzantoId)
          .set('x-access-token', token)
          .send({kampo: key, valoro: value})
          .expect(200)
          .expect((res) => {
            res.body.message.should.equal("Ĝisdatigo sukcese farita");
          })
        })
        .then((sucess) => {done()}, (error) => {done(error)});
      })
      callback();
    })

    it('it should NOT update uzanton', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto_ueakodo)
        .expect(201)
      .then((res) => {
      uzantoId = res.body.id;
      return request
        .put('/uzantoj/admin/' + uzantoId)
        .set('x-access-token', token)
        .send({kampo: "id", valoro: 1})
        .expect(403)
        .expect((res) => {
          res.body.message.should.equal("vi ne povas ŝanĝi vian ID");
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe('POST /uzantoj/admin/:id/bildo', () => {
    it('should POST a bildo', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzantoId = res.body.id;
      return request
        .post('/uzantoj/admin/' + uzantoId + '/bildo')
        .set('x-access-token', token)
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/uzantoj/admin/' + uzantoId + '/bildo')
        .set('x-access-token', token)
        .expect(200)
        .expect((res) => {
          res.text.should.to.be.a('string');
          res.text.substring(0,15).should.to.have.string('data:image/png');
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

    it('should NOT POST a bildo - sen ĵetono', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzantoId = res.body.id;
      return request
        .post('/uzantoj/admin/' + uzantoId + '/bildo')
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe('POST /uzantoj/:id/bildo', () => {
    it('should POST a bildo', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .post('/uzantoj/' + uzanto["id"] + '/bildo')
        .set('x-access-token', getToken(uzanto))
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/uzantoj/' + uzanto["id"] + '/bildo')
        .set('x-access-token', getToken(uzanto))
        .expect(200)
        .expect((res) => {
          res.text.should.to.be.a('string');
          res.text.substring(0,15).should.to.have.string('data:image/png');
        })
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })

    it('should NOT POST a bildo - sen ĵetono', (done) => {
      var uzantoId;
      request
        .post('/uzantoj')
        .send(uzanto)
        .expect(201)
      .then((res) => {
      uzanto["id"] = res.body.id;
      return request
        .post('/uzantoj/' + uzanto["id"] + '/bildo')
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(400)
      })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

  describe('GET /uzantoj', (done) => {
    it('it should get ALL uzantoj', (done) => {
      request
        .get('/uzantoj')
        .set('x-access-token', token)
        .send({kampo: "id", valoro: 1})
        .expect(200)
        .expect((res) => {
          res.body.should.be.a('array');
        })
      .then((sucess) => {done()}, (error) => {done(error)});
    })
  })

});
