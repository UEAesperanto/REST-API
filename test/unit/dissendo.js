describe('==== DISSENDO ====', () => {
  var token = ''
  var retlistoModel1 = { nomo: 'nomo', priskribo: 'priskribo'};
  var dissendoModel1 = { dissendanto: 1, dato: '1996-05-05', temo:'temo', teksto:'teksto'};
  var abonantoModel1 = { ekde: '1996-05-05', formato_html:true, kodigxo_utf8:true, retadreso:'email@email.com'};

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('dissendo');
      cleanTable('retlisto');
      token = generateToken();
      done();
  });

  describe('GET /dissendoj/retlistoj', () => {
    it('it should GET empty retlistoj',(done) => {
      request
        .get('/dissendoj/retlistoj')
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /dissendoj', () => {
    it('it should GET all the asocioj',(done) => {
      request
        .get('/dissendoj')
        .set('x-access-token', token)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(0);
        })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /dissendoj/retlistoj', () =>{
    it('it should POST a retlisto - with token', (done) => {
      request
        .post('/dissendoj/retlistoj')
        .set('x-access-token', token)
        .send(retlistoModel1)
        .expect(201)
      .then((success) => {done()}, (error) => {done(error)});
      });
   });

  describe('POST /dissendoj', () => {
    it('it should POST a dissendo - with token', (done) => {
      request
        .post('/dissendoj/retlistoj')
        .set('x-access-token', token)
        .send(retlistoModel1)
        .expect(201)
      .then((res) => {
      dissendoModel1["idRetlisto"] = res.body.insertId;
      return request
        .post('/dissendoj')
        .set('x-access-token', token)
        .send(dissendoModel1)
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('POST /dissendoj/retlistoj/:id/abonantoj', () => {
    it('it should POST a dissendo 2- with token',(done) => {
      request
        .post('/dissendoj/retlistoj')
        .set('x-access-token', token)
        .send(retlistoModel1)
        .expect(201)
      .then((res) => {
      return request
        .post('/dissendoj/retlistoj/' + res.body.insertId + '/abonantoj')
        .set('x-access-token', token)
        .send(abonantoModel1)
        .expect(201)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /dissendoj/:id', () => {
    it('it should POST a dissendo - with token', (done) => {
      request
        .post('/dissendoj/retlistoj')
        .set('x-access-token', token)
        .send(retlistoModel1)
        .expect(201)
      .then((res) => {
      dissendoModel1["idRetlisto"] = res.body.insertId;
      return request
        .post('/dissendoj')
        .set('x-access-token', token)
        .send(dissendoModel1)
        .expect(201)
      })
      .then((res) => {
      return request
        .get('/dissendoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(200)
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

  describe('DELETE /dissendoj/retlistoj', () => {
    it('it should DELETE a retlisto - with token', (done) => {
      request
        .post('/dissendoj/retlistoj')
        .set('x-access-token', token)
        .send(retlistoModel1)
        .expect(201)
      .then((res) => {
      return request
        .delete('/dissendoj/retlistoj/' + res.body.insertId)
        .set('x-access-token', token)
        .expect(200)
        .expect((res) => {
          res.body.message.should.equal("Ok");
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
