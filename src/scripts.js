let userRepository = new UserRepository()
const userName = document.querySelector('#user--name')
const userAddress = document.querySelector('#user--adress')
const userEmail = document.querySelector('#user--email')
const userStrideLength = document.querySelector('#user--stride')
const userStepGoal = document.querySelector('#user--step')
const groupAverageStepGoal = document.querySelector('#group--step')
const groupList = document.querySelector('.group--list')

window.addEventListener('load', ( event ) => {
  createUserRepository()
  populateGroupList()
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

function populateUserInformation() {

}
