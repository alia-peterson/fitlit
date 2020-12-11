class User {
  constructor( userData ) {
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

  calculateLifetimeAverage(type, property) {
    return this[type].reduce((value, day) => {
      return value += day[property] / this[type].length
    }, 0)
  }

  returnDailyValue(type, property, date) {
    return this[type].find(day => day.date === date)[property]
  }

  returnWeeklyValue(type, property, startDate, endDate) {
    const startEntry = this[type].find(entry => entry.date === startDate)
    const startIndex = this[type].indexOf(startEntry)

    const endEntry = this[type].find(entry => entry.date === endDate)
    const endIndex = this[type].indexOf(endEntry)

    const reducedEntries = this[type].slice(startIndex, endIndex + 1)

    return reducedEntries.map(entry => entry[property])
  }

}

if (typeof module !== 'undefined') {
  module.exports = User
}
