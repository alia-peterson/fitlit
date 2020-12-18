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

  // entryType = 'activityEntry' or 'sleepEntry' or 'hydrationEntry'
  // dataList = activityData, sleepData, or hydrationData
  populateUserData(entryType, dataList) {
    this.users.forEach(user => {
      user[entryType] = dataList.filter(entry => {
        return entry.userID === user.id
      })
    })
  }

  returnBestSleepers(inputDate, inputData = sleepData) {
    const sleepDataForDate = inputData.filter(entry => entry.date === inputDate)

    const sortedSleepData = sleepDataForDate.sort((a, b) => {
      return b.hoursSlept - a.hoursSlept
    })

    const highestSleepEntries = sortedSleepData.filter(entry => {
      return entry.hoursSlept === sortedSleepData[0].hoursSlept
    })

    const bestSleepers = []

    for (var i = 0; i < highestSleepEntries.length; i++) {
      bestSleepers.push(this.users[highestSleepEntries[i].userID - 1])
    }

    return bestSleepers
  }

  returnAverageActivityData(activityType, units = '', inputDate = '2019/09/22', inputData = activityData) {
    const entriesByDate = inputData.filter(entry => entry.date === inputDate)

    const entriesByActivity = entriesByDate.map(entry => entry[activityType])

    const average = entriesByActivity.reduce((value, entry, index, array) => {
      return value += entry / array.length
    }, 0)

    return `${average.toFixed(0)}${units}`
  }

  returnWeekStepCount() {
    const friends = this.currentUser.friends

    const friendStepValues = friends.map(friend => {
      return friend.returnReducedFriendValues
    })

    const friendSteps = []
    friends.forEach(friend => {
      friendSteps.push(this.returnReducedFriendValues(friend))
    })

    const friendNames = []
    friends.forEach(friendID => {
      friendNames.push(this.users[friendID - 1].name)
    })

    const friendsWithSteps = []
    friendNames.forEach((friendName, index) => {
      const friendObject = {}
      friendObject.name = friendName
      friendObject.steps = friendSteps[index]
      friendsWithSteps.push(friendObject)
    })

    return friendsWithSteps
  }

  returnReducedFriendValues(friendID, dataType = activityData) {
    const friendActivityData = dataType.filter(entry => {
      return entry.userID === friendID
    })

    const endEntry = friendActivityData.length
    let startEntry = endEntry - 7

    if (startEntry < 0) {
      startEntry = 0
    }

    const weeklyActivityData = friendActivityData.slice(startEntry, endEntry)

    const weeklySteps = weeklyActivityData.map(entry => entry.numSteps)

    const totalSteps = weeklySteps.reduce((acc, curr) => {
      return acc + curr
    }, 0)

    return totalSteps
  }
}




if (typeof module !== 'undefined') {
  module.exports = UserRepository
}
