class User {
  constructor(userData) {
  	this.id = userData.id
  	this.name = userData.name
    this.address = userData.address
    this.email = userData.email
    this.strideLength = userData.strideLength
    this.dailyStepGoal = userData.dailyStepGoal
    this.friends = userData.friends
  }

  returnFirstName() {
    const fullName = this.name.split(' ')
  	return fullName[0]
  }

  // entryType = 'activityEntry' or 'sleepEntry' or 'hydrationEntry'
  // entryProperty = 'numSteps' or 'numOunces' or 'flightsOfStairs' etc
  calculateLifetimeAverage(entryType, entryProperty) {
    return this[entryType].reduce((value, day) => {
      return value += day[entryProperty] / this[entryType].length
    }, 0)
  }

  calculateAverageBetweenDates(entryType, entryProperty, startDate = "2019/09/15", endDate = "2019/09/22") {
    const reducedEntries = this.returnReducedEntries(entryType, startDate, endDate)

    return reducedEntries.reduce((value, day) => {
      return value += day[entryProperty] / reducedEntries.length
    }, 0)
  }

  returnDailyValue(entryType, entryProperty, date = '2019/09/22') {
    return this[entryType].find(day => day.date === date)[entryProperty]
  }

  returnWeeklyValue(entryType, entryProperty, startDate = "2019/09/15", endDate = "2019/09/22") {
    const reducedEntries = this.returnReducedEntries(entryType, startDate, endDate)
    return reducedEntries.map(entry => entry[entryProperty])
  }

  returnMilesWalked(entryType, entryProperty, date = "2019/09/22") {
    const numberSteps = this.returnDailyValue(entryType, entryProperty, date)
    return (numberSteps * this.strideLength / 5280).toFixed(2)
  }

  returnReducedEntries(entryType, startDate, endDate) {
    const startEntry = this[entryType].find(entry => entry.date === startDate)
    const startIndex = this[entryType].indexOf(startEntry) + 1

    const endEntry = this[entryType].find(entry => entry.date === endDate)
    const endIndex = this[entryType].indexOf(endEntry) + 1

    const reducedEntries = this[entryType].slice(startIndex, endIndex)
    return reducedEntries
  }

  returnAchievedStepGoal(inputDate) {
    const dateOfActivity = this.activityEntry.find(entry => entry.date === inputDate)

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

  returnCumulativeStepCount() {
    const weeklySteps = this.returnWeeklyValue('activityEntry', 'numSteps')

    const cumulativeSteps = weeklySteps.reduce((acc, curr) => {
      return acc + curr
    })

    return cumulativeSteps
  }
}




if (typeof module !== 'undefined') {
  module.exports = User
}
