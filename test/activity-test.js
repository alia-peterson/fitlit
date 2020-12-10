const chai = require('chai')
const expect = chai.expect

const Activity = require('../src/activity')
const activityData = {
  "userID": 1,
  "date": "2019/06/15",
  "numSteps": 3577,
  "minutesActive": 140,
  "flightsOfStairs": 16
}

describe('Activity', () => {
  let activity

  beforeEach( () => {
    activity = new Activity(activityData)
  })

  it('should be a function', () => {
    expect(Activity).to.be.a('function')
  })

  it('should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceof(Activity)
  })


})
