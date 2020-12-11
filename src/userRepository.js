class UserRepository {
  constructor(data = []) {
    this.users = data
    this.currentUser = ''
  }

  returnUserData(userID) {
    const userData = this.users.find(user => user.id === userID)
    return userData
  }

  calculateAverageStepGoal() {
    return this.users.reduce((steps, user) => {
      return steps += user.dailyStepGoal / this.users.length
    }, 0)
  }

  calculateAverageSleepQuality() {
    const sleepyUsers = this.users.filter(user => user.sleepEntry.length > 0)

    const qualityAboveThree = []

    sleepyUsers.forEach(user => {
      const totalQuality = user.sleepEntry.map(entry => entry.sleepQuality)
      const averageQuality = totalQuality / user.sleepEntry.length

      if (averageQuality >= 3) {
        qualityAboveThree.push(user)
      }
    })

    return qualityAboveThree
  }

  populateUserData(type, dataList) {
    this.users.forEach(user => {
      user[type] = dataList.filter(entry => {
        return entry.userID === user.id
      })
    })
  }

  returnBestSleepers(inputDate, inputData = sleepData) {
    // finds entries from sleepData that have the same date as our input
    const sleepDataForDate = inputData.filter(entry => entry.date === inputDate)

    // moves the entry with the highest sleep value to index 0
    const sortedSleepData = sleepDataForDate.sort((a, b) => {
      return b.hoursSlept - a.hoursSlept
    })

    // return the sleep entries that have an hoursSlept equal to
    // the highest sleep value in our sorted array
    const highestSleepEntries = sortedSleepData.filter(entry => {
      return entry.hoursSlept === sortedSleepData[0].hoursSlept
    })

    const bestSleepers = []

    // iterating through our array of highestSleepEntries
    // finding the users in our this.users array with the relevant IDs
    for (var i = 0; i < highestSleepEntries.length; i++) {
      bestSleepers.push(this.users[highestSleepEntries[i].userID - 1])
    }

    return bestSleepers
  }
}




if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
