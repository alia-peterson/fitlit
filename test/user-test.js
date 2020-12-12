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

    user1.hydrationEntry = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 2,
      "date": "2019/05/15",
      "numOunces": 75
    }]

    user1.sleepEntry = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/07/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    }]

    user1.activityEntry = [
    {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numSteps": 17402,
      "minutesActive": 116,
      "flightsOfStairs": 33
    }]
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

  it('should calculate average daily fluid ounces for all time',() => {
    const average = user1.calculateLifetimeAverage('hydrationEntry', 'numOunces')
    expect(average).to.equal(56)
  })

  it('should return ounces based on a chosen date', () => {
    const ounces = user1.returnDailyValue('hydrationEntry', 'numOunces', '2019/06/15')
    expect(ounces).to.equal(37)
  })

  it('should return daily ounces consumed between two dates', () => {
    const ounces = user1.returnWeeklyValue('hydrationEntry', 'numOunces', '2019/06/15', '2019/05/15')
    expect(ounces).to.deep.equal([37, 75])
  })

  it('should calculate average hours of sleep for all time', () => {
    const average = user1.calculateLifetimeAverage('sleepEntry', 'hoursSlept')
    expect(average).to.equal(6.55)
  })

  it('should calculate average sleep quality for all time', () => {
    const average = user1.calculateLifetimeAverage('sleepEntry', 'sleepQuality')
    expect(average).to.equal(3.45)
  })

  it('should return hours slept based on a chosen date', () => {
    const hours = user1.returnDailyValue('sleepEntry', 'hoursSlept', '2019/06/15')
    expect(hours).to.equal(6.1)
  })

  it('should return sleep quality based on a chosen date', () => {
    const quality = user1.returnDailyValue('sleepEntry', 'sleepQuality', '2019/06/15')
    expect(quality).to.equal(2.2)
  })

  it('should return daily hours slept between two dates', () => {
    const hours = user1.returnWeeklyValue('sleepEntry', 'hoursSlept', '2019/06/15', '2019/07/15')
    expect(hours).to.deep.equal([6.1, 7])
  })

  it('should return daily sleep quality between two dates', () => {
    const quality = user1.returnWeeklyValue('sleepEntry', 'sleepQuality', '2019/06/15', '2019/07/15')
    expect(quality).to.deep.equal([2.2, 4.7])
  })

  it('should return number of miles walked', () => {
    const miles = user1.returnMilesWalked('activityEntry', 'numSteps', '2019/06/15')
    expect(miles).to.equal('2.91')
  })

  it('should return the numbers active for a specified date', () => {
    const minutes = user1.returnDailyValue('activityEntry', 'minutesActive', '2019/06/15')
    expect(minutes).to.equal(140)
  })

  it('should calculate average minutes active between two dates', () => {
    const avgMinutes = user1.calculateAverageBetweenDates('activityEntry', 'minutesActive', '2019/06/15', '2019/06/17')
    expect(avgMinutes.toFixed(1)).to.equal('131.3')
  })

  it('should return whether the user achieved their step goal for a given date', () => {
    const achieve = user1.returnAchievedStepGoal('2019/06/15')
    expect(achieve).to.equal(false)
  })

  it('should return all dates where step goal was exceeded', () => {
    const days = user1.returnDaysExceededStepGoal()
    expect(days).to.deep.equal(['2019/06/17'])
  })
})
