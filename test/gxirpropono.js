describe('==== Gxirproponoj ====', () => {
    var token = '';
    var gxirpropono = {
      idGxiranto : 1,
      kialo : "radiko",
      traktita: false,
      pagmaniero : "paypal",
      aligxo: true,
      valuto: "EUR",
      kvanto: 199
    };

    beforeEach((done) => {
      cleanTable('gxirpropono');
      tokenAdmin = generateToken([4]);
      done();
    });

    it('it should POST Gxirproponojn', (done) => {
      request
        .post('/gxirpropono')
        .send(gxirpropono)
        .expect(201)
      .then((res) => {
      return request
        .get('/gxirpropono')
        .set('x-access-token', tokenAdmin)
        .expect(200)
        .expect((res) => {
          res.body.length.should.equals(1);
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
     });

     it('it should update gxirpropono', (done) => {
      request
        .post('/gxirpropono')
        .send(gxirpropono)
      .then((res) => {
      return request
        .put('/gxirpropono/' + res.body.insertId)
        .set('x-access-token', tokenAdmin)
        .send({kampo: 'valuto', valoro: 'gbp'})
        .expect(200)
        .expect((res) => {
          res.clientError.should.be.equal(false);
          res.serverError.should.be.equal(false);
          res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
        })
      })
      .then((success) => {done()}, (error) => {done(error)});
     });

      it('it should GET TABLEn - sen Gxirproponoj', (done) => {
        request
          .get('/gxirpropono')
          .set('x-access-token', tokenAdmin)
          .expect(200)
          .expect((res) => {
            res.body.length.should.equals(0);
          })
        .then((success) => {done()}, (error) => {done(error)});
       });
});
