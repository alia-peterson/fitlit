const chai = require('chai')
const expect = chai.expect

const Hydration = require("../src/hydration")
const hydrationData = {
  "userID": 1,
  "date": "2019/06/15",
  "numOunces": 37
}

describe('Hydration', () => {
  let hydration

  beforeEach( () => {
    hydration = new Hydration(hydrationData)
  })

  it('should be a function', () => {
    expect(Hydration).to.be.a('function')
  })

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceof(Hydration)
  })

})
