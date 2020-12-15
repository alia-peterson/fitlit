class User {
  constructor(userData) {
  	this.id = userData.id
  	this.name = userData.name
    this.address = userData.address
    this.email = userData.email
    this.strideLength = userData.strideLength
    this.dailyStepGoal = userData.dailyStepGoal
    this.friends = userData.friends
    // this.activityEntry = []
    // this.sleepEntry = []
    // this.hydrationEntry = []
  }

  returnFirstName() {
    const fullName = this.name.split(' ')
  	return fullName[0]
  }

  calculateLifetimeAverage(type, property) {
    return this[type].reduce((value, day) => {
      return value += day[property] / this[type].length
    }, 0)
  }

  calculateAverageBetweenDates(type, property, startDate, endDate) {
    const reducedEntries = this.returnReducedEntries(type, startDate, endDate)
    return reducedEntries.reduce((value, day) => {
      return value += day[property] / reducedEntries.length
    }, 0)
  }

  returnDailyValue(type, property, date) {
    return this[type].find(day => day.date === date)[property]
  }

  returnWeeklyValue(type, property, startDate = "2019/09/15", endDate = "2019/09/22") {
    const reducedEntries = this.returnReducedEntries(type, startDate, endDate)
    return reducedEntries.map(entry => entry[property])
  }

  returnMilesWalked(type, property, date = "2019/09/22") {
    const numberSteps = this.returnDailyValue(type, property, date)
    return (numberSteps * this.strideLength / 5280).toFixed(2)
  }

  returnReducedEntries(type, startDate, endDate) {
    const startEntry = this[type].find(entry => entry.date === startDate)
    const startIndex = this[type].indexOf(startEntry) + 1

    const endEntry = this[type].find(entry => entry.date === endDate)
    const endIndex = this[type].indexOf(endEntry) + 1

    const reducedEntries = this[type].slice(startIndex, endIndex)
    return reducedEntries
  }

  returnAchievedStepGoal(day) {
    const dateOfActivity = this.activityEntry.find(entry => entry.date === day)

    if (dateOfActivity.numSteps >= this.dailyStepGoal) {
      return true
    }
    return false
  }

  returnDaysExceededStepGoal() {
    const daysExceedingStepGoal = this.activityEntry.filter(entry => {
      return entry.numSteps >= this.dailyStepGoal
    })

    return daysExceedingStepGoal.map(entry => entry.date)
  }

  returnStairClimbingRecord() {
    const activities = this.activityEntry

    activities.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs
    })

    return activities[0].flightsOfStairs
  }

}




if (typeof module !== 'undefined') {
  module.exports = User
}
