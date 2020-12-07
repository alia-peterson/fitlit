const chai = require('chai')
const expect = chai.expect

const UserTestData = require('../test/users-test-data')
const User = require('../src/user')

describe('User', () => {
  let userData1, userData2, userData3, user1, user2, user3

  beforeEach( () => {
    userData1 = UserTestData.userData[0]
    userData2 = UserTestData.userData[1]
    userData3 = UserTestData.userData[2]
    user1 = new User(userData1)
    user2 = new User(userData2)
    user3 = new User(userData3)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User)
  })

  it('should return user first name', () => {
    const firstName = user1.returnFirstName()
    expect(firstName).to.equal('Clark')
  })

})
