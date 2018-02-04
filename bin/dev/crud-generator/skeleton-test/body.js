chai.use(chaiHttp);

describe('TABLEj', function() {
    var token = '';

    beforeEach(function(done){
      var query = util.format('DELETE FROM `TABLE`;');
      db.mysqlExec(query);

      var administranto = {
        id: 1,
        uzantnomo: 'nomo',
        permesoj: [1]
      };
      token = jwt.sign(administranto, config.sekretoJWT, {expiresIn: 18000});
      done();
    });

    it('it should POST TABLEn', function(done){
      chai.request(server)
          .post('/TABLEj')
          .set('x-access-token', token)
          .send(OBJECT_JSON)
          .end((err, res) => {
            res.should.have.status(201);
            done();
         });
     });

     it('it should NOT POST TABLEn - sen permeso', function(done){
       chai.request(server)
           .post('/TABLEj')
           .send(OBJECT_JSON)
           .end((err, res) => {
             res.should.have.status(400);
             done();
          });
      });

      it('it should GET TABLEn - sen TABLEj', function(done){
        chai.request(server)
            .get('/TABLEj')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equals(0)
              done();
           });
       });

       it('it should GET TABLEn - kun TABLEj', function(done){
         var query = util.format(INSERT_SQL);
          db.mysqlExec(query).then(function(result){
             chai.request(server)
             .get('/TABLEj/1')
             .end((err, res) => {
               res.should.have.status(200);
               RES_BODY
               done();
             });
           });
      });

      it('it should DELETE TABLEn', function(done) {
        var query = util.format(INSERT_SQL);
         db.mysqlExec(query).then(function(result){
            chai.request(server)
            .delete('/TABLEj/1')
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
            .delete('/TABLEj/1')
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
          });
      });
});
