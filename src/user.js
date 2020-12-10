class User {
  constructor( userData ) {
  	this.id = userData.id
  	this.name = userData.name
    this.address = userData.address
    this.email = userData.email
    this.strideLength = userData.strideLength
    this.dailyStepGoal = userData.dailyStepGoal
    this.friends = userData.friends
    this.hydrationEntry = []
  }

  returnFirstName() {
    const fullName = this.name.split(' ')
  	return fullName[0]
  }

  calculateAverageFluidOunces() {
    return this.hydrationEntry.reduce((ounces, day) => {
      return ounces += day.numOunces / this.hydrationEntry.length
    }, 0)
  }

  returnDayOunces(date) {
    return this.hydrationEntry.find(day => day.date === date).numOunces
  }

  returnWeeklyOunces(startDate, endDate) {
    const startEntry = this.hydrationEntry.find(entry => entry.date === startDate)
    const startIndex = this.hydrationEntry.indexOf(startEntry)

    const endEntry = this.hydrationEntry.find(entry => entry.date === endDate)
    const endIndex = this.hydrationEntry.indexOf(endEntry)

    const reducedEntries = this.hydrationEntry.slice(startIndex, endIndex + 1)

    return reducedEntries.reduce((ounces, entry) => {
      return ounces + entry.numOunces
    }, 0)
  }

}

if (typeof module !== 'undefined') {
  module.exports = User
}
