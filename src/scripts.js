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
const homeIcon = document.querySelector('.navigation--home')
const graphIcon = document.querySelector('.navigation--graphs')
const dashboardView = document.querySelector('.dashboard')
const graphView = document.querySelector('.graphs')



window.addEventListener('load', ( event ) => {
  createUserRepository()
  populateGroupList()
  populateGroupData()
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
  populateUserHydration()

}

function populateGroupData() {
  userRepository.populateHydrationData()
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
  groupAverageStepGoal.innerText = `Average Step Goal for All Users: ·${userRepository.calculateAverageStepGoal()} steps`

  userStepGoal.forEach( goal => {
    goal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal} steps`
  })
}

function populateDate() {
  const timeElapsed = Date.now()
  const today = new Date( timeElapsed )

  todaysDate.innerText = today.toDateString()
}

function populateUserHydration() {
  const userHydration = userRepository.currentUser.hydrationEntry
  const latestEntry = userHydration.length - 1
  userWater.innerText = `${userHydration[latestEntry].numOunces} oz.`
}

function toggleView() {
  dashboardView.classList.toggle('hidden')
  graphView.classList.toggle('hidden')
}
