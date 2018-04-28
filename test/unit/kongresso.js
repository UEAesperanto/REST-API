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
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('GET /kongresoj/:id/kromaj', () => {
    it('it should GET all the kromaj kongresoj',(done) => {
      request
        .get('/kongresoj/1/kromaj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('GET /kongresoj/:id/aligxkotizoj', () => {
    it('it should GET all the aligxkotizoj to kongresoj',(done) => {
      request
        .get('/kongresoj/1/aligxkotizoj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('GET /kongresoj/:id/programeroj', () => {
    it('it should GET all the programeroj to kongresoj',(done) => {
      request
        .get('/kongresoj/1/programeroj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

  describe('GET /kongresoj/programkategorioj', () => {
    it('it should GET all the programkategorioj to kongresoj',(done) => {
      request
        .get('/kongresoj/programkategorioj')
        .end((err,res) => {
          res.status.should.be.equal(200);
          done();
        });
    });
  });

});
