describe('==== ADMIN ====', () => {

  var token = ''
  var uzantoModel1 = {
    "uzantnomo":"unuauzanto",
    "pasvorto": "iupasvort"
  };

  var uzantoModel2   = {
    "uzantnomo":"duauzanto",
    "pasvorto": "iupasvort"
  };

  var rajtojModel1 = {
    "idRajto": 1
  };

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('administranto');
      cleanTable('ref_administranto_adminrajto')
      token = generateToken();
      done();
  });


  describe('GET /admin/agordita', () => {
    it('sen administrantoj en la sistemo',(done) => {
      request
        .get('/admin/agordita')
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('agordita', false);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });


  describe('GET /admin/agordita', () => {
    it('kun administrantoj en la sistemo', (done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .get('/admin/agordita')
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('agordita', true);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /admin/ensaluti', () => {
    it('ĝuste ensaluti', (done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('token')
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('ensaluti kun malĝusta pasvorto', (done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      var uzanto = uzantoModel1;
      uzanto["pasvorto"] = "malĝusta"
      return request
        .post('/admin/ensaluti')
        .send(uzanto)
        .expect(401)
        .expect((res) => {
          res.body.should.have.property('message', 'Malĝusta pasvorto');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    })

    it('ensaluti kun malĝusta uzantnomo', (done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      var uzanto = uzantoModel1;
      uzanto["uzantnomo"] = "malĝusta"
      return request
        .post('/admin/ensaluti')
        .send(uzanto)
        .expect(401)
        .expect((res) => {
            res.body.should.have.property('message', 'La uzantnomo ne ekzistas');
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /admin', () => {
    it('it should post an admin', (done) => {
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('token');
        })
      })
      .then((res) => {
      return request
        .post('/admin')
        .set('x-access-token', res.body.token)
        .send(uzantoModel2)
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /admin', () => {
    it('it should delete an admin', (done) => {
      var adminToken;
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('token');
        })
      })
      .then((res) => {
      adminToken = res.body.token;
      return request
        .post('/admin')
        .set('x-access-token', adminToken)
        .send(uzantoModel2)
        .expect(201)
      })
      .then((res) => {
      idDelete = res.body.insertId;
      return request
        .get('/admin/' + idDelete )
        .set('x-access-token', adminToken)
        .expect(200)
        .expect((res) => {
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('uzantnomo');
          res.body[0].should.have.property('pasvortoHash');
          res.body[0].should.have.property('pasvortoSalt');
        })
      })
      .then((res) => {
      return request
        .delete('/admin/' + idDelete )
        .set('x-access-token', adminToken)
        .expect(204)
      })
      .then((res) => {
      return request
        .get('/admin/' + idDelete )
        .set('x-access-token', adminToken)
        .expect(404)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /admin/:id/rajtoj', () => {
    it('it post rajtoj to an admin', (done) => {
      var adminToken;
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('token');
        })
      })
      .then((res) => {
      adminToken = res.body.token;
      return request
        .post('/admin')
        .set('x-access-token', adminToken)
        .send(uzantoModel2)
        .expect(201)
      })
      .then((res) => {
      return request
        .post('/admin/' + res.body.insertId + '/rajtoj')
        .set('x-access-token', adminToken)
        .send(rajtojModel1)
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /admin/:id/rajtoj/:id', () => {
    it('it post rajtoj to an admin', (done) => {
      var adminToken;
      var adminId;
      request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(201)
        .expect((res) => {
          res.body.should.have.property('message');
        })
      .then((res) => {
      return request
        .post('/admin/ensaluti')
        .send(uzantoModel1)
        .expect(200)
        .expect((res) => {
          res.body.should.have.property('token');
        })
      })
      .then((res) => {
      adminToken = res.body.token;
      return request
        .post('/admin')
        .set('x-access-token', adminToken)
        .send(uzantoModel2)
        .expect(201)
      })
      .then((res) => {
      adminId = res.body.insertId;
      return request
        .post('/admin/' + adminId + '/rajtoj')
        .set('x-access-token', adminToken)
        .send(rajtojModel1)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/admin/' + adminId + '/rajtoj/')
        .set('x-access-token', adminToken)
        .expect(200)
        .expect((res) => {
          res.body.length.should.be.equal(1);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
