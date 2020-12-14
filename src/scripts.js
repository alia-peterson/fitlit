let userRepository = new UserRepository()
const welcomeMessage = document.querySelector('.user--welcome')
const userName = document.querySelector('.user--name')
const userAddress = document.querySelector('.user--address')
const userEmail = document.querySelector('.user--email')
const userStrideLength = document.querySelector('.user--stride')
const userStepGoal = document.querySelectorAll('.user--step')
const groupAverageStepGoal = document.querySelector('.group--step')
const groupList = document.querySelector('.group--list')
const todaysDate = document.querySelector('.date')
const userWater = document.querySelector('.user--daily-water')
const homeIcon = document.querySelector('#navigation--home')
const graphIcon = document.querySelector('#navigation--graphs')
const dashboardView = document.querySelector('.dashboard')
const graphView = document.querySelector('.graphs')
const hydrationTable = document.querySelector('#table--hydration')
const sleepTable = document.querySelector('#table--sleep')
const userHoursSlept = document.querySelector('.user--daily-hours')
const userQuantitySlept = document.querySelector('.user--daily-quality')
const userAvgHoursSlept = document.querySelector('.user--average-hours')
const userAvgQuantitySlept = document.querySelector('.user--average-quality')
const userDailySteps = document.querySelector('#user--daily-steps')
const userDailyMiles = document.querySelector('#user--daily-miles')
const userDailyTime = document.querySelector('#user--daily-time')
const userDailyStairs = document.querySelector('#user--daily-stairs')
const graphContainer = document.querySelector('.graph--container')


window.addEventListener('load', ( event ) => {
  createUserRepository()
  populateGroupList()
  populateGroupData('hydrationEntry', hydrationData)
  populateGroupData('sleepEntry', sleepData)
  populateGroupData('activityEntry', activityData)
  populateDashboard()
})

homeIcon.addEventListener('click', ( event ) => {
  if (dashboardView.classList.contains("hidden")) {
    toggleView()
  }
})

graphIcon.addEventListener('click', ( event ) => {
  if (graphView.classList.contains("hidden")) {
    toggleView()
    displayGraphs()
  }
})

groupList.addEventListener('change', ( event ) => {
  populateDashboard()
})

function createUserRepository() {
  userData.forEach( entry => {
    const user = new User( entry )
    userRepository.users.push( user )
  })
}

function populateGroupList() {
  userData.forEach( entry => {
    const userName = document.createElement( 'option' )
    userName.innerText = entry.name
    userName.value = entry.name
    groupList.appendChild( userName )
  })
}

function populateDashboard() {
  populateUserInformation()
  populateDate()
  populateUserStatistics('hydrationEntry', userWater, 'numOunces', 'oz')
  populateUserStatistics('sleepEntry', userHoursSlept, 'hoursSlept', 'Hrs')
  populateUserStatistics('sleepEntry', userQuantitySlept, 'sleepQuality', '/ 10')

  populateUserStatistics('activityEntry', userDailySteps, 'numSteps', '')
  populateUserStatistics('activityEntry', userDailyTime, 'minutesActive', 'minutes')
  populateUserStatistics('activityEntry', userDailyStairs, 'flightsOfStairs', 'flights')

  populateAverageStatistics('sleepEntry', userAvgHoursSlept, 'hoursSlept', 'Hrs')
  populateAverageStatistics('sleepEntry', userAvgQuantitySlept, 'sleepQuality', '/ 10')

  userDailyMiles.innerText = `${userRepository.currentUser.returnMilesWalked('activityEntry', 'numSteps')} miles`
  populateGraphInformation()
}

function populateGroupData(type, dataList) {
  userRepository.populateUserData(type, dataList)
}

function populateUserInformation() {
  userRepository.currentUser = userRepository.users.find( user => {
    return user.name === groupList.value
  })

  const currentUser = userRepository.currentUser
  welcomeMessage.innerText = `Welcome, ${userRepository.currentUser.returnFirstName()}!`
  userName.innerText = `Name: ${currentUser.name}`
  userAddress.innerText = `Address: ${currentUser.address}`
  userEmail.innerText = `Email: ${currentUser.email}`
  userStrideLength.innerText = `Stride Length: ${currentUser.strideLength}-ft`
  groupAverageStepGoal.innerText = `Average Step Goal for All Users: ${userRepository.calculateAverageStepGoal()} steps`

  userStepGoal.forEach( goal => {
    goal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal} steps`
  })
}

function populateDate() {
  const timeElapsed = Date.now()
  const today = new Date( timeElapsed )

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
}

function displayGraphs() {
  const graph = document.createElement('canvas')
  graph.id = 'graph--display'
  graph.display = false
  graphContainer.appendChild(graph)
}

function populateGraphInformation() {
  ounces = userRepository.currentUser.returnWeeklyValue('hydrationEntry', 'numOunces')
  hours = userRepository.currentUser.returnWeeklyValue('sleepEntry', 'hoursSlept')
  quality = userRepository.currentUser.returnWeeklyValue('sleepEntry', 'sleepQuality')
  minutes = userRepository.currentUser.returnWeeklyValue('activityEntry', 'minutesActive')
  steps = transformStepUnits()
  createGraphs()
}

function transformStepUnits() {
  const userSteps = userRepository.currentUser.returnWeeklyValue('activityEntry', 'numSteps')
  const newSteps = userSteps.map(entry => entry / 100)

  return newSteps
}
