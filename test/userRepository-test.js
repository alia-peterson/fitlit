const chai = require('chai')
const expect = chai.expect

const UserTestData = require('../test/users-test-data')
const User = require('../src/user')
const UserRepository = require('../src/userRepository')
const Hydration = require('../data/hydration-data')

describe('User Repository', () => {
  let userRepository, userData1, userData2, userData3, user1, user2, user3, sleepData

  beforeEach( () => {
    userData1 = UserTestData.userData[0]
    userData2 = UserTestData.userData[1]
    userData3 = UserTestData.userData[2]
    user1 = new User(userData1)
    user2 = new User(userData2)
    user3 = new User(userData3)
    userRepository = new UserRepository([user1, user2, user3])

    sleepData = [{
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 2,
        "date": "2019/07/15",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }]
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

  it('should populate the hydration array', () => {
    let hydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    }]
    userRepository.populateUserData('hydrationEntry', hydrationData)
    expect(user1.hydrationEntry[0].numOunces).to.equal(37)
  })

  it('should return the average quality of sleep for all users with sleep information', () => {
    userRepository.populateUserData('sleepEntry', sleepData)
    const qualitySleepers = userRepository.calculateAverageSleepQuality()
    expect(qualitySleepers).to.deep.equal([user1, user2, user3])
  })

  it('should return user who slept the most for a given date', () => {
    userRepository.populateUserData('sleepEntry', sleepData)
    const best = userRepository.returnBestSleepers("2019/06/15", sleepData)

    expect(best).to.deep.equal([user3])
  })
})
