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

  // returnUsersWhoSleepWell() {
  //   return
  // }
}




if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
