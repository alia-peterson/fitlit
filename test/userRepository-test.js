const chai = require('chai')
const expect = chai.expect

const UserTestData = require('../test/users-test-data')
const User = require('../src/user')
const UserRepository = require('../src/userRepository')

describe('User Repository', () => {
  let userRepository, userData1, userData2, userData3, user1, user2, user3

  beforeEach( () => {
    userData1 = UserTestData.userData[0]
    userData2 = UserTestData.userData[1]
    userData3 = UserTestData.userData[2]
    user1 = new User(userData1)
    user2 = new User(userData2)
    user3 = new User(userData3)
    userRepository = new UserRepository([user1, user2, user3])
  })

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function')
  })

  it('should be an instance of User Repository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository)
  })

  it('should store user data', () => {
    expect(userRepository.users[0]).to.deep.equal(userData1)
  })

  it('should return user data from user ID', () => {
    const userFromID = userRepository.returnUserData(1)
    expect(userFromID).to.deep.equal(userData1)
  })

  it('should calculate average step goal for all users', () => {
    const averageStepGoal = userRepository.calculateAverageStepGoal()
    expect(averageStepGoal.toFixed(1)).to.equal('6666.7')
  })

})
