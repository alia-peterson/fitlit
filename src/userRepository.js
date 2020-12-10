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

  populateUserData(type, dataList) {
    this.users.forEach(user => {
      user[type] = dataList.filter(entry => {
        return entry.userID === user.id
      })
    })
  }
}




if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
