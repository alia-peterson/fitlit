let userRepository = new UserRepository()
const welcomeMessage = document.querySelector('.user--welcome')
const userName = document.querySelector('.user--name')
const userAddress = document.querySelector('.user--address')
const userEmail = document.querySelector('.user--email')
const userStrideLength = document.querySelector('.user--stride')
const userStepGoal = document.querySelector('.user--step')
const userDailyHydration = document.querySelector('.user--daily-water')
const userHoursSlept = document.querySelector('.user--daily-hours')
const userQuantitySlept = document.querySelector('.user--daily-quality')
const userAvgHoursSlept = document.querySelector('.user--average-hours')
const userAvgQuantitySlept = document.querySelector('.user--average-quality')
const userDailyMiles = document.querySelector('#user--daily-miles')
const userDailyTime = document.querySelector('#user--daily-time')
const userDailyStairs = document.querySelector('#user--daily-stairs')
const groupAverageStepGoal = document.querySelector('.group--step-goal')
const groupAverageStairStat = document.querySelector('#group--stairs')
const groupAverageStepStat = document.querySelector('#group--steps')
const groupAverageMinutesStat = document.querySelector('#group--minutes')
const groupListDropdown = document.querySelector('.group--list')
const todaysDate = document.querySelector('.date')
const dashboardButton = document.querySelector('#navigation--home')
const chartsButton = document.querySelector('#navigation--graphs')
const dashboardView = document.querySelector('.dashboard')
const graphView = document.querySelector('.graphs')
const asideBar = document.querySelector('.aside--bar')
const friendTable = document.querySelector('#table--friends')
const stepGoalMessage = document.querySelector('#message--steps')

window.addEventListener('load', (event) => {
  createUserRepository()
  populateGroupList()
  populateGroupData('hydrationEntry', hydrationData)
  populateGroupData('sleepEntry', sleepData)
  populateGroupData('activityEntry', activityData)
  populateDashboard()
})


dashboardButton.addEventListener('click', (event) => {
  if (dashboardView.classList.contains("hidden")) {
    toggleView()
    createGraphs()
  }
})

chartsButton.addEventListener('click', (event) => {
  if (graphView.classList.contains("hidden")) {
    toggleView()
    createGraphs()
  }
})

groupListDropdown.addEventListener('change', (event) => {
  populateDashboard()
})

function createUserRepository() {
  userData.forEach(entry => {
    const user = new User(entry)
    userRepository.users.push(user)
  })
}

function populateGroupList() {
  userData.forEach( entry => {
    const userName = document.createElement('option')
    userName.innerText = entry.name
    userName.value = entry.name
    groupListDropdown.appendChild(userName)
  })
}

function populateDashboard() {
  populateUserInformation()
  populateDate()
  populateUserStatistics('hydrationEntry', userDailyHydration, 'numOunces', 'oz')
  populateUserStatistics('sleepEntry', userHoursSlept, 'hoursSlept', 'Hrs')
  populateUserStatistics('sleepEntry', userQuantitySlept, 'sleepQuality', '/ 10')

  populateUserStatistics('activityEntry', userDailyTime, 'minutesActive', 'minutes')
  populateUserStatistics('activityEntry', userDailyStairs, 'flightsOfStairs', 'flights')

  populateAverageStatistics('sleepEntry', userAvgHoursSlept, 'hoursSlept', 'Hrs')
  populateAverageStatistics('sleepEntry', userAvgQuantitySlept, 'sleepQuality', '/ 10')

  groupAverageStepStat.innerText = userRepository.returnAverageActivityData('numSteps', ' steps')
  groupAverageStairStat.innerText = userRepository.returnAverageActivityData('flightsOfStairs', ' flights')
  groupAverageMinutesStat.innerText = userRepository.returnAverageActivityData('minutesActive', ' minutes')

  const user = userRepository.currentUser
  userDailyMiles.innerText = `${user.returnMilesWalked('activityEntry', 'numSteps')} miles`
  populateGraphInformation()

  populateFriendTable()
}

function populateGroupData(entryType, dataList) {
  userRepository.populateUserData(entryType, dataList)
}

