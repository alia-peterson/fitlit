const chai = require('chai')
const expect = chai.expect

const User = require('../src/user')
const UserRepository = require('../src/userRepository')

describe('User Repository', () => {
  let userRepository

  beforeEach( () => {
    userRepository = new UserRepository()
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function')
  })

  it('should be an instance of User', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository)
  })

})
