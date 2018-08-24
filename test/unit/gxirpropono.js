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

    beforeEach(function(done){
      cleanTable('gxirpropono');
      tokenAdmin = generateToken([4]);
      done();
    });

    it('it should POST Gxirproponojn', function(done){
      request
          .post('/gxirpropono')
          .send(gxirpropono)
          .end((err, res) => {
            res.status.should.be.equal(201);
            request
            .get('/gxirpropono')
            .set('x-access-token', tokenAdmin)
            .end((err, res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(1);
              console.log(res.body[0]);
              done();
           });
         });
     });

     it('it should update gxirpropono', function(done){
      request
        .post('/gxirpropono')
        .send(gxirpropono)
        .end((err, res) => {
        request
          .put('/gxirpropono/' + res.body.insertId)
          .set('x-access-token', tokenAdmin)
          .send({kampo: 'valuto', valoro: 'gbp'})
          .end((err, res) => {
            res.status.should.be.equal(200);
            res.clientError.should.be.equal(false);
            res.serverError.should.be.equal(false);
            res.body.message.should.be.equal("Ĝisdatigo sukcese farita");
            done();
          });
        });
     });

      it('it should GET TABLEn - sen Gxirproponoj', function(done){
        request
            .get('/gxirpropono')
            .set('x-access-token', tokenAdmin)
            .end((err, res) => {
              res.status.should.be.equal(200);
              res.body.length.should.equals(0);
              done();
           });
       });
});
