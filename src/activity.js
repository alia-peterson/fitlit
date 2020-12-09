class Activity {
  constructor(activityEntry) {
    this.userID = activityEntry.userID
    this.date = activityEntry.date
    this.numSteps = activityEntry.numSteps
    this.minutesActive = activityEntry.minutesActive
    this.flightsOfStairs = activityEntry.flightsOfStairs

  }
}




if (typeof module !== 'undefined') {
  module.exports = Activity
}
