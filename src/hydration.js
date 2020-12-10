class Hydration {
  constructor(hydrationEntry) {
    this.userID = hydrationEntry.userID
    this.date = hydrationEntry.date
    this.numOunces = hydrationEntry.numOunces
  }
}







if (typeof module !== 'undefined') {
  module.exports = Hydration
}
