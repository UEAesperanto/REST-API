describe('==== Gxirproponoj ====', () => {
    var token = '';
    var gxirpropono = {
      valuto : "eur",
      radikoEo : "radiko",
      finajxoEo: "finajxo",
      landkodo : "l1"
    };
  

    beforeEach(function(done){
      var query = util.format('DELETE FROM `gxirpropono`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [4]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST Gxirproponojn', function(done){
      chai.request(server)
          .post('/Gxirproponoj')
          .set('x-access-token', token)
          .send(gxirpropono)
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST TABLEn - sen permeso', function(done){
       chai.request(server)
           .post('/Gxirproponoj')
           .send(gxirpropono)
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET TABLEn - sen Gxirproponoj', function(done){
        chai.request(server)
            .get('/Gxirproponoj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET TABLEn - kun Gxirproponoj', function(done){
         var query = util.format(INSERT_SQL);
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/Gxirproponoj/1')
             .end((err, res) => {
               res.should.have.status(200);
               done();
             });
           });
      });

      it('it should DELETE TABLEn', function(done) {
        var query = util.format(INSERT_SQL);
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/Gxirproponoj/1')
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(204);
              done();
            });
        });
      });

      it('it should NOT DELETE TABLEn - sen permeso', function(done) {
        var query = util.format(INSERT_SQL);
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/Gxirproponoj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
