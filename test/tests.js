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
  describe('generateToken', function () {
    it('Is a function', function () {
      expect(generateToken).to.be.a('function')
    })
  })
