const expect = chai.expect

  describe('translateAccents', function () {
    it('should be an object', function () {
      expect(translateAccents).to.be.a('object')
    })
  })
  describe('translateLanguages', function () {
    it('should be an object', function () {
      expect(translateLanguages).to.be.a('object')
    })
  })
  describe('function generateToken', function () {
    it('to return localStorage token', function () {
      expect(generateToken).to.be.a('function')
    })
  })
