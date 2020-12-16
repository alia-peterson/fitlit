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

  returnAverageActivityData(day, activityType, inputData = activityData) {
    const entriesByDate = inputData.filter(entry => entry.date === day)
    const entriesByActivity = entriesByDate.map(entry => entry[activityType])

    const average = entriesByActivity.reduce((value, entry, index, array) => {
      return value += entry / array.length
    }, 0)

    return average.toFixed(0)
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
    friends.forEach(friend => {
      friendNames.push(this.users[friend - 1].name)
    })

    const friendsWithSteps = []
    friendNames.forEach((friend, index) => {
      const friendObject = {}
      friendObject.name = friend
      friendObject.steps = friendSteps[index]
      friendsWithSteps.push(friendObject)
    })
    friendsWithSteps.sort((a,b) => {
      return b.steps - a.steps
    })
    return friendsWithSteps
  }

  returnReducedFriendValues(friendID, dataType = activityData) {
    const friendActivityData = dataType.filter(entry => {
      return entry.userID === friendID
    })

    const endEntry = friendActivityData.length
    let startEntry = endEntry - 7

    if (endEntry < 7) {
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
  module.exports = UserRepository;
}
