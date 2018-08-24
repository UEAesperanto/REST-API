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
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

});
