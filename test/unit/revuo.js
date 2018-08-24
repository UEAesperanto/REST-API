describe('==== REVUO ====', () => {
  var revuoModel1 = {
    "titolo":"Revuo Esperanto",
    fondjaro:1920,
    issn:"333"
  };

  var revuoModel2 = {
    "titolo":"Revuo Esperanto 2",
    fondjaro:1921,
    issn:"444"
  };

  var volumoModel1 = {
    numeroJaro: 1,
    numeroEntute: 2,
    enhavlisto: "enhavo"
  }

  var volumoModel2 = {
    numeroJaro: 2,
    numeroEntute: 3,
    enhavlisto: "enhavo2"
  }


  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('revuo');
      cleanTable('volumo');
      cleanTable('ref_administranto_adminrajto')
      token = generateToken();
      done();
  });

  describe('POST /revuoj', () => {
    it('it should POST revuon',(done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST revuon - sen permeso',(done) => {
      request
        .post('/revuoj')
        .send(revuoModel1)
        .expect(400)
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /revuoj', () => {
    it('it should GET revuon - sen revuoj', (done) => {
      request
        .get('/revuoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should GET revuon - kun revuoj', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
        .then((res) => {
      return request
        .get('/revuoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
          res.body[0].should.have.property('titolo');
          res.body[0].should.have.property('fondjaro');
          res.body[0].should.have.property('issn');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /revuoj/:id', () => {
    it('it should DELETE revuon', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/revuoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(204)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT DELETE revuon - sen permeso', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/revuoj/' + res.body.insertId)
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });


  describe('POST /revuoj/:id/volumoj', () => {
    it('it should POST volumon', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /revuoj/volumoj/:id/bildo', () => {
    it('it should NOT POST volumon files - sen ĵetono', (done) => {
      var volumeId;
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      volumeId = res.body.insertId;
      return request
        .post('/revuoj/volumoj/' + volumeId +'/bildo')
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST volumon files - bildo', (done) => {
      var volumeId;
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      volumeId = res.body.insertId;
      return request
        .post('/revuoj/volumoj/' + volumeId +'/bildo')
        .set('x-access-token', token)
        .attach("file", readFileSync(bildoPath1), "file.test")
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/revuoj/volumoj/' + volumeId +'/bildo')
        .set('x-access-token', token)
        .expect(200)
        .expect((res) =>{
          res.text.should.to.be.a('string');
          res.text.substring(0,15).should.to.have.string('data:image/png');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });

  describe('POST /revuoj/volumoj/:id/kvalita', () => {
    it('it should NOT POST volumon files - sen ĵetono', (done) => {
      var volumeId;
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      volumeId = res.body.insertId;
      return request
        .post('/revuoj/volumoj/' + volumeId +'/kvalita')
        .attach("file", readFileSync(pdfPath1), "file.test")
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should POST volumon files - PDF', (done) => {
      var volumeId;
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      volumeId = res.body.insertId;
      return request
        .post('/revuoj/volumoj/' + volumeId +'/kvalita')
        .set('x-access-token', token)
        .attach("file", readFileSync(pdfPath1), "file.test")
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/revuoj/volumoj/' + volumeId +'/kvalita')
        .set('x-access-token', token)
        .expect(200)
        .expect((res) =>{
          res.text.should.to.be.a('string');
          res.text.substring(0,20).should.to.have.string('data:application/pdf');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

  });


  describe('PUT /revuoj/volumoj/:id', () => {
    it('it should UPDATE a volumo', (done) => {
      var volumeId;
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      volumeId = res.body.insertId;
      return request
        .put('/revuoj/volumoj/' + volumeId)
        .send({kampo: 'enhavlisto', valoro: 'new valuto'})
        .set('x-access-token', token)
        .expect(200)
        .expect((res) =>{
          res.body.message.should.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });

    it('it should NOT UPDATE a volumo - ID', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .put('/revuoj/volumoj/' + res.body.insertId)
        .send({kampo: 'id', valoro: 2})
        .set('x-access-token', token)
        .expect(403)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });


    it('it should NOT UPDATE a volumo - Sen ĵetono', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .put('/revuoj/volumoj/' + res.body.insertId)
        .send({kampo: 'id', valoro: 2})
        .expect(400)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /revuoj/volumoj', () => {
    it('it should GET all volumoj', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel2)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/revuoj/' + res.body.insertId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/revuoj/volumoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.be.equal(2);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })

  describe('GET /revuoj/:id/volumoj', () => {
    var revuoId;
    it('it should GET all volumoj given revuo ID', (done) => {
      request
        .post('/revuoj')
        .set('x-access-token', token)
        .send(revuoModel1)
        .expect(201)
      .then((res) => {
      revuoId = res.body.insertId;
      return request
        .post('/revuoj/' + revuoId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/revuoj/' + revuoId + '/volumoj')
        .set('x-access-token', token)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/revuoj/'+ revuoId + '/volumoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.be.equal(2);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })
  })
});
