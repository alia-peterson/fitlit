class Sleep {
  constructor(sleepEntry) {
    this.userID = sleepEntry.userID
    this.date = sleepEntry.date
    this.hoursSlept = sleepEntry.hoursSlept
    this.sleepQuality = sleepEntry.sleepQuality
  }
}




if (typeof module !== 'undefined') {
  module.exports = Sleep
}
