let userRepository = new UserRepository()
const welcomeMessage = document.querySelector('.user--welcome')
const userName = document.querySelector('#user--name')
const userAddress = document.querySelector('#user--address')
const userEmail = document.querySelector('#user--email')
const userStrideLength = document.querySelector('#user--stride')
const userStepGoal = document.querySelector('#user--step')
const groupAverageStepGoal = document.querySelector('#group--step')
const groupList = document.querySelector('.group--list')
const todaysDate = document.querySelector('#date')

window.addEventListener('load', ( event ) => {
  createUserRepository()
  populateGroupList()
  populateUserInformation()
  populateDate()
})

groupList.addEventListener('change', ( event ) => {
  populateUserInformation()
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

function populateUserInfo·rmation() {
  userRepository.currentUser = userRepository.users.find( user => {
    return user.name === groupList.value
  })

  const currentUser = userRepository.currentUser
  welcomeMessage.innerText = `Welcome, ${userRepository.currentUser.returnFirstName()}!`
  userName.innerText = `Name: ${currentUser.name}`
  userAddress.innerText = `Address: ${currentUser.address}`
  userEmail.innerText = `Email: ${currentUser.email}`
  userStrideLength.innerText = `Stride Length: ${currentUser.strideLength}-ft`
  userStepGoal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal} steps`
  groupAverageStepGoal.innerText = `Average Step Goal for All Users: `
}

function populateDate() {
  const timeElapsed = Date.now()
  const today = new Date( timeElapsed )

  todaysDate.innerText = today.toDateString()
}
