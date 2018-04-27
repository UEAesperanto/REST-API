describe('==== URBO ====', () => {


  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('urbo');
      token = generateToken();
      done();
  });

  describe('GET /urboj', () => {
    it('it should GET all the urboj', (done) => {
      request
        .get('/urboj')
        .end((err, res) => {
          res.status.should.be.equal(200);
          done();
        });
      });
    });

});