function populateUserInformation() {
  userRepository.currentUser = userRepository.users.find(user => {
    return user.name === groupListDropdown.value
  })

  const currentUser = userRepository.currentUser
  welcomeMessage.innerText = `Welcome, ${userRepository.currentUser.returnFirstName()}!`
  userName.innerText = `Name: ${currentUser.name}`
  userAddress.innerText = `Address: ${currentUser.address}`
  userEmail.innerText = `Email: ${currentUser.email}`
  userStrideLength.innerText = `Stride Length: ${currentUser.strideLength}-ft`
  groupAverageStepGoal.innerText = `Step Goal All Users: ${userRepository.calculateAverageStepGoal()}`
  userStepGoal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal}`
}

function populateDate() {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  todaysDate.innerText = today.toDateString()
}

function populateUserStatistics(dataType, statisticType, propertyType, units) {
  const userData = userRepository.currentUser[dataType]
  const latestEntry = userData.length - 1
  statisticType.innerText = `${userData[latestEntry][propertyType]} ${units}`
}

function populateAverageStatistics(dataType, statisticType, propertyType, units) {
  const userData = userRepository.currentUser.calculateLifetimeAverage(dataType, propertyType)
  statisticType.innerText = `${userData.toFixed(1)} ${units}`
}

function toggleView() {
  dashboardView.classList.toggle('hidden')
  graphView.classList.toggle('hidden')
  asideBar.classList.toggle('hidden')
}

function populateGraphInformation() {
  ounces = userRepository.currentUser.returnWeeklyValue('hydrationEntry', 'numOunces')
  hours = userRepository.currentUser.returnWeeklyValue('sleepEntry', 'hoursSlept')
  quality = userRepository.currentUser.returnWeeklyValue('sleepEntry', 'sleepQuality')
  minutes = userRepository.currentUser.returnWeeklyValue('activityEntry', 'minutesActive')
  flights = userRepository.currentUser.returnWeeklyValue('activityEntry', 'flightsOfStairs')
  steps = transformStepUnits()

  populateStepGoalChart()
  createGraphs()
}

function populateStepGoalChart() {
  const userStepGoal = userRepository.currentUser.dailyStepGoal
  stepProgress = userRepository.currentUser.returnDailyValue('activityEntry', 'numSteps')
  stepsRemaining = userStepGoal - stepProgress

  if (stepsRemaining < 0) {
    stepsRemaining = 0
    stepGoalMessage.innerText = '🎉 You Exceeded Your Step Goal 🎉'
  }
}

function transformStepUnits() {
  const userSteps = userRepository.currentUser.returnWeeklyValue('activityEntry', 'numSteps')
  const newSteps = userSteps.map(entry => entry / 100)

  return newSteps
}

function populateFriendData() {
  const friends = []

  userRepository.currentUser.friends.forEach((friend, index) => {
    const user = new User(userData[index])
    friends.push(user)
  })

  const friendNames = friends.map(friend => friend.name)
  return userRepository.returnWeekStepCount(friendNames)
}

function populateFriendTable() {
  friendTable.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Current Steps</th>
    </tr>
  `
  const stepChallengers = populateFriendData()

  const userStepInformation = {}
  userStepInformation.name = userRepository.currentUser.name
  userStepInformation.steps = userRepository.currentUser.returnCumulativeStepCount()
  stepChallengers.push(userStepInformation)

  stepChallengers.sort((a,b) => {
    return b.steps - a.steps
  })

  createTableElements(stepChallengers)
}

function createTableElements(inputArray) {
  inputArray.forEach((friend, index) => {
    const ranks = ['1st 🏆', '2nd🥈', '3rd🥉', '4th🎗', '5th🎗', '6th🎗']
    const tableRow = document.createElement('tr')
    const friendRank = document.createElement('td')
    const friendCell = document.createElement('td')
    const friendSteps = document.createElement('td')

    friendRank.innerText = ranks[index]
    friendCell.innerText = friend.name
    friendSteps.innerText = friend.steps

    friendTable.appendChild(tableRow).appendChild(friendRank)
    friendTable.appendChild(tableRow).appendChild(friendCell)
    friendTable.appendChild(tableRow).appendChild(friendSteps)
  })
}
