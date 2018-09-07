describe('==== KONGRESO ====', () => {

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('kongreso');
      token = generateToken();
      done();
  });

  describe('GET /kongresoj', () => {
    it('GET /kongresoj sen kongresoj en la sistemo',(done) => {
      request
        .get('/kongresoj')
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /kongresoj/:id/kromaj', () => {
    it('it should GET all the kromaj kongresoj',(done) => {
      request
        .get('/kongresoj/1/kromaj')
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /kongresoj/:id/aligxkotizoj', () => {
    it('it should GET all the aligxkotizoj to kongresoj',(done) => {
      request
        .get('/kongresoj/1/aligxkotizoj')
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /kongresoj/:id/programeroj', () => {
    it('it should GET all the programeroj to kongresoj',(done) => {
      request
        .get('/kongresoj/1/programeroj')
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

  describe('GET /kongresoj/programkategorioj', () => {
    it('it should GET all the programkategorioj to kongresoj',(done) => {
      request
        .get('/kongresoj/programkategorioj')
        .expect(200)
      .then((sucess) => {done()}, (error) => {done(error)});
    });
  });

});
