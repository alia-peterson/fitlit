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
    return this.hydrationEntry.reduce((ounces,day) => {
      return ounces += day.numOunces / this.hydrationEntry.length
    }, 0)
  }

}

if (typeof module !== 'undefined') {
  module.exports = User
}
